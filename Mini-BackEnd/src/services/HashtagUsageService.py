from src.db.daos.HashtagUsageDAO import HashtagUsageDAO
from src.db.daos.TopicUsageDAO import TopicUsageDAO
from src.mappers.response.HashtagUsageResponseMapper import HashtagUsageResponseMapper
from src.util.DateUtils import DateUtils
from src.util.logging.Logger import Logger


class HashtagUsageService:
    """ Service designated to the calculation of the usage of hashtags in a given window of time. """

    @classmethod
    def find_hashtag(cls, hashtag_name, start_date, end_date):
        # Parse end date to match database values
        end_date = DateUtils.last_second_of_day(end_date if end_date else start_date)
        document = HashtagUsageDAO().find(hashtag_name, start_date, end_date)
        return HashtagUsageResponseMapper.map_one(document)

    @classmethod
    def find_topic(cls, topic_id, start_date, end_date):
        end_date = DateUtils.last_second_of_day(end_date if end_date else start_date)
        document = TopicUsageDAO().find(topic_id, start_date, end_date)
        return HashtagUsageResponseMapper.map_one(document)

    @classmethod
    def get_logger(cls):
        return Logger(cls.__name__)
