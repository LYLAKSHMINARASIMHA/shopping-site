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
        }
    });

    window.addEventListener("scroll",()=>{
        S_L.classList.remove("active");
        nav.classList.remove("active");
        dropdown.classList.remove("active");
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
    const order = button.closest(".order")
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


 