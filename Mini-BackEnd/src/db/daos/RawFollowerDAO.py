import pymongo

from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class RawFollowerDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(RawFollowerDAO, self).__init__(Mongo().get().db.raw_followers)
        self.logger = Logger(self.__class__.__name__)

    def create_indexes(self):
        self.logger.info('Creating has_tweets index for collection raw_followers.')
        Mongo().get().db.raw_followers.create_index([('has_tweets', pymongo.DESCENDING)])
