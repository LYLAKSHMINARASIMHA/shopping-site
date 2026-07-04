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

    // -------------------------------------------------------------------- 


     const LR_block = document.querySelector(".LR-block");
     const loginform_form = document.querySelector(".login-form");
    const registrform_form = document.querySelector(".register-form");
     const formbtns2 = document.querySelector(".formbtns2");
     const L_F_open = document.querySelector(".L_F_open");
    const R_F_open = document.querySelector(".R_F_open");

           function L_rotate(){
                registrform_form.style.transform = "translateY(150px) translateX(-100px)";
                L_F_open.style.transform = "rotate(90deg)";
                registrform_form.style.opacity="0";

                setTimeout(()=>{
                    loginform_form.style.transform = "translateY(-180px) translateX(-175px)";
                    loginform_form.style.width = "min(90vw,350px)";
                    loginform_form.style.height = "min(90vw,350px)";
                    L_F_open.style.display = "none";
                    
                }, 1000)
                setTimeout(()=>{
                    forms[0].style.display="block";
                },1500)
        }

            function LF_close(){
                forms[0].style.display="none";
                
                setTimeout(() => {
                    loginform_form.style.removeProperty("height");
                    loginform_form.style.removeProperty("width");
                    loginform_form.style.removeProperty("transform");
                    
                        setTimeout(()=>{
                        L_F_open.style.display = "flex";
                    },200)
                }, 500)
                setTimeout(()=>{
                    registrform_form.style.removeProperty("transform");
                    registrform_form.style.removeProperty("opacity");
                L_F_open.style.transform = "rotate(0deg)";
                },1000)
                
                
                
                    
            }

            function R_rotate(){
                loginform_form.style.transform = "translateY(-200px)";
                loginform_form.style.opacity="0";
                registrform_form.style.transform = "rotate(90deg) translateY(-0px) translateX(-110px)";
                    
                    setTimeout(()=>{
                        registrform_form.style.transform = "rotate(90deg) translateY(220px) translateX(-150px)";
                        registrform_form.style.width = "min(140vw,450px)";
                    registrform_form.style.height = "min(90vw,350px)";
                    R_F_open.style.display = "none";
                    forms[1].style.transform = "rotate(-90deg)";
                    LR_block.style.height ="450px"
                    setTimeout(()=>{
                        forms[1].style.display="block";
                    },500)
                    },1000)

            }

            function RF_close(){
                forms[1].style.display = "none";
                setTimeout(()=>{
                    forms[1].style.transform = "rotate(0deg)";
                    registrform_form.style.removeProperty("width");
                    registrform_form.style.removeProperty("height");
                    LR_block.style.removeProperty("height");
                    R_F_open.style.removeProperty("display");
                    registrform_form.style.removeProperty("transform");
                   
                },500)
                setTimeout(()=>{
                    
                 loginform_form.style.removeProperty("transform");
                    loginform_form.style.removeProperty("opacity");
                },1000)
            }


        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        const forms = document.querySelectorAll("form");
// >>>>>>>>>>>>>>>>>>>_____login_____>>>>>>>>>>>>>>>>>>>>>>
function LtogglePassword() {
        const passinput = document.getElementById("Lpassword");
        if(passinput.type === "password"){
            passinput.type="text";
        }
        else{
            passinput.type = "password";
        }
       }

      
            
       

        forms[0].addEventListener(
        "submit", function(e){
            e.preventDefault();
            const Lemail = document.getElementById("Lemail");
            const Lpassword = document.getElementById("Lpassword");

            let valid = true;
        //E-mail error block
           if(!Lemail.value.includes('@gmail') || !Lemail.value.includes('.')){
                showError(Lemail);
                valid = false;
            }
            else{
                hideError(Lemail);
            }
            
         //password error block
            if(Lpassword.value.trim() === ""){
                showError(Lpassword);
                valid = false;
            }
            else{
                hideError(Lpassword);
            }
       
        });


// >>>>>>>>>>>>>>>>>>>_____registr_____>>>>>>>>>>>>>>>>>>>>>>
        //password-to-text ---part
       function togglePassword() {
        const passinput = document.getElementById("password");
        if(passinput.type === "password"){
            passinput.type="text";
        }
        else{
            passinput.type = "password";
        }
       }
          function togglePassword1() {
        const passinput = document.getElementById("conform-password");
        if(passinput.type === "password"){
            passinput.type="text";
        }
        else{
            passinput.type = "password";
        }
       }   

       forms[1].addEventListener(
        "submit", function(e){
            e.preventDefault();
            const username = document.getElementById("user-name");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const Cpassword = document.getElementById("conform-password");

            let valid = true;
        //user name error block
           if(username.value == ""){
             showError(username);
                valid = false;
           }
            else{
                hideError(username);
            }

        //E-mail error block
            if(!email.value.includes('@gmail') || !email.value.includes('.')){
                showError(email);
                valid = false;
            }
            else{
                hideError(email);
            }
            
        //password error block
            if(password.value.trim() === ""){
                showError(password);
                valid = false;
            }
            else{
                hideError(password);
            }
        // password match block
            if(Cpassword.value.trim() === ""){
                showError(Cpassword);
                valid = false;
            }
            else{
                hideError(Cpassword);
            }

            if(password.value.trim() === ""){
               showError(password);
               valid = false;
            }
            else if(Cpassword.value.trim() === ""){
               hideError(password);
               showError(Cpassword);
               valid = false;
            }
            else if(password.value !== Cpassword.value){
                hideError(password);
                hideError(Cpassword);
                showError1(Cpassword);
                valid = false;
            }
            else{
                hideError1(Cpassword);
            }
        });
      
       function showError(input){
        input.parentElement.classList.add("error-show");
       }
      
       function hideError(input){
        input.parentElement.classList.remove("error-show");
       }
       function showError1(input){
        input.parentElement.classList.add("Perror-show");
       }
       function hideError1(input){
        input.parentElement.classList.remove("Perror-show");
       }


    // window.addEventListener("scroll", function() {
    //     let menu = document.querySelector("mbtn");
    //     if(window.innerWidth <= 840){
    //            if (window.scrollY > 200){
    //         menu.classList.add("show");
    //     }
    //     else{
    //       menu.classList.remove("show");
    //     }
    //     }
    // });


 