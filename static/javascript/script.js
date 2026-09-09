const more = document.querySelector(".more");
    const dropdown = document.querySelector(".dropdown");
    const S_L = document.querySelector(".S_L");
    const PRF = document.querySelector(".PRF");
    const nav = document.querySelector(".mnbtn");
    const button = document.querySelector(".mbtn");
     // const menu = document.querySelector(".menu");
    

    button.addEventListener("click",()=> {
        nav.classList.toggle("active");
     //   menu.classList.toggle("active");
    });
    PRF.addEventListener("click", () => {
        S_L.classList.toggle("active");
    });
    more.addEventListener("click", () => {
        dropdown.classList.toggle("active");
    });

    window.addEventListener("resize",() => {
        if(window.innerWidth > 450){
            S_L.classList.remove("active");
            dropdown.classList.remove("active");
            nav.classList.remove("active");
            
        if (D_alldata1) {
        D_alldata1.classList.toggle("active");
        D_alldata1 = null;
    }
    
        }
    });

    window.addEventListener("scroll",()=>{
        // D_alldata1.remove("active");
        S_L.classList.remove("active");
        nav.classList.remove("active");
        dropdown.classList.remove("active");
        searchSuggestions.classList.remove("active");
    });

//........................logOut.........................
function logOut(){
    fetch("/logOut",{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify({
            logout: true
        })
    })
    .then(response=>response.json())
    .then(data=>{
        if (data.ok){
            window.location.href= "/login_page";
        }
    })
}

// .....................{ product buy and cart }......................


function orderT(button){
    const order = button.closest(".order");
    const orderdetails = order.querySelector(".orderdetails");

    orderdetails.classList.add("active");
    setTimeout(()=>{
        orderdetails.classList.remove("active");
    },1500)
}

function cancel_O(button){
    if(!confirm("Are you sure you want to cancel this order? ")){
        return;
    }
    const OrderID = button.dataset.orderid;
    const orderCard = button.closest(".order");
    console.log(OrderID);
    // removeOP

    fetch("/removeOP",{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify({
            "Rorderid": OrderID
        })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.ok){
            location.reload();
            console.log(OrderID,"Update");
        }
    })
}

const type_buttons = document.querySelectorAll(".type_buttons button");
const orderCard = document.querySelectorAll(".order");

type_buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        
        type_buttons.forEach(btn =>{
            btn.classList.remove("active");
        })
        button.classList.add("active");

        const filter = button.innerText;

        orderCard.forEach(order =>{
    const status = order.dataset.status;

    if (filter == "All Orders"){
        order.style.display = "block";
    }
    else if (filter == "Shipped"){
        if (status == "shipping"){
            order.style.display="block";
        }
        else{
            order.style.display="none";
        }
    }
    else if(filter == "Delivered"){
        if (status == "Delivered"){
            order.style.display="block";
        }
        else{
            order.style.display="none";
        }
    }
    else if(filter == "Cancelled"){
        if (status == "Cancelled"){
            order.style.display="block";
        }
        else{
            order.style.display="none";
        }
    }
});

    });
});



//  ...............searching

const SHin = document.querySelector(".SHin");
const searchSuggestions = document.querySelector(".search_suggestions");

// Python nundi ee array ni pampali
const ProductNames = [
    "Men wear",
    "Women wear",
    "Mobiles",
    "Shoes",
    "Running Shoes",
    "Sports Shoes",
    "phones",
    "New phones",
    "Women Dress",
    "Watch",
    "Women Watchs",
    "Men Watchs",
    "Slippers"
];

SHin.addEventListener("input", () => {

    const value = SHin.value.toLowerCase().trim();

    searchSuggestions.innerHTML = "";

    if(value == ""){

        searchSuggestions.classList.remove("active");
        return;

    }

    let found = false;

    ProductNames.forEach(product => {

        if(product.toLowerCase().includes(value)){

            found = true;

            const div = document.createElement("div");

            div.className = "search_item";

            div.innerText = product;

            div.addEventListener("click",()=>{

                SHin.value = product;

                searchSuggestions.classList.remove("active");

            });

            searchSuggestions.appendChild(div);

        }

    });

    if(found){

        searchSuggestions.classList.add("active");

    }

    else{

        searchSuggestions.classList.add("active");

        searchSuggestions.innerHTML =
        `<div class="search_empty">
            No Products Found
        </div>`;

    }

});

const Search_btn = document.getElementById("S-button");

Search_btn.addEventListener("click",()=> {
    const value = SHin.value.toLowerCase().trim();
    console.log(value);

    if(value == ""){
        searchSuggestions.classList.remove("active");
        return;
    }
    else {
         window.location.href = "/searchproducts?search="+ encodeURIComponent(value);
    }
});


