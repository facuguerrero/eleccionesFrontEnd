# -*- coding: utf-8 -*-
from os.path import abspath, join, dirname

from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from src.api.DashboardResource import DashboardResource
from src.api.HashtagUsageResource import HashtagUsageResource
from src.api.HomeResource import HomeResource
from src.api.IncreasesResource import IncreasesResource
from src.api.SimilaritiesResource import SimilaritiesResource
from src.api.TopicUsageResource import TopicUsageResource
from src.api.TopicsResource import TopicsResource
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
api.add_resource(TopicsResource, '/topics', '/topics/<topic_id>')
api.add_resource(DashboardResource, '/dashboard')
api.add_resource(HashtagUsageResource, '/hashtag_usage/<hashtag_name>')
api.add_resource(TopicUsageResource, '/topic_usage/<topic_id>')
api.add_resource(SimilaritiesResource, '/similarities')
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


def init_app(db=DBNAME, auth=None, env=ENV):
    db_auth = AUTH if not auth else f'{auth}@'
    set_up_context(db, db_auth, env)
    Logger(__name__).info('Application setup done.')
    return app
