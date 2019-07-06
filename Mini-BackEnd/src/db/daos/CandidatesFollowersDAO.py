from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.mappers.response.CandidatesResponseMapper import CandidatesResponseMapper
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class CandidatesFollowersDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(CandidatesFollowersDAO, self).__init__(Mongo().get().db.candidates_followers)
        self.logger = Logger(self.__class__.__name__)

    def get_all_increases(self):
        """ Get all increases for all candidates. """
        documents = self.get_all()
        return CandidatesResponseMapper.map_many(documents)
