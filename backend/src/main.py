# coding=utf-8

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
# import requests
import sys

from .entities.entity import Session, engine, Base
from .entities.calculations import Calculations, CalSchema

# Importing Company Analysis Notebook
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

# Setting up dataframe
df = pd.DataFrame()

# Getting list of 100 industries from 10 sectors. 
df = pd.DataFrame()
def get_avg_sector_rates():
    cols_to_use = [0,1,2,3,4,5,6,7]
    csv_file_path = "../assets/companylist.csv"
    df = pd.read_csv(csv_file_path, 
        usecols= cols_to_use,
        encoding='utf-8'
        )
    df['IPOyear'] = df['IPOyear'].astype(str)
    df['IPOyear'] = df['IPOyear'].str.strip('.0')
    df = df.rename(index=str, columns = {"Symbol": "SYM", "Name": "CO.", "LastSale": "LP", "MarketCap": "MRKCAP", "IPOyear": "YR", "Sector": "SEC", "industry": "IND", "Summary Quote": "SUMQTE"})
    df['SYM'] = df['SYM'].str.strip()
    df['SEC'] = df['SEC'].str.strip()
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Non-Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=='Consumer Services', 'Consumer Industry', df['SEC'])
    df["SEC"] = df["SEC"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Non-Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Technology", "Technology/Energy")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Energy", "Technology/Energy")
    df = df.groupby('SEC_CONV').head(100)
    df = df.iloc[:, [8,3]]
    df['MRKCAP'] = df['MRKCAP'].str.replace('$', '')
    df['MRKCAP'] = df['MRKCAP'].str.replace(',', '')
    df['MRKCAP'] = df['MRKCAP'].str.replace('M', ' M')
    df['MRKCAP'] = df['MRKCAP'].str.replace('B', ' B')
    df['SEC_CONV'] = df['SEC_CONV'].fillna(value='No Industry Identified')
    df['MRKCAP'] = df['MRKCAP'].fillna(value='0 D')
    df.dropna(inplace = True)
    df[['MRKCAP_AMT','MRKCAP_TYPE']] = df.MRKCAP.str.split(" ",expand=True,)
    millions = df['MRKCAP_AMT'].str.replace('.', '').fillna(value='0').astype(int).multiply(other = 100, fill_value = 5)
    billions = df['MRKCAP_AMT'].str.replace('.', '').fillna(value='0').astype(int).multiply(other = 1000000, fill_value = 5)
    df.loc[df['MRKCAP_TYPE'] == 'M', 'Conversion'] = millions
    df.loc[df['MRKCAP_TYPE'] == 'B', 'Conversion'] = billions
    df.loc[df['MRKCAP_TYPE'] == 'D', 'Conversion'] = 0
    df.loc[df['MRKCAP_TYPE'] == 'None', 'Conversion'] = df['MRKCAP_AMT'].fillna(value='0')
    df['Conversion'] = df['Conversion'].fillna(value='0')
    df['Conversion'] = df['Conversion'].astype(int)
    res = df.groupby(['SEC_CONV'])['Conversion'].mean().reset_index(drop=True, inplace=True)
    res = res.to_json(orient='recordss')
    res = json.dumps(res)
    res = res.replace('\\','')
    res = res.replace('"{','{')
    res = res.replace('}"','}')
    return res

def tokmb (num):
    convNum = ''
    if (num >= 1000 and num < 1000000):
        num = round (num/1000.00,2)
        round (num, 2)
        convNum = str(num)
        #  + " K"
        return convNum
    elif (num >= 1000000 and num < 1000000000):
        num = round (num/1000000.00,2)
        round (num, 2)
        convNum = str(num)
        #  + " M"
        return convNum
    elif (num >= 1000000000 and num < 1000000000000):
        num = round (num/1000000000.00,2)
        convNum = str(num)
        #  + " B"
        return convNum

def get_avg_sector_rates_abbrev():
    # sub = ''
    cols_to_use = [0,1,2,3,4,5,6,7]
    csv_file_path = r'../assets/companylist.csv'
    df = pd.read_csv(csv_file_path, 
        usecols= cols_to_use,
        encoding='utf-8'
        )
    df['IPOyear'] = df['IPOyear'].astype(str)
    df['IPOyear'] = df['IPOyear'].str.strip('.0')
    df = df.rename(index=str, columns = {"Symbol": "SYM", "Name": "CO.", "LastSale": "LP", "MarketCap": "MRKCAP", "IPOyear": "YR", "Sector": "SEC", "industry": "IND", "Summary Quote": "SUMQTE"})
    df['SYM'] = df['SYM'].str.strip()
    df['SEC'] = df['SEC'].str.strip()
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Non-Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=='Consumer Services', 'Consumer Industry', df['SEC'])
    df["SEC"] = df["SEC"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Non-Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Technology", "Technology/Energy")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Energy", "Technology/Energy")
    df = df.groupby('SEC_CONV').head(100)
    df = df.iloc[:, [8,3]]
    df['MRKCAP'] = df['MRKCAP'].str.replace('$', '')
    df['MRKCAP'] = df['MRKCAP'].str.replace(',', '')
    df['MRKCAP'] = df['MRKCAP'].str.replace('M', ' M')
    df['MRKCAP'] = df['MRKCAP'].str.replace('B', ' B')
    df['SEC_CONV'] = df['SEC_CONV'].fillna(value='No Industry Identified')
    df['MRKCAP'] = df['MRKCAP'].fillna(value='0 D')
    df.dropna(inplace = True)
    df[['MRKCAP_AMT','MRKCAP_TYPE']] = df.MRKCAP.str.split(" ",expand=True,)
    millions = df['MRKCAP_AMT'].str.replace('.', '').fillna(value='0').astype(int).multiply(other = 100, fill_value = 5)
    billions = df['MRKCAP_AMT'].str.replace('.', '').fillna(value='0').astype(int).multiply(other = 1000000, fill_value = 5)
    df.loc[df['MRKCAP_TYPE'] == 'M', 'Conversion'] = millions
    df.loc[df['MRKCAP_TYPE'] == 'B', 'Conversion'] = billions
    df.loc[df['MRKCAP_TYPE'] == 'D', 'Conversion'] = 0
    df.loc[df['MRKCAP_TYPE'] == 'None', 'Conversion'] = df['MRKCAP_AMT'].fillna(value='0')
    df['Conversion'] = df['Conversion'].fillna(value='0')
    df['Conversion'] = df['Conversion'].astype(int)
    res = df.groupby(['SEC_CONV'])['Conversion'].mean().reset_index()
    
    for x in range (0, len(res['Conversion'])):
        res ['Conversion'][x] = tokmb(res ['Conversion'][x])
    res = res.to_json(orient='records')
    #res = json.dumps(res)
    #res = res.replace('\\','')
    #res = res.replace('"{','{')
    #res = res.replace('}"','}')
    return res

def get_distinct_sector_listing():
    cols_to_use = [0,1,2,3,4,5,6,7]
    csv_file_path = "../assets/companylist.csv"
    df = pd.read_csv(csv_file_path, 
            usecols= cols_to_use,
            encoding='utf-8'
            )
    df = df.fillna('Empty')
    df['IPOyear'] = df['IPOyear'].astype(str)
    df['IPOyear'] = df['IPOyear'].str.strip('.0')

    df = df.rename(index=str, columns = {"Symbol": "SYM", "Name": "CO.", "LastSale": "LP", "MarketCap": "MRKCAP", "IPOyear": "YR", "Sector": "SEC", "industry": "IND", "Summary Quote": "SUMQTE"})
    df['SYM'] = df['SYM'].str.strip()
    df['SEC'] = df['SEC'].str.strip()
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Non-Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=='Consumer Services', 'Consumer Industry', df['SEC'])
    df["SEC"] = df["SEC"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Non-Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Technology", "Technology/Energy")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Energy", "Technology/Energy")
    df = df.SEC_CONV.unique()
    df = json.dumps(df.tolist())
    df.replace('\\','')
    return df

def get_industries_by_sector():
    cols_to_use = [0,1,2,3,4,5,6,7]
    csv_file_path = "../assets/companylist.csv"
    df = pd.read_csv(csv_file_path, 
#         nrows=101, 
        usecols= cols_to_use,
        encoding='utf-8'
        )
    df = df.fillna('Empty')
    df['IPOyear'] = df['IPOyear'].astype(str)
    df['IPOyear'] = df['IPOyear'].str.strip('.0')
    df = df.rename(index=str, columns = {"Symbol": "SYM", "Name": "CO.", "LastSale": "LP", "MarketCap": "MRKCAP", "IPOyear": "YR", "Sector": "SEC", "industry": "IND", "Summary Quote": "SUMQTE"})
    df['SYM'] = df['SYM'].str.strip()
    df['SEC'] = df['SEC'].str.strip()
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=="Consumer Non-Durables", 'Consumer Industry', df['SEC'])
    df['SEC_CONV'] = np.where(df['SEC']=='Consumer Services', 'Consumer Industry', df['SEC'])
    df["SEC"] = df["SEC"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Empty", "No Industry Identified")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Consumer Non-Durables", "Consumer Industry")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Technology", "Technology/Energy")
    df["SEC_CONV"] = df["SEC_CONV"].replace("Energy", "Technology/Energy")
    df = df.groupby('SEC_CONV').head(100)
    df = json.dumps(df.values.tolist())
    # df.replace('\\','')
    return df

@app.route('/getAvgSectorRatesAbr')
def abbrev_sector():
    return jsonify(get_avg_sector_rates_abbrev())

@app.route('/getAvgSectorRates')
def get_avg_sector():
    return jsonify(get_avg_sector_rates())

@app.route('/distinctSectors')
def get_distinct_sectors():
    return jsonify(get_distinct_sector_listing())

@app.route('/distinctSectorsWithIndustries')
def get_industries_with_sectros():
    return jsonify(get_industries_by_sector())

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
