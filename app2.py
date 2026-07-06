from flask import Flask, render_template
import os
from openpyxl import load_workbook
import gspread
from google.oauth2.service_account import Credentials
import pandas as pd 

# logintesting.html   testing_p.html

app = Flask(__name__)

# data_url = "https://docs.google.com/spreadsheets/d/1Rhk0JHhzzCCpHNAt1m6c3opGCH1rOj5DlG5A1oFGEE4/export?format=csv"


@app.route("/")
def home():
    df = pd.read_excel("Shopping_W_data.xlsx")
    df.columns = df.columns.str.strip().str.lower()
    df = df.dropna(how="all")
    product = df.to_dict(orient="records")
    # print(product)

    return render_template("testing_p.html" , product = product )
# render_template("testing_p.html" , product = product )

if __name__ == "__main__":
    app.run(debug=True)
    # app.run(host="0.0.0.0", port=5000, debug=True)


    
# data_url = "https://docs.google.com/spreadsheets/d/1Rhk0JHhzzCCpHNAt1m6c3opGCH1rOj5DlG5A1oFGEE4/export?format=csv"
# df = pd.read_csv(data_url)

# df = pd.read_csv(data_url)
# df.columns = df.columns.str.strip().str.lower()
# product = df.to_dict(orient="records")

