from src.db.Mongo import Mongo
from src.db.daos.GenericDAO import GenericDAO
from src.util.logging.Logger import Logger
from src.util.meta.Singleton import Singleton


class DashboardDAO(GenericDAO, metaclass=Singleton):

    def __init__(self):
        super(DashboardDAO, self).__init__(Mongo().get().db.dashboard)
        self.logger = Logger(self.__class__.__name__)

    def dashboard_data(self):
        """ Returns most recent dashboard data. """
        document = next(self.get_with_cursor(sort=[('date', -1)], limit=1))
        document.pop('_id')
        return document
