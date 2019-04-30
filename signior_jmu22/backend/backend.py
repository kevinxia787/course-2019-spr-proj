
import requests
import json
import urllib.parse
from flask import Flask 
from flask_cors import CORS
from flask import g
from pymongo import MongoClient




app = Flask(__name__)
CORS(app)

username = urllib.parse.quote_plus('signior_jmu22')
password = urllib.parse.quote_plus('signior_jmu22')

client = MongoClient('mongodb://signior_jmu22:signior_jmu22@127.0.0.1/repo')
db = client['repo']
@app.route("/")
def home():
  return "Hello World"

@app.route("/statistics")
def statistics():
  result = []
  data = db.signior_jmu22.total_statistical_analysis.find({}, {'_id': 0})
  for row in data:
    result.append(row)
  
  statistics = json.dumps(result)
  return statistics

@app.route("/car_and_emissions")
def car_and_emissions():
  result = []
  data = db.signior_jmu22.constraint_satisfaction2.find({}, {'_id': 0})
  for row in data:
    result.append(row)
    
  car_and_emissions = json.dumps(result)
  return car_and_emissions