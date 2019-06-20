from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def elections():
    return render_template('index.html')


@app.route('/<path:path>')
def catch_all(path):
    return render_template('not_found.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9290)