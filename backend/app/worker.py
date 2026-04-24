from celery import Celery
from app.core.config import settings

celery_app = Celery("worker", broker=settings.CELERY_BROKER_URL)
celery_app.conf.result_backend = settings.CELERY_RESULT_BACKEND
celery_app.conf.task_always_eager = settings.CELERY_TASK_ALWAYS_EAGER

# Import tasks so they are registered
import app.tasks.syllabus
import app.tasks.jobs
