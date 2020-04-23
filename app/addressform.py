from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

class AddressForm(FlaskForm):
    address = StringField('Find parking meter near (address):')
    submit = SubmitField('Submit')