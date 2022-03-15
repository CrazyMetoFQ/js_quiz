import json
import os

from flask import Flask, render_template, request

from quiz import json_q
from forms import MyForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'

jsqd = json_q()

qzs = os.listdir(f"{os.getcwd()}/static/custum_quizzes")


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def play():
    return render_template('quiz.html')


@app.route("/settings")
def settings():
    return render_template("settings_home.html")

@app.route("/make", methods=['GET', 'POST'])
def make():

  name = None
  form = MyForm()
  
  if form.submit():

    # PROCESSING
    name = form.quizName.data
    
  return render_template('make.html', form=form, name=name)

@app.route('/q')
def q():

    qz = request.args.get('qz')
    if qz:
        
        if qz == "default":
            return jsqd.rand_q()

        else:

            if qz in qzs:
                jsq = json_q(f"/custum_quizzes/{qz}")
                return jsq.rand_q()

            else:
                return '0'
    
    else:
        return jsqd.rand_q()

    


@app.route("/ans")
def ans():

    i = int(request.args.get('i'))
    qz = request.args.get('qz')

    if not qz or qz == "default":
        return json.dumps(jsqd.st[i]["Correct"])
    else:
        jsq = json_q(f"/custum_quizzes/{qz}")
        return json.dumps(jsq.st[i]["Correct"])


if __name__ == '__main__':
  app.run(port=5000, debug=True,
 host='0.0.0.0')
 