from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class RawTweetDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(RawTweetDAO, self).__init__(Mongo().get().db.raw_tweets)
        # self.__dict__.update(**kwargs)
        self.logger = Logger(self.__class__.__name__)
