from flask import Flask, render_template
import os
import random 
import pandas as pd 

app = Flask(__name__)
folders ={
    "mens": "static/products/mens_dresses",
    "womens": "static/products/women_dresses",
    "phones": "static/products/phones",
    "slippers" : "static/products/slippers"
}
data_url = "https://docs.google.com/spreadsheets/d/1Rhk0JHhzzCCpHNAt1m6c3opGCH1rOj5DlG5A1oFGEE4/export?format=csv"
df = pd.read_csv(data_url)
df.columns = df.columns.str.strip().str.lower()
product = df.to_dict(orient="records")

@app.route("/")
def home():

 

    
    imageId = []
    for file in os.listdir(folders["mens"]):
        imageId.append("products/mens_dresses/"+ file)

    for file in os.listdir(folders["womens"]):
        imageId.append("products/women_dresses/" + file)

    for file in os.listdir(folders["phones"]):
        imageId.append("products/phones/" + file)

    for file in os.listdir(folders["slippers"]):
        imageId.append("products/slippers/" + file)
    
    selectimg = (random.sample(imageId, 1))
   
    imagenames = selectimg[0].split("/")

    imgname = imagenames[2].split(".")

    print(imgname[0])
    p_data = None
    for item in product:
        if imgname[0] == item["p_id"]:
           p_data = item
           break
    

    print(p_data)
    
    return render_template("testing_p.html", imageId = selectimg 
                           , imagenames =imagenames , products = p_data )
# p_data = p_data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

