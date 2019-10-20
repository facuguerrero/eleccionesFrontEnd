from flask_restful import Resource

from src.db.daos.PartyRelationshipsDAO import PartyRelationshipsDAO
from src.util.ResponseBuilder import ResponseBuilder


class PartyRelationshipsResource(Resource):

    @staticmethod
    def get():
        vectors = dict()
        for party in ['juntosporelcambio', 'frentedetodos', 'frentedespertar', 'consensofederal', 'frentedeizquierda']:
            data = PartyRelationshipsDAO().last_party_vectors_data(party)
            vectors[party] = {
                'vector': data.get('vector'),
                'normalized_vector': data.get('normalized_vector'),
                'user_count': data.get('users_count'),
                'party_count': data.get('party_count')
            }
        return ResponseBuilder.build(vectors, 200)
