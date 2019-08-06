from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.exceptions.NoDocumentsFoundError import NoDocumentsFoundError
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class TopicUsageDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(TopicUsageDAO, self).__init__(Mongo().get().db.topic_usage)
        self.logger = Logger(self.__class__.__name__)

    def find(self, topic_id, start_date, end_date):
        """ Retrieves plottable data for a topic in a given time window. """
        document = self.get_first({'topic_id': topic_id, 'start_date': start_date, 'end_date': end_date})
        if not document:
            raise NoDocumentsFoundError(topic_id, None)
        return {'date_axis': document['date_axis'], 'count_axis': document['count_axis']}