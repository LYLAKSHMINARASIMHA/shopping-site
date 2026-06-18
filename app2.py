from flask import Flask, render_template
import os
import random

app = Flask(__name__)
folders ={
    "mens": "static/products/mens_dresses",
    "womens": "static/products/women_dresses",
    "phones": "static/products/phones",
    "slippers" : "static/products/slippers"
}
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
    
    selectimg = (random.sample(imageId, 6))
    return render_template("testing_p.html", imageId = selectimg)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

