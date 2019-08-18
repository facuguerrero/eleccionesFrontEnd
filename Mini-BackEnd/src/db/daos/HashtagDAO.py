from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class HashtagDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(HashtagDAO, self).__init__(Mongo().get().db.hashtags)
        self.logger = Logger(self.__class__.__name__)

    def first_known_usage_tweet_id(self, hashtag):
        """ Returns the ID of the tweet where the given hashtag was first used. """
        document = self.get_first({'_id': hashtag}, {'tweet_id': 1})
        return document['tweet_id']
