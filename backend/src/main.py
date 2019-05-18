# coding=utf-8

from flask import Flask, jsonify, request
from flask_cors import CORS

from .entities.entity import Session, engine, Base
from .entities.calculations import Calculations, CalSchema

######################################
# creating the Flask application
app = Flask(__name__)

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