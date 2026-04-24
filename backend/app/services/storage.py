import os
import shutil
from pathlib import Path
from fastapi import UploadFile
from app.core.config import settings

class StorageService:
    def __init__(self):
        self.upload_dir = Path(settings.UPLOAD_DIR)
        self.upload_dir.mkdir(parents=True, exist_ok=True)

    def save_file(self, file: UploadFile, subfolder: str = "syllabi") -> str:
        """
        Saves a file to the local filesystem and returns the relative path.
        """
        # Ensure we use an absolute path for creation but store relative
        abs_upload_dir = Path(os.getcwd()) / self.upload_dir
        dest_folder = abs_upload_dir / subfolder
        dest_folder.mkdir(parents=True, exist_ok=True)
        
        # Add timestamp/uuid to prevent collision
        filename = f"{file.filename}"
        file_path = dest_folder / filename
        
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return str(file_path.relative_to(Path(os.getcwd())))

storage_service = StorageService()
