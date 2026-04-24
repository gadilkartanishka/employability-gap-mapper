from app.worker import celery_app
from app.services.jobs import job_market_service

@celery_app.task(name="refresh_job_market_data_task")
def refresh_job_market_data_task(limit_per_role: int = 10):
    """
    Task to refresh job market skill data from Naukri.
    """
    return job_market_service.refresh_market_data(limit_per_role=limit_per_role)
