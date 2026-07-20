from flask import Flask, render_template, request, url_for , redirect , session, jsonify
import random
import pandas as pd
import os
from openpyxl import load_workbook
from datetime import datetime
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



# ............. product data 
product_dict ={}
for item in product:
     product_dict[str(item["p_id"])] = item




@app.route("/")
def testing():

    offmenu = True
    

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
                                offmenu = offmenu,
                                )

@app.route("/Orders/")
def Orders():

    #  users_history sheet
    OdataF = pd.read_excel("Shopping_W_data.xlsx", sheet_name="users_history")
    OdataF.columns = OdataF.columns.str.strip().str.lower()
    OdataF = OdataF.dropna(how="all")
    UHproduct = OdataF.to_dict(orient="records")
    # print(OdataF)``

    # ..........images path len(UHproduct)
    imgpaths = {}
    for root, dirs, files in os.walk("static/products"):
        for file in files:
            img_ID = os.path.splitext(file)[0]
            imgpaths[img_ID] = os.path.join(root,file).replace("\\","/").replace("static/","")
    
    userID =session.get("userid")
    p_data = []
    OrderID =[] 
    Pimgid=[]
    UOdate={}
    
                #  "quantity": item["quantity"],  orderid
    for item in UHproduct:
        if str(userID) == str(item["userid"]):
            OrderID.append({
                 "OrderID" : item["orderid"]
            })
            p_data.append({
                      "quantity": item["quantity"]
            })
            UOdate[item["p_id"]]= {
                 "order date":item["date"].split("||")[0],
                 "delivery date":item["date"].split("||")[1]
            }
            Pimgid.append(item["p_id"])
            session["totalOrders"] = len(Pimgid)
    
    O_ID =[]
    for item in UHproduct:
        if str(userID) == str(item["userid"]):
            O_ID.append({
                 "OrderID" : item["orderid"]
            })

    

    

    imgdata = {}
    for pid in Pimgid:
        if str(pid) in product_dict:
            imgdata[pid] = product_dict[pid]

    imglocation = {}
    for item in Pimgid:
         imglocation[item] = imgpaths[item]
         
    Orderdata=[]
    i =0 
    for pid in Pimgid:
         Orderdata.append({
              "OrderID":O_ID[i]["OrderID"],
              "image":imglocation[pid],
              "product":imgdata[pid],
              "order_date":UOdate[pid]["order date"],
              "delivery_date":UOdate[pid]["delivery date"],
              "totalamount":p_data[i]["quantity"]*imgdata[pid]["p_price"],
              "quantity":p_data[i]["quantity"]
         })
         i +=1

    
    # print(O_ID)
    # print(totalOrders)
    # "quantity":p_data[i]["quantity"]
    # print(f" Orderdata: {Orderdata}\n")
    # print(f" p_quantity: {p_quantity}\n")
    # print(f"{imglocation}\n")
    # print(f"{p_data[1]["quantity"]}\n")
    # print(f"{UOdate}\n")
    # print(f"{imgdata["PIGW3"]}\n")
    # print(Pimgid)
    # print(product_dict)  
    
    # print(UOdate1)
    # ["date"]  Uproduct = p_data[1] i+=1 UOdate=Uproduct["p_id"]
    # .split("||") Uproduct={} UOdate1=UOdate  UOdate1[4][1] p_id
         

    return render_template("Orders.html",
                              UOdate = UOdate,
                              Orderdata = Orderdata
                            )



@app.route("/Help_Center")
def Help_Center():
    return render_template("Help_Center.html")

@app.route("/products/<path:image>")
def products(image):
    offmenu = True

    imagename = image
    imagedata = image.split("/")
    imgname = imagedata[2].split(".")
    phones = imagedata[1]
    hasSize = ""
    if phones in ["phones", "mainimg"]:
         hasSize = phones
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
       
       
    reviews = random.randrange(100, 281)
    
    selectimg = (random.sample(imageId, num))
    img_group = []
    for i in range(0, len(selectimg),3):
            img_group.append(selectimg[i:i+3])

    return render_template("products.html", 
                           imagedata2 = imagedata,
                           image = image,
                           imageId = img_group,
                           products = p_data,
                           hasSize = hasSize,
                           reviews = reviews,
                           offmenu = offmenu,)



@app.route("/register" , methods=["POST"])
def register():
     UI = session.get("userid")
     if UI:
          return jsonify({
                         "ok":True
                    })
     data = request.get_json()
     
     userName = data["username"]
     email = data["email"]
     password = data["password"]
    #  conform_password = request.form["conform-password"]

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
               if data:
                    return jsonify({
                         "ok":True
                    })


@app.route("/login_page")
def login_page():
     userid = session.get("userid")

     if userid:
          return redirect("/")
     
     return render_template("login_page.html")

@app.route("/profile")
def profile():
    if not session.get("userid"):
         return render_template("login_page.html")
    userid = session.get("userid")
    df = pd.read_excel("Shopping_W_data.xlsx", sheet_name="users_sheet")
    df.columns = df.columns.str.strip().str.lower()
    df = df.dropna(how="all")
    userdata = df[df["userid"]== userid]
    totalOrders = session.get("totalOrders")

    userid = userdata.iloc[0]["userid"]
    username = userdata.iloc[0]["username"]
    email = userdata.iloc[0]["email"]

    
    return render_template("profile.html"
                           , userid =userid
                           , username = username
                           , email = email
                           ,totalOrders = totalOrders
                             )

@app.route("/check_login", methods=["POST"])
def check_login():
     df = pd.read_excel("Shopping_W_data.xlsx",
                        sheet_name="users_sheet")
     df.columns = df.columns.str.strip().str.lower()
     df = df.dropna(how="all")
      
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
    df.columns = df.columns.str.strip().str.lower()
    df = df.dropna(how="all")
                        

    if email in df["email"].values:

        return jsonify({
            "message": "Email Already Exists"
        })

    else:

        return jsonify({
             
            "message": "Email Available"
        })



@app.route("/check_buydata", methods=["POST"])
def check_buydata():
    data = request.get_json()
    quantity = data["quantity"]
    size = data["Size"]
    imgpath = data["imgpath"]


    
    check_Q = quantity >= 1 and quantity <= 25
    check_S = size.lower() in ["s","m","l","xl","nosize"]
    check_imgp = bool(imgpath)
    
    if check_Q and check_S and check_imgp:
         
         session["buy_data"]={
              "quantity":quantity,
              "size" : size,
              "imgpath": imgpath
         }
         return jsonify({"ok":True})
    else:
         return jsonify({"ok": False})
    

@app.route("/buy_page")
def buy_page():
    buy_data = session.get("buy_data")

    if not buy_data:
         return redirect("/")

    imgpath = buy_data["imgpath"].split("/")

    imgID = imgpath[2].split(".")

    df = pd.read_excel("Shopping_W_data.xlsx")
    df.columns = df.columns.str.strip().str.lower()
    df = df.dropna(how="all")
    product = df.to_dict(orient="records")
    
    img_data = ""
    for item in product:
         if str(imgID[0]) == str(item["p_id"]):
              img_data = item
              break
         
    totat=int(img_data["p_price"]) * int(buy_data["quantity"])

    buy_data["totat_amount"] = totat
    # print(buy_data)


    date_time = datetime.now()
    O_date = date_time.strftime("%d/%m/%y")
    D_d = date_time.strftime("%d")
    D_date =(f"{9+int(D_d)}{date_time.strftime("/%m/%y")}")
    O_D_date = (f"{O_date}||{D_date}")

    

    
    
    return render_template("buy_page.html" 
                           ,buy_data = buy_data
                            ,img_data = img_data
                             ,O_date = O_date
                              ,D_date = D_date
                               ,O_D_date = O_D_date  )

@app.route("/write_excel", methods=["POST"])
def write_excel():
    #  users_history sheet
    OdataF = pd.read_excel("Shopping_W_data.xlsx", sheet_name="users_history")
    OdataF.columns = OdataF.columns.str.strip().str.lower()
    OdataF = OdataF.dropna(how="all")
    UHproduct = OdataF.to_dict(orient="records")

    
    data = request.get_json()

    imgpath = data["imgpath"].split("/")
    imgID = imgpath[2].split(".")

    quantity = data["quantity"]
    size = data["Size"]
    date = data["ODdate"]
    userID = session.get("userid")

    O_ID =[]
    for item in UHproduct:
        if str(userID) == str(item["userid"]):
            O_ID.append({
                 "OrderID" : item["orderid"]
            })
    print(O_ID)

    if O_ID:
         last_order = O_ID[-1]["OrderID"]
         num = int(last_order.split("O")[-1])
         orderID = f"{userID}O{num+1}"
    else:
         orderID = (f"{userID}O1")

    # print(f"orderID: {orderID}")
    # print(f"userID: {userID}")
    # print(imgID[0])
    # print(quantity)
    # print(size)
    # print(date)

    excel_file = "Shopping_W_data.xlsx"
    sheet_name = "users_history"
    
    BUY_data = {
         "orderID": [orderID],
         "user_id": [userID],
         "Date": [date],
         "P_ID": [imgID[0]],
         "Qantity": [quantity],
         "Size": [size]
    }
    new_data= pd.DataFrame(BUY_data)

    if os.path.exists(excel_file):
         book = load_workbook(excel_file)
         sheet = book[sheet_name]
         
         next_row = sheet.max_row

         with pd.ExcelWriter(excel_file
                             ,engine="openpyxl"
                             ,mode="a"
                             ,if_sheet_exists="overlay") as writer:
              new_data.to_excel(
                   writer,
                   sheet_name=sheet_name,
                   index=False,
                   header=False,
                   startrow=next_row
              )
              session.pop("buy_data", None)
              print("save success")

    


    if data:
         return jsonify({"ok": True})


    return redirect("/")

@app.route("/logOut", methods=["POST"])
def logOut():
     data = request.get_json()
     logout = data["logout"]
     if logout:
          print("logOUT success")
          session.clear()
          return jsonify({"ok":True})
     return "logOUT success"

@app.route("/removeOP", methods=["POST"])
def removeOP():
     data = request.get_json()
     Rorderid = data["Rorderid"]

     XLname ="Shopping_W_data.xlsx"
     df = pd.read_excel("Shopping_W_data.xlsx", sheet_name="users_history")
     df.columns = df.columns.str.strip().str.lower()
     df = df.dropna(how="all")
     

     if Rorderid in df["orderid"].values:
        df = df[df["orderid"] != Rorderid]
        with pd.ExcelWriter(
            XLname,
            engine="openpyxl",
            mode="a",
            if_sheet_exists="replace"
        ) as writer:
         df.to_excel(
            writer,
            sheet_name="users_history",
            index=False
        )
        print("Order Deleted successfully. ")
        print(f"{Rorderid} success")
        return jsonify({"ok":True})
     else:
         print("Order ID not found. ")
         return jsonify({"ok":True})
          
               
    #  print(f"{POID} success")
     return "remove order product"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug= True)
    

    
        # df=df[df["orderid"] != Rorderid ]
        # df.to_excel("Shopping_W_data.xlsx", index= False)
    
