from flask import request
from flask_restful import Resource

from src.db.daos.CooccurrenceDAO import CooccurrenceDAO
from src.db.daos.DashboardDAO import DashboardDAO
from src.db.daos.HashtagDAO import HashtagDAO
from src.db.daos.RawFollowerDAO import RawFollowerDAO
from src.db.daos.RawTweetDAO import RawTweetDAO
from src.util.ResponseBuilder import ResponseBuilder


class DashboardResource(Resource):

    @staticmethod
    def get():
        data = request.args.get('data')
        if data == 'numbers':
            response = DashboardResource.numbers()
        elif data == 'graphics':
            response = DashboardResource.graphics()
        else:
            response = {**DashboardResource.numbers(), **DashboardResource.graphics()}
        # Respond request
        return ResponseBuilder.build(response, 200)

    @staticmethod
    def numbers():
        # Get count of analyzed tweets
        tweets = RawTweetDAO().get_count({}) + 481267890  # Count of deleted tweets
        # Get count of known hashtags
        hashtags = HashtagDAO().get_count({})
        # Get count of hashtag cooccurrences
        cooccurrences = CooccurrenceDAO().get_count({})
        return {'total_users': RawFollowerDAO().get_count({}),
                'tweets': tweets,
                'hashtag_count': hashtags,
                'cooccurrences_count': cooccurrences}

    @staticmethod
    def graphics():
        # Retrieve dashboard data from database
        dashboard_data = DashboardDAO().dashboard_data()
        # Build response object
        return {'active_users': dashboard_data['active_users'],
                'active_proportion': dashboard_data['active_proportion'],
                'followers_by_candidate': dashboard_data['followers_by_candidate'],
                'topic_count': dashboard_data['topics']}
