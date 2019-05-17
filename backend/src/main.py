# coding=utf-8

from .entities.entity import Session, engine, Base
from .entities.calculations import Calculations

# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
calculations = session.query(Calculations).all()

if len(calculations) == 0:
    # create and persist dummy exam
    python_calculations = Calculations("SQLAlchemy Calculations", "Test your knowledge about SQLAlchemy.", "script")
    session.add(python_calculations)
    session.commit()
    session.close()

    # reload exams
    calculations = session.query(Calculations).all()

# show existing exams
print('### Calculations:')
for calculation in calculations:
    print(f'({calculation.id}) {calculation.title} - {calculation.description}')
