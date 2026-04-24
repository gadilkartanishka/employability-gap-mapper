import requests
import pandas as pd
import time
import random
import os
from typing import List, Dict, Any
from sqlmodel import Session, select
from app.core.config import settings
from app.db.session import engine
from app.models.college import JobSkill
from app.services.nlp import extract_skills_from_text, clean_text
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime

class JobMarketService:
    def __init__(self):
        self.serpapi_key = settings.SERPAPI_KEY
        self.target_roles = [
            "Software Developer",
            "Data Analyst",
            "Business Analyst",
            "Full Stack Developer",
        ]

    def _init_driver(self):
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

    def google_dork_naukri(self, role: str, start: int = 0):
        query = f'site:naukri.com/job-listings "{role}"'
        params = {
            "engine": "google",
            "q": query,
            "api_key": self.serpapi_key,
            "num": 10,
            "start": start,
        }
        response = requests.get("https://serpapi.com/search", params=params)
        return response.json()

    def parse_serp_results(self, data: Dict[str, Any], role: str) -> List[Dict[str, Any]]:
        jobs = []
        organic_results = data.get("organic_results", [])
        for r in organic_results:
            link = r.get("link", "")
            if "/job-listings-" in link or "naukri.com" in link:
                jobs.append({
                    "target_role": role,
                    "title": r.get("title", ""),
                    "snippet": r.get("snippet", ""),
                    "link": link,
                })
        return jobs

    def get_job_details(self, driver, url: str) -> Dict[str, Any]:
        try:
            driver.get(url)
            # Short wait for common element
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//*[contains(@class, "styles_jd-header-title")]'))
            )
            
            # Extract skills from chips if possible
            chip_els = driver.find_elements(By.XPATH, '//*[contains(@class, "styles_chip__")]')
            chips = [c.text.strip().lower() for c in chip_els if c.text.strip()]
            
            # Extract description
            desc_el = driver.find_element(By.XPATH, '//*[contains(@class, "styles_job-desc-container")]')
            description = desc_el.text if desc_el else ""
            
            return {
                "skills_chips": chips,
                "description": description
            }
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None

    def refresh_market_data(self, limit_per_role: int = 10):
        """
        Main pipeline: Scrape -> Parse -> Extract -> Update DB
        """
        all_job_skills = {} # {role: {skill: count}}

        driver = self._init_driver()
        try:
            for role in self.target_roles:
                print(f"Processing role: {role}")
                role_skills_counts = {}
                
                # Scrape 1 page for now (10 results)
                data = self.google_dork_naukri(role)
                jobs = self.parse_serp_results(data, role)
                
                for job in jobs[:limit_per_role]:
                    details = self.get_job_details(driver, job["link"])
                    found_skills = set()
                    
                    if details:
                        # 1. From chips
                        for skill in details["skills_chips"]:
                            if len(skill) > 1: found_skills.add(skill)
                        # 2. From description via NLP
                        found_skills |= extract_skills_from_text(details["description"])
                    else:
                        # Fallback to snippet
                        found_skills |= extract_skills_from_text(job["snippet"])
                    
                    for skill in found_skills:
                        role_skills_counts[skill] = role_skills_counts.get(skill, 0) + 1
                    
                    time.sleep(random.uniform(1, 2))
                
                all_job_skills[role] = role_skills_counts

        finally:
            driver.quit()

        # Update Database
        with Session(engine) as session:
            for role, skills in all_job_skills.items():
                # Clear old data for this role (or update)
                # For simplicity in MVP, we refresh the counts
                for skill_name, count in skills.items():
                    statement = select(JobSkill).where(JobSkill.role == role, JobSkill.skill == skill_name)
                    db_skill = session.exec(statement).first()
                    
                    if db_skill:
                        db_skill.frequency = count
                        db_skill.last_updated = datetime.utcnow()
                    else:
                        db_skill = JobSkill(
                            role=role,
                            skill=skill_name,
                            frequency=count
                        )
                    session.add(db_skill)
            session.commit()

        return "Market data refreshed successfully"

job_market_service = JobMarketService()
