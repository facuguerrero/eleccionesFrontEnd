from datetime import datetime

from src.db.daos.SimilarityDAO import SimilarityDAO
from src.util.DateUtils import DateUtils


class SimilarityService:

    @classmethod
    def getSimilarities(cls, start_date, end_date):
        start_date_at_first_hour = DateUtils.date_at_first_hour(start_date)
        end_date_at_first_hour = DateUtils.date_at_first_hour(end_date if end_date else datetime.today())
        return SimilarityDAO().find(start_date_at_first_hour, end_date_at_first_hour)
