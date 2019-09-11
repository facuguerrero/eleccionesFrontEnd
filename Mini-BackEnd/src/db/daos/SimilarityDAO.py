from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class SimilarityDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(SimilarityDAO, self).__init__(Mongo().get().db.users_similarities)
        self.logger = Logger(self.__class__.__name__)

    def find(self, start_date, end_date):
        query = {'date': {'$and': [{'$gte': start_date}, {'$lte': end_date}]}}
        similarities = []
        for document in self.get_all(query):
            result = {'date': document['date']}
            similarities.append(result.update(document['similarities_without_random']))
        return similarities
