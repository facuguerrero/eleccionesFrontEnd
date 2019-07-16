from src.db.daos.CandidateDAO import CandidateDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class CandidateService(metaclass=Singleton):

    def __init__(self):
        self.logger = Logger(self.__class__.__name__)
        self.updating_followers = set()
        self.candidates = []
        # Load candidates from db and create objects to access their elements
        self.candidates = CandidateDAO().all()

    def get_all(self):
        """ Returns all candidates currently in the list. """
        return self.candidates
