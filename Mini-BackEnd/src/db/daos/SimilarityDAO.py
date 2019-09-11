from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class SimilarityDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(SimilarityDAO, self).__init__(Mongo().get().db.users_similarities)
        self.logger = Logger(self.__class__.__name__)

    def find(self, start_date, end_date):
        """ Return all similarities between received dates. """
        similarities = []
        documents = self.get_all({'$and': [{'date': {'$gte': start_date}}, {'date': {'$lte': end_date}}]})
        for document in documents:
            result = {'date': str(document['date'])}
            result.update(document['similarities_without_random'])
            similarities.append(result)
        return similarities
