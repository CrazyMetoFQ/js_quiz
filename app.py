

import json
import os
from random import randint

from flask import Flask, render_template, request

app = Flask(__name__)


class json_q:

  def __init__(self, us = "general"):
      
      with open(f"{os.getcwd()}/static/{us}.json") as f:
        self.st = json.load(f)

        self.ln = len(self.st)

  def rand_q(self,n=1):

    l  = []
    for _ in range(n):
        
        r = randint(1,self.ln)
        d = self.st[r:r+1][0]

        q = (d.get("Questions"),
                    [d.get(i) for i in ["A","B","C","D"]],
                    d["Correct"])

        l.append((q,r))
    
    return json.dumps(l)


jsq = json_q()


@app.route('/')
def index():
    return render_template('index.html')

@app.route("/settings")
def settings():
    return render_template("settings.html")

@app.route('/quiz')
def play():
    return render_template('quiz.html')

@app.route('/q')
def q():

    return jsq.rand_q()


@app.route("/ans")
def ans():

    i = int(request.args['i'])
    return json.dumps(jsq.st[i]["Correct"])



if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
 
 