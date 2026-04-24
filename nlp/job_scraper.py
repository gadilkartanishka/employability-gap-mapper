import requests
import pandas as pd
import time
import os
import re

# ── Config ──────────────────────────────────────────────────
SERPAPI_KEY = os.getenv("SERPAPI_KEY")  # Set this in your .env or system environment
OUTPUT_PATH = "data/raw_jobs/jobs_raw.csv"

TARGET_ROLES = [
    "Software Developer",
    "Data Analyst",
    "Business Analyst",
    "Full Stack Developer",
]

# ── Fetch one page of Google results ────────────────────────
def google_dork_naukri(role, start=0):
    query = f'site:naukri.com/job-listings "{role}"'

    params = {
        "engine": "google",
        "q": query,
        "api_key": SERPAPI_KEY,
        "num": 10,
        "start": start,
    }

    response = requests.get("https://serpapi.com/search", params=params)
    print(f"  Status: {response.status_code}")
    return response.json()

# ── Parse results into job records ──────────────────────────
def parse_results(data, role):
    jobs = []
    results = data.get("organic_results", [])

    for r in results:
        title = r.get("title", "")
        snippet = r.get("snippet", "")
        link = r.get("link", "")

        # Only keep actual job posting pages
        if "/job-listings-" not in link and "naukri.com" not in link:
            continue

        jobs.append({
            "target_role": role,
            "title": title,
            "snippet": snippet,
            "link": link,
        })

    return jobs

# ── Main ────────────────────────────────────────────────────
if __name__ == "__main__":
    all_data = []

    for role in TARGET_ROLES:
        print(f"\nScraping Google for: {role}")

        for start in range(0, 50, 10):   # 5 pages x 10 results = 50 per role
            data = google_dork_naukri(role, start=start)
            jobs = parse_results(data, role)
            all_data.extend(jobs)
            print(f"  Page {start//10 + 1} — {len(jobs)} results. Total: {len(all_data)}")
            time.sleep(2)

    df = pd.DataFrame(all_data)
    df.drop_duplicates(subset="link", inplace=True)

    os.makedirs("data/raw_jobs", exist_ok=True)
    df.to_csv(OUTPUT_PATH, index=False)
    print(f"\n✅ Done! {len(df)} job links saved to {OUTPUT_PATH}")