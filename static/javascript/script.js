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


// .....................{ product buy and cart }......................



 