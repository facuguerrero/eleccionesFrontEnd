import pymongo

from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class CooccurrenceGraphDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(CooccurrenceGraphDAO, self).__init__(Mongo().get().db.cooccurrence_graphs)
        self.logger = Logger(self.__class__.__name__)

    def create_indexes(self):
        self.logger.info('Creating topic_id index for collection cooccurrence_graphs.')
        Mongo().get().db.cooccurrence_graphs.create_index([('topic_id', pymongo.DESCENDING)])
