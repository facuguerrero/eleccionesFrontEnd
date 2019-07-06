from flask import render_template, make_response
from flask_restful import Resource


class WrongPathResource(Resource):

    @staticmethod
    def get(path):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('not_found.html'), 404, headers)
