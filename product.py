from flask import Flask, render_template
import pandas as pd 

app = Flask(__name__)

@app.route("/")
def home():
    df = pd.read_excel("S_products.xlsx")

    df.columns = df.columns.str.strip().str.lower()

    df = df.dropna(how="all")
    man_products =df[df["category"]=="mens"]
    
    products = df.to_dict(orient="records")

    return render_template("pageT.html", products=products )

if __name__ == "__main__":
    app.run(debug=True)