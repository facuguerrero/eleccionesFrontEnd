from src.db.daos.HashtagDAO import HashtagDAO
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
        tweet_id = HashtagDAO().first_known_usage_tweet_id(hashtag_name)
        return HashtagUsageResponseMapper.map_one(document, tweet_id)

    @classmethod
    def find_topic(cls, topic_id, start_date, end_date):
        end_date = DateUtils.last_second_of_day(end_date if end_date else start_date)
        document = TopicUsageDAO().find(topic_id, start_date, end_date)
        tweet_id = HashtagDAO().first_known_usage_tweet_id(topic_id)
        return HashtagUsageResponseMapper.map_one(document, tweet_id)

    @classmethod
    def get_logger(cls):
        return Logger(cls.__name__)
