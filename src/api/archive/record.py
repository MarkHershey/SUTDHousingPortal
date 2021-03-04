from datetime import datetime


class DisciplinaryRecords:
    def __init__(self, student_id: str, type: str, description: str = None):
        self.id: str = None
        self.student_id: str = None
        self.type: str = None
        self.description: str = None
        self.issue_date: datetime = datetime.now()
