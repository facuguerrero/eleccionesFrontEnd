from src.db.daos.CooccurrenceGraphDAO import CooccurrenceGraphDAO
from src.db.daos.RawFollowerDAO import RawFollowerDAO


def create_indexes():
    """ Create all required collection indexes. """
    RawFollowerDAO().create_indexes()
    CooccurrenceGraphDAO().create_indexes()
