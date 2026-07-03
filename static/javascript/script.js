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
                registrform_form.style.transform = "translateY(200%)";
                registrform_form.style.opacity="0";
                loginform_form.style.transform = "rotate(90deg)";
                //   transform: translateX(-50%);
                setTimeout(()=>{
                    
                    L_F_open.style.display = "none";
                    R_F_open.style.display = "none";
                    loginform_form.classList.toggle("active");
                    loginform_form.style.height = "100%";
                }, 1000)
                
        }

            function LF_close(){
                loginform_form.classList.remove("active");
                loginform_form.style.height = "auto";
                L_F_open.style.display = "flex";
                   R_F_open.style.display = "flex";
                setTimeout(() => {
                   registrform_form.style.transform = "translateY(0%)";
                registrform_form.style.opacity="1";
                loginform_form.style.transform = "rotate(0deg)";
                
                }, 1000)
                
                
                    
            }

            function R_rotate(){
                loginform_form.style.transform = "translateY(-250%)";
                loginform_form.style.opacity="0";
                registrform_form.style.transform = "translateY(-50%) rotate(90deg)";
                    
                    setTimeout(()=>{
                        LR_block.classList.toggle("active");
                        formbtns2.style.display = "none";
                        L_F_open.style.display = "none";
                        R_F_open.style.display = "none";
                        registrform_form.classList.toggle("active"); 
                        // registrform_form.style.height = "100%";
                    },1000)
            }

            function RF_close(){
                LR_block.classList.remove("active");
                        formbtns2.style.display = "block";
                        L_F_open.style.display = "flex";
                        R_F_open.style.display = "flex";
                        registrform_form.classList.remove("active"); 
                        setTimeout(()=>{
                            loginform_form.style.transform = "translateY(0%)";
                loginform_form.style.opacity="1";
                registrform_form.style.transform = "rotate(0deg)";
                        })
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


 