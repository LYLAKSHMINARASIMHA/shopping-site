from flask import Flask, render_template
import os
from openpyxl import load_workbook
import gspread
from google.oauth2.service_account import Credentials
import pandas as pd 


app = Flask(__name__)



@app.route("/")
def home():
    revenue = [7500,14500,10000,16500,22000,15000,20500,60000]

    return render_template("testing_p.html",
                           revenue=revenue)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug= True) 


    
# data_url = "https://docs.google.com/spreadsheets/d/1Rhk0JHhzzCCpHNAt1m6c3opGCH1rOj5DlG5A1oFGEE4/export?format=csv"
# df = pd.read_csv(data_url)

# df = pd.read_csv(data_url)
# df.columns = df.columns.str.strip().str.lower()
# product = df.to_dict(orient="records")

