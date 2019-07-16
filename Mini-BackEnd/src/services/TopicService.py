from src.db.daos.ShowableGraphDAO import ShowableGraphDAO
from src.util.DateUtils import DateUtils


class TopicService:

    @classmethod
    def find_topic(cls, topic_id, start_date, end_date=None):
        """ Find showable graph for time window and topic_id. """
        # Parse end date to match database values
        end_date = DateUtils.last_second_of_day(end_date if end_date else start_date)
        # Retrieve topic graph
        return ShowableGraphDAO().find(topic_id, start_date, end_date)
