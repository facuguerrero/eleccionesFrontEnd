from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class CooccurrenceDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(CooccurrenceDAO, self).__init__(Mongo().get().db.cooccurrence)
        self.logger = Logger(self.__class__.__name__)
