import pdfplumber
import json
import os
import re
from collections import defaultdict
from pathlib import Path

SYLLABI_DIR  = "data/syllabi"
OUTPUT_PATH  = "data/processed/skills_from_syllabus.json"

# Same vocab as skill_extractor.py
SKILL_VOCAB = {
    "python", "java", "javascript", "c++", "c#", "typescript", "golang",
    "ruby", "php", "swift", "kotlin", "scala", "r", "matlab", "rust",
    "html", "css", "react", "angular", "vue", "nodejs", "node.js", "django",
    "flask", "fastapi", "spring", "spring boot", "express",
    "machine learning", "deep learning", "nlp", "natural language processing",
    "data analysis", "data science", "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch", "keras", "sql", "mysql", "postgresql", "mongodb",
    "hadoop", "spark", "tableau", "power bi", "excel",
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "git", "github",
    "gitlab", "ci/cd", "continuous integration", "linux", "terraform",
    "database", "oracle", "redis", "elasticsearch", "cassandra",
    "rest", "restful", "api", "microservices", "agile", "scrum", "devops",
    "oop", "object oriented", "data structures", "algorithms", "system design",
    "software testing", "unit testing", "code review", "software development",
    "business analysis", "requirements gathering", "stakeholder management",
    "uml", "bpmn", "jira", "confluence", "project management",
    "communication", "problem solving", "critical thinking",
    # Extra academic terms common in Indian syllabi
    "operating systems", "computer networks", "dbms", "database management",
    "compiler design", "theory of computation", "software engineering",
    "computer architecture", "digital electronics", "discrete mathematics",
    "linear algebra", "statistics", "probability", "data mining",
    "artificial intelligence", "computer graphics", "cloud computing",
    "information security", "cryptography", "web technologies",
}

def extract_text_from_pdf(pdf_path):
    """Extract all text from a PDF file"""
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"  Pages: {len(pdf.pages)}")
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"  Error reading PDF: {e}")
    return text

def extract_skills_from_text(text):
    """Match text against skill vocabulary"""
    text_lower = text.lower()
    found = {}
    for skill in SKILL_VOCAB:
        pattern = r'\b' + re.escape(skill) + r'\b'
        matches = re.findall(pattern, text_lower)
        if matches:
            found[skill] = len(matches)
    return found

if __name__ == "__main__":
    syllabi_path = Path(SYLLABI_DIR)
    pdf_files = list(syllabi_path.glob("*.pdf"))

    if not pdf_files:
        print("❌ No PDFs found in data/syllabi/")
        print("   Please download syllabus PDFs and place them there.")
        exit()

    print(f"Found {len(pdf_files)} syllabus PDFs\n")

    output = {}

    for pdf_file in pdf_files:
        university = pdf_file.stem  # filename without .pdf
        print(f"Processing: {university}")

        text = extract_text_from_pdf(pdf_file)
        print(f"  Extracted {len(text)} characters of text")

        if len(text) < 100:
            print(f"  ⚠ Very little text extracted — PDF may be scanned/image-based")
            continue

        skills = extract_skills_from_text(text)
        skills_sorted = dict(sorted(skills.items(), key=lambda x: x[1], reverse=True))
        output[university] = skills_sorted

        print(f"  ✓ Found {len(skills)} skills")
        print(f"  Top 10: {list(skills_sorted.items())[:10]}")
        print()

    os.makedirs("data/processed", exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f, indent=2)

    print(f"✅ Done! Saved to {OUTPUT_PATH}")