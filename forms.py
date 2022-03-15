from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class MyForm(FlaskForm):
  
  quizName = StringField('Quiz Name', validators=[DataRequired()])
  
  question = StringField('question', validators=[DataRequired()])

  option1 = StringField('A', validators=[DataRequired()])
  option2 = StringField('B', validators=[DataRequired()])
  option3 = StringField('C', validators=[DataRequired()])
  option4 = StringField('D', validators=[DataRequired()])
  
  
  submit = SubmitField('Submit')