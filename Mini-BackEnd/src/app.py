# -*- coding: utf-8 -*-
from os.path import abspath, join, dirname
from argparse import ArgumentParser

from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from src.api.CooccurrenceGraphResource import CooccurrenceGraphResource
from src.api.DashboardResource import DashboardResource
from src.api.HomeResource import HomeResource
from src.api.IncreasesResource import IncreasesResource
from src.api.WrongPathResource import WrongPathResource
from src.db.Mongo import Mongo
from src.db.db_initialization import create_indexes
from src.util.logging.Logger import Logger

DBNAME = 'elections'
AUTH = ''
ENV = 'dev'
STATIC_FOLDER = abspath(join(dirname(__file__), '../static'))
TEMPLATE_FOLDER = abspath(join(dirname(__file__), '../templates'))

app = Flask(__name__, template_folder=TEMPLATE_FOLDER, static_folder=STATIC_FOLDER)
api = Api(app)
CORS(app)

api.add_resource(HomeResource, '/')
api.add_resource(IncreasesResource, '/candidates')
api.add_resource(CooccurrenceGraphResource, '/cooccurrence_graphs')
api.add_resource(DashboardResource, '/dashboard')
api.add_resource(WrongPathResource, '/<path:path>')


def set_up_context(db_name, authorization, environment):
    # Configure logger
    Logger.set_up(environment)
    Logger(__name__).info(f'Starting application in environment {environment}')
    # Configure database
    app.config['MONGO_DBNAME'] = db_name
    app.config['MONGO_URI'] = f'mongodb://{authorization}localhost:27017/{db_name}'
    Mongo().db.init_app(app)
    with app.app_context():
        create_indexes()


def parse_arguments():
    """ Read program arguments, which should be db_name and authentication data. The auth data is username:password. """
    parser = ArgumentParser()
    # Set up argument values
    parser.add_argument('--dbname', nargs='?', help='Name of the database to use')
    parser.add_argument('--auth', nargs='?', help='Database authentication data (username:password)')
    parser.add_argument('--env', nargs='?', help='Execution environment [dev; prod]')
    # Get program arguments
    arguments = parser.parse_args()
    db_name = DBNAME if not arguments.dbname else arguments.dbname
    db_auth = AUTH if not arguments.auth else f'{arguments.auth}@'
    environment = ENV if not arguments.env else arguments.env
    return db_name, db_auth, environment


def init_app(db=DBNAME, auth=None, env=ENV):
    db_auth = AUTH if not auth else f'{auth}@'
    set_up_context(db, db_auth, env)
    Logger(__name__).info('Application setup done.')
    return app
