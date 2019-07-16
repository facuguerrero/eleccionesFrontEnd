from datetime import datetime
from flask import request
from flask_restful import Resource

from src.exceptions.NoCooccurrenceGraphError import NoCooccurrenceGraphError
from src.exceptions.WrongParametersError import WrongParametersError
from src.services.TopicService import TopicService
from src.util.ResponseBuilder import ResponseBuilder


class TopicsResource(Resource):

    @staticmethod
    def get(topic_id='main'):
        # Parse input
        try:
            start_date, end_date = TopicsResource._check_query_params(request.args)
        except WrongParametersError as wpe:
            return ResponseBuilder.build_exception(wpe.message, 400)
        # Do function
        try:
            graph = TopicService.find_topic(topic_id, start_date, end_date)
            return ResponseBuilder.build(graph, 200)
        except NoCooccurrenceGraphError as nhge:
            return ResponseBuilder.build_exception(nhge.message, 400)

    @staticmethod
    def _check_query_params(query_params):
        """ Check expected query params and fail if compulsory fields are empty. """
        raw_start = query_params.get('start_date', None)
        start = TopicsResource._parse_raw(raw_start, 'start_date')
        raw_end = query_params.get('end_date', None)
        end = TopicsResource._parse_raw(raw_end, 'end_date', nullable=True)
        return start, end

    @staticmethod
    def _parse_raw(raw_date, id, nullable=False):
        # Throw exception if date can't be parsed or if it is None
        try:
            if raw_date is None:
                if nullable:
                    return None
                else:
                    raise ValueError()
            return datetime.strptime(raw_date, '%Y-%m-%d')
        except ValueError:
            raise WrongParametersError(id)
