.PHONY: prepare run test

prepare:
	python3 -m venv venv; \
	. venv/bin/activate; \
	pip install -r requirements.txt;

run:
	. venv/bin/activate; \
	export PYTHONPATH=$PYTHONPATH:$(pwd); \
	gunicorn -b 0.0.0.0 wsgi:app

test:
	. venv/bin/activate; \
    python -m unittest discover -s test -p Test*.py;
