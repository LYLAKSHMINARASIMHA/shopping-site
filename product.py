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

#  new_data = [
#     {"P_ID" : "PIGW1",
#     "P_Name":"Women's Cute Cat Face Watch",
#     "P_Price":699,
#     "P_Description":"Cute cat-face dial with soft silicone strap. Lightweight and perfect for daily wear.",
#     "P_Rating":4.5,
#     "category": "women"},

#     {"P_ID" : "PIGW2",
#     "P_Name":"Women's Marble Dial Watch",
#     "P_Price":849,
#     "P_Description":"Elegant marble-pattern dial with rose gold finish and comfortable silicone strap.",
#     "P_Rating":4.6,
#     "category": "women"},

#     {"P_ID" : "PIGW3",
#     "P_Name":"Women's Geneva Classic Watch",
#     "P_Price":999,
#     "P_Description":"Stylish Geneva analog watch featuring a premium white silicone strap.",
#     "P_Rating":4.7,
#     "category": "women"},

#     {"P_ID" : "PIGW4",
#     "P_Name":"Women's Minimal Square Watch",
#     "P_Price":899,
#     "P_Description":"Modern square dial watch with soft silicone strap.",
#     "P_Rating":4.4,
#     "category": "men and women"},

#     {"P_ID" : "PIBGW",
#     "P_Name":"Unisex Classic Silicone Watch",
#     "P_Price":799,
#     "P_Description":"Minimal analog watch with soft silicone strap suitable for men and women.",
#     "P_Rating":4.5,
#     "category": "men"},

#     {"P_ID" : "PIBW1",
#     "P_Name":"Men's Luxury Leather Watch",
#     "P_Price":2499,
#     "P_Description":"Premium leather strap watch with elegant blue dial and calendar display.",
#     "P_Rating":4.8,
#     "category": "men"},

#     {"P_ID" : "PIBW2",
#     "P_Name":"Men's Premium Steel Watch",
#     "P_Price":3199,
#     "P_Description":"Stainless steel analog watch with black dial and luxury finish.",
#     "P_Rating":4.7,
#     "category": "men"},

#     {"P_ID" : "PIBW3",
#     "P_Name":"Men's Automatic Skeleton Watch",
#     "P_Price":4299,
#     "P_Description":"Mechanical automatic skeleton dial watch with premium metal strap.",
#     "P_Rating":4.9,
#     "category": "men"},

#     {"P_ID" : "PIBW4",
#     "P_Name":"Men's Imperious Green Watch",
#     "P_Price":2799,
#     "P_Description":"Modern green dial analog watch with black case.",
#     "P_Rating":4.6,
#     "category": "men"}
    
#     ]
    
#     newData = pd.DataFrame(new_data)
   