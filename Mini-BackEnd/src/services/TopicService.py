from src.db.daos.ShowableGraphDAO import ShowableGraphDAO
from src.util.DateUtils import DateUtils


class TopicService:

    MAX_SIZE = 2500
    MIN_SIZE = 300

    @classmethod
    def find_topic(cls, topic_id, start_date, end_date=None):
        """ Find showable graph for time window and topic_id. """
        # Parse end date to match database values
        end_date = DateUtils.last_second_of_day(end_date if end_date else start_date)
        # Retrieve topic graph
        graph = ShowableGraphDAO().find(topic_id, start_date, end_date)
        # Normalize node size
        nodes = graph['nodes']
        sizes = list(map(lambda node: node['size'], nodes))
        max_size = max(sizes)
        # Normalize to a (0,1] vector
        for node in nodes:
            node['size'] = (node['size'] / max_size)
        # Subtract minimum value to get effective [0,1) vector and transform to wanted interval
        sizes = list(map(lambda node: node['size'], nodes))
        min_size = min(sizes)
        max_size = max(sizes) - min_size
        for node in nodes:
            node['size'] = ((node['size'] - min_size)/max_size)*(cls.MAX_SIZE - cls.MIN_SIZE) + cls.MIN_SIZE
        return graph
