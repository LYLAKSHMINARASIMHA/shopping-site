from flask import Flask, render_template, request, url_for , redirect
import random
import pandas as pd
import os
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
def testing():
    images = []
    for file in os.listdir(folders["mens"]):
        images.append("products/mens_dresses/" + file)
        images = images[:6]
    grouped_Bimg =[]
    for i in range(0, len(images),3):
        grouped_Bimg.append(images[i:i+3])
   
        # --------------------------------------------------

    Gimages = []
    for Gfile in os.listdir(folders["womens"]):
        Gimages.append("products/women_dresses/" + Gfile)
        Gimages = Gimages[:6]
    grouped_Gimg = []
    for i in range(0, len(Gimages),3):
            grouped_Gimg.append(Gimages[i:i+3])
        # ---------------------------------------
   
    Mimage = []
    for Mfile in os.listdir(folders["phones"]):
        Mimage.append("/products/phones/" + Mfile)
        Mimage = Mimage[:6]
    grouped_Mimg = []
    for i in range(0, len(Mimage), 3):
            grouped_Mimg.append(Mimage[i:i+3])
        
   

    return render_template("Home.html",
                            grouped_Bimg=grouped_Bimg,
                              grouped_Gimg = grouped_Gimg,
                                grouped_Mimg = grouped_Mimg
                                )

@app.route("/Orders")
def Orders():
    pimage = []
    for Mfile in os.listdir(folders["womens"]):
        pimage.append("products/women_dresses/" + Mfile)
        pimage = pimage[:3]
    pimage_g = []
    for i in range(0, len(pimage), 2):
            pimage_g.append(pimage[i:i+2])
    return render_template("Orders.html", 
                           pimage_g = pimage_g)

@app.route("/Cart")
def Cart():
    return render_template("Cart.html")

@app.route("/Help_Center")
def Help_Center():
    return render_template("Help_Center.html")

@app.route("/products/<path:image>")
def products(image):

    imagedata = image.split("/")

    p_data = None
    for item in product:
        if imagedata[2] == item["p_id"]:
           p_data = item
           break

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
    img_group = []
    for i in range(0, len(selectimg),3):
            img_group.append(selectimg[i:i+3])
    return render_template("products.html", 
                           imagedata2 = imagedata,
                           image = image,
                           imageId = img_group,
                           products = p_data)

@app.route("/AllProducts")
def AllProducts():
    return render_template("AllProducts.html")


# @app.route("/product")
# def product():
#     return render_template("products_temp.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug= True) 
    
