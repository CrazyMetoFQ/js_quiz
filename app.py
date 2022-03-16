import json
import os

from flask import Flask, render_template, request, send_file

from quiz import json_q
from forms import makeForm, ChooseForm

from funcs import update_json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'damn this i shard'

jsqd = json_q()

cst_qz_path = f"{os.getcwd()}/static/custum_quizzes/"
qzs = os.listdir(cst_qz_path)


@app.route('/favicon.ico')
def favicon():
    return send_file(f"{os.getcwd()}/static/favicon.ico")

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

  form = makeForm()
  
  if form.submit():

    # PROCESSING
    data = {"Questions":form.q.data,
            "A":form.opt1.data,
            "B":form.opt2.data,
            "C":form.opt3.data,
            "D":form.opt4.data,
            "Correct":form.ans.data}

    fp = f"{cst_qz_path}{str(form.quizName.data)}"
    update_json(fp,data)
      
    
  return render_template('make.html', form=form)

@app.route("/choose", methods=['GET', 'POST'])
def choose():

  form = ChooseForm(os.listdir(cst_qz_path))
  choce = None
  
  if form.submit():
    # choce = [i for i in dir(form.rf) if not i.startswith("_")]
    choce = form.rf.data

    global jsqd
    jsqd = json_q(f"/custum_quizzes/{choce}")


    
  return render_template("choose.html", form= form, choce = choce)


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
 