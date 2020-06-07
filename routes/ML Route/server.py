from flask import Flask, request, jsonify

from mlAccuracy import mlAccuracyFunc
from sMlAccuracy import sMlAccuracyFunc

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/mlAccuracy', methods=['POST'])
def mlAccuracy():
    data = request.get_json()
    x = data["x"]
    y = data["y"]
    z = data["z"]
    a = data["a"]

    result = str(mlAccuracyFunc(x, y, z, a))

    return result

@app.route('/sMlAccuracy', methods=['POST'])
def sMlaccuracy():
    data = request.get_json()
    x = data["x"]
    y = data["y"]
    z = data["z"]
    a = data["a"]
    b = data["b"]
    c = data["c"]

    result = str(sMlAccuracyFunc(x, y, z, a, b, c))

    return result

app.run()