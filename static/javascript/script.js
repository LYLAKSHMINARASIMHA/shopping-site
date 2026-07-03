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


     const loginform_form = document.querySelector(".login-form");
    const registrform_form = document.querySelector(".registr-form");
     const formbtns2 = document.querySelector(".formbtns2");
     const L_F_open = document.querySelector(".L_F_open");
    const R_F_open = document.querySelector(".R_F_open");
           function L_rotate(){
            
            loginform_form.style.transform = "rotate(0deg)";
            registrform_form.style.top = "90%";
            registrform_form.style.opacity = "0.7";
            setTimeout(() => {
                loginform_form.classList.toggle("open");
                registrform_form.style.opacity = "0.2";
                L_F_open.style.display="none";
                formbtns2.style.display="none";
             }, 1000);
            setTimeout(() => {
                registrform_form.style.display= "none";
                forms[0].style.display= "block";
            
             }, 1000);
        }

            function LF_close(){
                forms[0].style.display = "none";
                
                setTimeout(() => {
                    loginform_form.classList.remove("open");
                    loginform_form.style.transform = "rotate(90deg)";

                    registrform_form.style.display= "block";
                    L_F_open.style.display="flex";
                    formbtns2.style.display="flex";
                }, 500);
                setTimeout(()=>{
                    registrform_form.style.top = "350px";
                }, 700)
                setTimeout(()=>{
                    registrform_form.style.display= "block";
                    registrform_form.style.opacity = "1";
                },1000)
                
                    
            }

            function R_rotate(){
                registrform_form.style.top = "20%";
                 registrform_form.style.transform = "rotate(0deg)";
                setTimeout(()=>{
                    R_F_open.style.display="none";
                    registrform_form.classList.toggle("open");
                    forms[1].style.display = "block";
                }, 1700)
                setTimeout(()=>{

                },2000)
                
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


 