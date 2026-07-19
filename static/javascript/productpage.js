
const products_page = document.getElementById("products_page");
const BuyPage = document.getElementById("BuyPage");

if(products_page){

function buy() {
    window.location.href = "/login_page";
}



const sizeButtons = document.querySelectorAll(".btn");
const sizeError = document.querySelector(".sizeError");
const quantitydata = document.getElementById("quantitydata");
const quantityError = document.querySelector(".quantityError");
const buy_button = document.getElementById("buy_button");
const imagedata = document.getElementById("imagedata");
const no_size = document.getElementById("no_size");
let nextpage = false;


// product size
let sizeoption = no_size.innerText.trim();
let selectedSize = "";



// image path
const imgpath = imagedata.getAttribute("src").replace("/static/","");

let BuyValid = true;


                        sizeButtons.forEach(function (button) {

                            button.addEventListener("click", function () {

                                sizeButtons.forEach(function (btn) {
                                    btn.classList.remove("selected");
                                sizeError.classList.remove("active");
                                });

                                this.classList.add("selected");
                                selectedSize = this.innerText;
                            });
                        });




if(!sizeoption){

    console.log("it's have options ");
    
}
else{
    console.log("it's no options");
    selectedSize = "nosize";
    
}


buy_button.addEventListener("click",()=>{
        const quantityvalid = Number(quantitydata.value) >= 1 && Number(quantitydata.value) <= 25;
        quantityError.classList.toggle("active", !quantityvalid);

    const imgpathvalid = imgpath !== "";
    const sizevalid = selectedSize !== "";
    console.log(sizevalid);
    if(sizeError){
    sizeError.classList.toggle("active", !sizevalid );
    }

    if(sizevalid && quantityvalid && imgpathvalid){
        fetch("/check_buydata", {
        method : "POST",
        headers : {
            "content-Type" : "application/json"
        },
        body : JSON.stringify({
            quantity : Number(quantitydata.value),
            Size : selectedSize,
            imgpath : imgpath
        })
    })
    .then(response => response.json())
    .then(data =>{
        nextpage = data.ok;
        if(nextpage){
            window.location.href = "/buy_page";
        }
    })

    console.log(imgpath);
    console.log(selectedSize);
    }
    

    // console.log(selectedSize);

});


}


//----------------------------------------------------------------------------- 



const successMSG = document.querySelector(".successMSG");

function write_excel() {
    fetch("/write_excel",{
        method : "POST",
        headers : {
            "content-Type" : "application/json"
        },
        body : JSON.stringify({
            ok : true,
            imgpath: BimgID,
            quantity: Bquantity,
            Size: Bsize,
            ODdate : Bdate
        })
    })

    .then(response => response.json())
    .then(data =>{
       let msg = data.ok
        if(msg){
            successMSG.classList.add("action");
            setTimeout(() => {
            window.location.href= "/";
            }, 500);
        }
    })
}
function cancel_excel() {
    window.history.go(-1);
}


