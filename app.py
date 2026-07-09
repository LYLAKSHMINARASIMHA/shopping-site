from flask import Flask, render_template, request, url_for , redirect , session, jsonify
import random
import pandas as pd
import os
from openpyxl import load_workbook
app = Flask(__name__)

@app.context_processor
def inject_user():
     return{
          "userid": session.get("userid")
     }

app.secret_key = "my_secret_key"

folders ={
    "mens": "static/products/mens_dresses", #size
    "womens": "static/products/women_dresses",#size
    "phones": "static/products/phones",  #No
    "slippers" : "static/products/slippers",  # size
    "shoes" : "static/products/shoes",  # size
    "watchs" : "static/products/watchs",  #size
}
df = pd.read_excel("Shopping_W_data.xlsx")
df.columns = df.columns.str.strip().str.lower()
df = df.dropna(how="all")
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
                                grouped_Mimg = grouped_Mimg,
                                
                                )

@app.route("/Orders/")
def Orders():
    Gimages = []
    for Gfile in os.listdir(folders["womens"]):
        Gimages.append("products/women_dresses/" + Gfile)
        Gimages = Gimages[:3]
        O_Image = []
    for i in range(0, len(Gimages), 3):
            O_Image.append(Gimages[i:i+3])
    C_Image = []
    return render_template("Orders.html",
                              O_Image = O_Image,
                              C_Image = C_Image
                            )

@app.route("/Cart")
def Cart():
    return render_template("Cart.html")

@app.route("/Help_Center")
def Help_Center():
    return render_template("Help_Center.html")

@app.route("/products/<path:image>")
def products(image):
    imagename = image
    imagedata = image.split("/")
    imgname = imagedata[2].split(".")
    phones = imagedata[1]
    p_data = None
    for item in product:
        if str(imgname[0]) == str(item["p_id"]):
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

    for file in os.listdir(folders["shoes"]):
        imageId.append("products/shoes/" + file)

    for file in os.listdir(folders["watchs"]):
        imageId.append("products/watchs/" + file)

    if imagename == "products/img/":
        num = 15
    else:
        num = 9
       
       
    
    selectimg = (random.sample(imageId, num))
    img_group = []
    for i in range(0, len(selectimg),3):
            img_group.append(selectimg[i:i+3])
    return render_template("products.html", 
                           imagedata2 = imagedata,
                           image = image,
                           imageId = img_group,
                           products = p_data,
                           phones = phones)


@app.route("/login" , methods=["POST"])
def login():
     
     userid = session["userid"]
     email = request.form["email"]
     password = request.form["password"]


     

     return redirect("/")

@app.route("/register" , methods=["POST"])
def register():
     
     userName = request.form["username"]
     email = request.form["email"]
     password = request.form["password"]
     conform_password = request.form["conform-password"]

     excel_file = "Shopping_W_data.xlsx"
     sheet_name = "users_sheet"

     file = "Shopping_W_data.xlsx"
     

     wb = load_workbook(file)
     sheet1 = wb[sheet_name]
     last_userid = sheet1.cell(row=sheet1.max_row, column=1).value

    # Heading matrame unte
     if last_userid is None or last_userid == "":
         userid = "UI001"

     else:

         number = int(last_userid[2:])      # UI003 -> 3

         userid = f"UI{number+1:03d}"       # 4 -> UI004

    #  session["user"] = userName
     

     new_data = {
        "userid": [userid],
        "user" : [userName],
        "email" : [email],
        "password" : [password]
     }
     session["userid"] = userid

     new_df = pd.DataFrame(new_data)
     

     if os.path.exists(excel_file):
          book = load_workbook(excel_file)
          sheet = book[sheet_name]

          next_row = sheet.max_row
          with pd.ExcelWriter(excel_file,
                              engine="openpyxl",
                              mode="a",
                              if_sheet_exists="overlay") as writer:
               new_df.to_excel(
                    writer,
                    sheet_name=sheet_name,
                    index=False,
                    header=False,
                    startrow=next_row
               )
               print("user saved successfully")

     return redirect("/")

@app.route("/AllProducts")
def AllProducts():
    return render_template("AllProducts.html")

@app.route("/login_page")
def login_page():
     return render_template("login_page.html")

@app.route("/profile")
def profile():
    df = pd.read_excel("Shopping_W_data.xlsx", sheet_name="users_sheet")
    userid = session["userid"]
    userdata = df[df["userid"]== userid]

    userid = userdata.iloc[0]["userid"]
    username = userdata.iloc[0]["username"]
    email = userdata.iloc[0]["email"]

    
    return render_template("profile.html"
                           , userid =userid
                           , username = username
                           , email = email
                             )

@app.route("/check_login", methods=["POST"])
def check_login():
     df = pd.read_excel("Shopping_W_data.xlsx",
                        sheet_name="users_sheet")
      
     data = request.get_json()
     email = data["Lemail"]
     password = data["Lpassword"]

     

     if email in df["email"].values:
          userdata = df[df["email"]== email]
          excel_pwd = userdata.iloc[0]["password"]
          if userdata.empty:
           return jsonify({
               "success": False
          })
          elif password == excel_pwd:
                 session["userid"] = userdata.iloc[0]["userid"]
                 return jsonify({
                     "success": True
                 })
          else: 
                 return jsonify({
                     "success": False
                 })
     else: 
        return jsonify({
            "success": False
                })
     
          



@app.route("/check-LR", methods=["POST"])
def check_email():

    data = request.get_json()
    email = data["email"]
    

    df = pd.read_excel("Shopping_W_data.xlsx",
                        sheet_name="users_sheet")
                        

    if email in df["email"].values:

        return jsonify({
            "message": "Email Already Exists"
        })

    else:

        return jsonify({
             
            "message": "Email Available"
        })


@app.route("/buy_cart")
def buy_cart():
    return render_template("buy_cart.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug= True) 
    
