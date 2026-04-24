import pdfplumber
import re
import spacy
from keybert import KeyBERT
from typing import Set

# Load models once (they will be loaded by the worker)
# We load them lazily to avoid overhead if not needed
_nlp = None
_kw_model = None

def get_models():
    global _nlp, _kw_model
    if _nlp is None:
        _nlp = spacy.load("en_core_web_sm")
    if _kw_model is None:
        _kw_model = KeyBERT()
    return _nlp, _kw_model

# Skill vocabulary copied from nlp/skill_extractor.py
SKILL_VOCAB = {
    "python", "java", "javascript", "c++", "c#", "typescript", "golang", "go",
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
}

def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'[^a-z0-9\s\+\#\.]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_skills_from_text(text: str) -> Set[str]:
    text_lower = clean_text(text)
    found = set()
    for skill in SKILL_VOCAB:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found.add(skill)
    return found

def extract_pdf_skills(file_path: str) -> Set[str]:
    """
    Extracts text from PDF and identifies skills.
    """
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    
    # Simple vocab matching
    vocab_skills = extract_skills_from_text(text)
    
    # In a real pipeline, we'd also use KeyBERT here
    # but for initial MVP, vocab matching is fast and reliable.
    
    return vocab_skills
