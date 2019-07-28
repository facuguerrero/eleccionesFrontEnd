from datetime import datetime

from src.exceptions.WrongParametersError import WrongParametersError


class RequestParameterValidator:

    @classmethod
    def check_date_window_params(cls, query_params):
        """ Check expected query params and fail if compulsory fields are empty. """
        raw_start = query_params.get('start_date', None)
        start = cls.__parse_raw(raw_start, 'start_date')
        raw_end = query_params.get('end_date', None)
        end = cls.__parse_raw(raw_end, 'end_date', nullable=True)
        return start, end

    @staticmethod
    def __parse_raw(raw_date, id, nullable=False):
        # Throw exception if date can't be parsed or if it is None
        try:
            if raw_date is None:
                if nullable:
                    return None
                else:
                    raise ValueError()
            return datetime.strptime(raw_date, '%Y-%m-%d')
        except ValueError:
            raise WrongParametersError(id)
