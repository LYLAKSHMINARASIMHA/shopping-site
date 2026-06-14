from flask import Flask, render_template, request, url_for , redirect
import random
import os
app = Flask(__name__)

folders ={
    "mens": "static/products/mens_dresses",
    "womens": "static/products/women_dresses",
    "phones": "static/products/phones",
    "slippers" : "static/products/slippers"
}

@app.route("/")
def testing():
    images = []
    for file in os.listdir(folders["mens"]):
        images.append("products/mens_dresses/" + file)
        images = images[:6]
   
        # --------------------------------------------------

    Gimages = []
    for Gfile in os.listdir(folders["womens"]):
        Gimages.append("products/women_dresses/" + Gfile)
        Gimages = Gimages[:6]
    
        # ---------------------------------------
   
    Mimage = []
    for Mfile in os.listdir(folders["phones"]):
        Mimage.append("/products/phones/" + Mfile)
        Mimage = Mimage[:6]
   

    return render_template("Home.html", grouped_Bimg=images, grouped_Gimg = Gimages, grouped_Mimg = Mimage)

@app.route("/Orders")
def Orders():
    return render_template("Orders.html")

@app.route("/Cart")
def Cart():
    return render_template("Cart.html")

@app.route("/Help_Center")
def Help_Center():
    return render_template("Help_Center.html")

@app.route("/products/<path:image>")
def products(image):
    imageId = []
    for file in os.listdir(folders["mens"]):
        imageId.append("products/mens_dresses/" + file)
    
    for file in os.listdir(folders["womens"]):
        imageId.append("products/women_dresses/" + file)

    for file in os.listdir(folders["phones"]):
        imageId.append("products/phones/" + file)

    for file in os.listdir(folders["slippers"]):
        imageId.append("products/slippers/" + file)

    selectimg = (random.sample(imageId, 6))

    return render_template("products.html", image = image, imageId = selectimg)

@app.route("/AllProducts")
def AllProducts():
    return render_template("AllProducts.html")


# @app.route("/product")
# def product():
#     return render_template("products_temp.html")

if __name__ == "__main__":
    app.run(debug= True) 
    
