from flask import request
from flask_restful import Resource

from src.exceptions.WrongParametersError import WrongParametersError
from src.services.SimilarityService import SimilarityService
from src.util.ResponseBuilder import ResponseBuilder
from src.util.validations.RequestParameterValidator import RequestParameterValidator


class SimilaritiesResource(Resource):

    @staticmethod
    def get():
        try:
            start_date, end_date = RequestParameterValidator.check_date_window_params(request.args)
        except WrongParametersError as wpe:
            return ResponseBuilder.build_exception(wpe.message, 400)
        # Do function
        similarities = SimilarityService.getSimilarities(start_date, end_date)
        return ResponseBuilder.build(similarities, 200)
