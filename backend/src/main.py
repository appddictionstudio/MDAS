# coding=utf-8

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

from .entities.entity import Session, engine, Base
from .entities.calculations import Calculations, CalSchema

######################################
# creating the Flask application
app = Flask(__name__)

labels = [
    'JAN', 'FEB', 'MAR', 'APR',
    'MAY', 'JUN', 'JUL', 'AUG',
    'SEP', 'OCT', 'NOV', 'DEC'
]

values = [
    967.67, 1190.89, 1079.75, 1349.19,
    2328.91, 2504.28, 2873.83, 4764.87,
    4349.29, 6458.30, 9907, 16297
]

colors = [
    "#F7464A", "#46BFBD", "#FDB45C", "#FEDCBA",
    "#ABCDEF", "#DDDDDD", "#ABCABC", "#4169E1",
    "#C71585", "#FF4500", "#FEDCBA", "#46BFBD"]

# Added CORS for the API
CORS(app)

# @app.route('/')
# def hello_world():
#     return 'Hello World'

# if __name__ == '__main__':
#     app.run()
#######################################

# generate database schema
Base.metadata.create_all(engine)

# start session
# session = Session()

# check for existing data
# calculations = session.query(Calculations).all()

# if len(calculations) == 0:
    # create and persist dummy exam
    # python_calculations = Calculations("SQLAlchemy Calculations", "Test your knowledge about SQLAlchemy.", "script")
    # session.add(python_calculations)
    # session.commit()
    # session.close()

    # reload exams
    # calculations = session.query(Calculations).all()

# show existing exams
# print('### Calculations:')
# for calculation in calculations:
#    print(f'({calculation.id}) {calculation.title} - {calculation.description}')

@app.route('/calculations')
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Calculations).all()

    # transforming into JSON-serializable objects
    schema = CalSchema(many=True)
    calculations = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(calculations.data)

@app.route('/calculations', methods=['POST'])
def add_exam():
    # mount exam object
    posted_calculation = CalSchema(only=('title', 'description')).load(request.get_json())
    print(posted_calculation)
    calculation = Calculations(**posted_calculation.data, created_by="HTTP post request")

    # persist exam
    session = Session()
    session.add(calculation)
    session.commit()

    # return created exam
    new_calculation = CalSchema().dump(calculation).data
    session.close()
    return jsonify(new_calculation), 201

@app.route('/bar')
def bar():
    bar_labels=labels
    bar_values=values
    return render_template('bar_chart.html', title='Bitcoin Monthly Price in USD', max=17000, labels=bar_labels, values=bar_values)

@app.route('/line')
def line():
    line_labels=labels
    line_values=values
    return render_template('line_chart.html', title='Bitcoin Monthly Price in USD', max=17000, labels=line_labels, values=line_values)

@app.route('/pie')
def pie():
    pie_labels = labels
    pie_values = values
    return render_template('pie_chart.html', title='Bitcoin Monthly Price in USD', max=17000, set=zip(values, labels, colors))
