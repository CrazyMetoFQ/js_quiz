from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, RadioField
from wtforms.validators import DataRequired

class makeForm(FlaskForm):
  
  quizName = StringField('Quiz Name', validators=[DataRequired()])
  
  q = StringField('Question', validators=[DataRequired()])

  opt1 = StringField('A', validators=[DataRequired()])
  opt2 = StringField('B', validators=[DataRequired()])
  opt3 = StringField('C', validators=[DataRequired()])
  opt4 = StringField('D', validators=[DataRequired()])
  ans = StringField('Answer', validators=[DataRequired()])
  
  
  submit = SubmitField('Submit')


def ChooseForm(qzs):

  class chooseForm(FlaskForm):

      rf = RadioField('Label', choices=qzs)
      submit = SubmitField("Submit")

  return chooseForm()