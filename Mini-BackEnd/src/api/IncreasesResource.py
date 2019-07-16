from flask_restful import Resource

from src.db.daos.CandidatesFollowersDAO import CandidatesFollowersDAO
from src.util.ResponseBuilder import ResponseBuilder


class IncreasesResource(Resource):

    @staticmethod
    def get():
        return ResponseBuilder.build(CandidatesFollowersDAO().get_all_increases(), 200)

