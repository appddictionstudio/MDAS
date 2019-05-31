FROM python:3.7.3

WORKDIR /var/www/html

RUN chmod 777 -R /var/www/html

COPY backend /var/www/html
# COPY ./../../../backend : /home/ec2-user/mdas_backend/

RUN pip install pipenv && \
    # cd /home/ec2-user/mdas_backend && \
    # pipenv install --dev && \
    pip install flask flask_cors pandas numpy sqlalchemy psycopg2 marshmallow

RUN pipenv install --dev

# RUN echo ls
# RUN source $(pipenv --venv)/Scripts/activate

# RUN ./bootstrap.sh &

# RUN export FLASK_APP=./src/main.py && FLASK_RUN_PORT=8050 && flask run -h 127.0.0.1
# RUN ls /var/www/html
# ENTRYPOINT [ "/var/www/html/boostrap.sh" ]
# ENTRYPOINT ["export FLASK_APP=./src/main.py && FLASK_RUN_PORT=8050 && flask run -h 127.0.0.1"]
CMD ["export FLASK_APP=./src/main.py", "export FLASK_RUN_PORT=8050", "export flask run -h 127.0.0.1"]
# CMD [ "./src/main.py", "export = FLASK_RUN_PORT=8050", "export flask run -h 127.0.0.1"]