from flask_restful import Resource

from src.db.daos.PartyRelationshipsDAO import PartyRelationshipsDAO
from src.util.ResponseBuilder import ResponseBuilder


class PartyRelationshipsResource(Resource):

    @staticmethod
    def get():
        vectors = dict()
        for party in ['juntosporelcambio', 'frentedetodos', 'frentedespertar', 'consensofederal', 'frentedeizquierda']:
            vectors[party] = PartyRelationshipsDAO().last_party_vector(party)
        return ResponseBuilder.build(vectors, 200)
