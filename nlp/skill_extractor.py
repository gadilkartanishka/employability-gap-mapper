import pandas as pd
import json
import re
import os
from collections import defaultdict
import spacy
from keybert import KeyBERT

INPUT_PATH  = "data/raw_jobs/jobs_detailed.csv"
OUTPUT_PATH = "data/processed/skills_from_jobs.json"

# ── Load models ─────────────────────────────────────────────
print("Loading NLP models...")
nlp = spacy.load("en_core_web_sm")
kw_model = KeyBERT()
print("Models loaded.\n")

# ── Master skill vocabulary ──────────────────────────────────
# Common tech skills to match against
SKILL_VOCAB = {
    # Programming languages
    "python", "java", "javascript", "c++", "c#", "typescript", "golang", "go",
    "ruby", "php", "swift", "kotlin", "scala", "r", "matlab", "rust",

    # Web / Frontend
    "html", "css", "react", "angular", "vue", "nodejs", "node.js", "django",
    "flask", "fastapi", "spring", "spring boot", "express",

    # Data & ML
    "machine learning", "deep learning", "nlp", "natural language processing",
    "data analysis", "data science", "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch", "keras", "sql", "mysql", "postgresql", "mongodb",
    "hadoop", "spark", "tableau", "power bi", "excel",

    # Cloud & DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "git", "github",
    "gitlab", "ci/cd", "continuous integration", "linux", "terraform",

    # Databases
    "database", "oracle", "redis", "elasticsearch", "cassandra",

    # Concepts & practices
    "rest", "restful", "api", "microservices", "agile", "scrum", "devops",
    "oop", "object oriented", "data structures", "algorithms", "system design",
    "software testing", "unit testing", "code review", "software development",

    # Business / Analyst skills
    "business analysis", "requirements gathering", "stakeholder management",
    "uml", "bpmn", "jira", "confluence", "project management",
    "communication", "problem solving", "critical thinking",
}

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'<[^>]+>', ' ', text)       # remove HTML
    text = re.sub(r'[^a-z0-9\s\+\#\.]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_skills_from_text(text):
    """Match text against skill vocabulary"""
    text_lower = clean_text(text)
    found = set()

    for skill in SKILL_VOCAB:
        # Use word boundary matching
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found.add(skill)

    return found

def extract_skills_from_tags(tags_str):
    """Extract skills directly from the scraped skills/chips field"""
    if pd.isna(tags_str):
        return set()
    skills = set()
    for tag in str(tags_str).split(","):
        tag = tag.strip().lower()
        if tag in SKILL_VOCAB or len(tag) > 1:
            skills.add(tag)
    return skills

def extract_keybert_skills(text, top_n=10):
    """Use KeyBERT to extract top keywords"""
    try:
        keywords = kw_model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words='english',
            top_n=top_n
        )
        return {kw[0].lower() for kw in keywords}
    except:
        return set()


if __name__ == "__main__":
    df = pd.read_csv(INPUT_PATH)
    print(f"Processing {len(df)} job descriptions...\n")

    # Results: { role: { skill: count } }
    role_skills = defaultdict(lambda: defaultdict(int))

    for i, row in df.iterrows():
        role        = row["target_role"]
        description = str(row.get("description", ""))
        tags        = row.get("skills", "")

        # Method 1: vocab matching on description
        vocab_skills = extract_skills_from_text(description)

        # Method 2: direct tags from scraped chips
        tag_skills = extract_skills_from_tags(tags)

        # Method 3: KeyBERT on description (every 5th job to save time)
        keybert_skills = set()
        if i % 5 == 0:
            keybert_skills = extract_keybert_skills(description)

        # Combine all methods
        all_skills = vocab_skills | tag_skills | keybert_skills

        for skill in all_skills:
            role_skills[role][skill] += 1

        if (i + 1) % 20 == 0:
            print(f"  Processed {i+1}/{len(df)} jobs...")

    # Convert to regular dict and sort by frequency
    output = {}
    for role, skills in role_skills.items():
        sorted_skills = dict(sorted(skills.items(), key=lambda x: x[1], reverse=True))
        output[role] = sorted_skills

    os.makedirs("data/processed", exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\n✅ Done! Saved to {OUTPUT_PATH}")
    print("\nTop 10 skills per role:")
    for role, skills in output.items():
        top10 = list(skills.items())[:10]
        print(f"\n{role}:")
        for skill, count in top10:
            print(f"  {skill}: {count}")