from flask import request
from flask_restful import Resource

from src.exceptions.NoDocumentsFoundError import NoDocumentsFoundError
from src.exceptions.WrongParametersError import WrongParametersError
from src.services.HashtagUsageService import HashtagUsageService
from src.util.ResponseBuilder import ResponseBuilder
from src.util.validations.RequestParameterValidator import RequestParameterValidator


class HashtagUsageResource(Resource):

    @staticmethod
    def get(hashtag_name):
        # Parse input
        try:
            start_date, end_date = RequestParameterValidator.check_date_window_params(request.args)
        except WrongParametersError as wpe:
            return ResponseBuilder.build_exception(wpe.message, 400)
        # Do function
        try:
            graph = HashtagUsageService().find_hashtag(hashtag_name, start_date, end_date)
            return ResponseBuilder.build(graph, 200)
        except NoDocumentsFoundError:
            return ResponseBuilder.build_exception('Requested data not found.', 404)
