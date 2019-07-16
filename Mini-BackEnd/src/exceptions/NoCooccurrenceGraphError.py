class NoCooccurrenceGraphError(Exception):

    def __init__(self, start_date, end_date, topic_id):
        self.message = f'No topic graph found for date window starting on {start_date} and finishing on {end_date}' \
            f' with id {topic_id}.'

    def __str__(self):
        return self.message
