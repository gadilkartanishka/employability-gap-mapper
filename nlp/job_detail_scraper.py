import pandas as pd
import time
import random
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

INPUT_PATH  = "data/raw_jobs/jobs_raw.csv"
OUTPUT_PATH = "data/raw_jobs/jobs_detailed.csv"

def init_driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )
    return driver

def get_by_class_prefix(driver, prefix):
    """Find element by partial class name match (handles hashed CSS modules)"""
    try:
        el = driver.find_element(By.XPATH, f'//*[contains(@class, "{prefix}")]')
        return el.text.strip()
    except:
        return None

def get_all_by_class_prefix(driver, prefix):
    """Find all elements by partial class name match"""
    try:
        els = driver.find_elements(By.XPATH, f'//*[contains(@class, "{prefix}")]')
        return [e.text.strip() for e in els if e.text.strip()]
    except:
        return []

def get_job_details(driver, url):
    try:
        driver.get(url)

        # Wait for job title to appear
        WebDriverWait(driver, 12).until(
            EC.presence_of_element_located(
                (By.XPATH, '//*[contains(@class, "jd-header-title")]')
            )
        )
        time.sleep(1)  # small buffer for full render

        # ── Extract fields using confirmed class names ──

        title    = get_by_class_prefix(driver, "styles_jd-header-title")
        company  = get_by_class_prefix(driver, "styles_jd-header-comp-name")
        exp      = get_by_class_prefix(driver, "styles_jhc__exp__")
        salary   = get_by_class_prefix(driver, "styles_jhc__salary__")
        location = get_by_class_prefix(driver, "styles_jhc__location__")

        # Skills — confirmed class: styles_SKC__tags-and-skills
        skills_text = get_by_class_prefix(driver, "styles_SKC__tags-and-skills")

        # Individual skill chips — confirmed: styles_chip__
        chip_els = driver.find_elements(By.XPATH, '//*[contains(@class, "styles_chip__")]')
        chips = ", ".join([c.text.strip() for c in chip_els if c.text.strip()])

        skills = chips if chips else skills_text

        # Job description — confirmed: styles_job-desc-container
        description = get_by_class_prefix(driver, "styles_job-desc-container")
        if not description:
            # fallback to inner HTML div
            description = get_by_class_prefix(driver, "styles_JDC__dang-inner-html")

        print(f"    title={title} | company={company} | skills={'yes' if skills else 'no'} | desc={'yes' if description else 'no'}")

        return {
            "title": title,
            "company": company,
            "experience": exp,
            "salary": salary,
            "location": location,
            "skills": skills,
            "description": description,
        }

    except Exception as e:
        print(f"    ✗ Error: {e}")
        return None


if __name__ == "__main__":
    df = pd.read_csv(INPUT_PATH)
    job_df = df[df["link"].str.contains("/job-listings-", na=False)].copy()
    print(f"Loaded {len(job_df)} actual job listing URLs\n")

    driver = init_driver()
    detailed_jobs = []

    try:
        for i, row in enumerate(job_df.itertuples(), 1):
            url  = row.link
            role = row.target_role

            print(f"[{i}/{len(job_df)}] {url[:75]}")
            details = get_job_details(driver, url)

            if details:
                details["target_role"] = role
                details["url"] = url
                detailed_jobs.append(details)
            else:
                detailed_jobs.append({
                    "target_role": role,
                    "url": url,
                    "title": row.title,
                    "company": None,
                    "experience": None,
                    "salary": None,
                    "location": None,
                    "skills": None,
                    "description": row.snippet,
                })
                print(f"    ⚠ Fallback to snippet")

            time.sleep(random.uniform(2, 3))

            # Save progress every 20 jobs
            if i % 20 == 0:
                pd.DataFrame(detailed_jobs).to_csv(OUTPUT_PATH, index=False)
                print(f"  💾 Progress saved — {i}/{len(job_df)} done\n")

    finally:
        driver.quit()

    result_df = pd.DataFrame(detailed_jobs)
    result_df.drop_duplicates(subset="url", inplace=True)
    result_df.to_csv(OUTPUT_PATH, index=False)

    filled = result_df["description"].notna().sum()
    print(f"\n✅ Done! {len(result_df)} jobs saved to {OUTPUT_PATH}")
    print(f"   {filled} with full descriptions, {len(result_df) - filled} snippet only")