from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.model.Candidate import Candidate
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class CandidateDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(CandidateDAO, self).__init__(Mongo().get().db.candidates)
        self.logger = Logger(self.__class__.__name__)

    def all(self):
        """ Get all currently stored candidates. """
        candidates = []
        as_dict_list = self.get_all()
        for as_dict in as_dict_list:
            # Transform from DB format to DTO format
            as_dict['screen_name'] = as_dict['_id']
            candidates.append(Candidate(**as_dict))
        return candidates
