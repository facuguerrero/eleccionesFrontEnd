class HashtagUsageResponseMapper:

    @classmethod
    def map_one(cls, document, tweet_id):
        """ Map datetime fields for response. """
        document['date_axis'] = [time.timestamp() for time in document['date_axis']]
        document['tweet_id'] = tweet_id
        # Extract vectors from map
        for party, vector in document['parties_vectors'].items():
            # Map to percentages
            document[party] = [v*100 for v in vector]
        return document
