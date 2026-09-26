

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
                        registrform_form.style.transform = "rotate(90deg) translateY(220px) translateX(-180px)";
                        registrform_form.style.width = "min(140vw,450px)";
                    registrform_form.style.height = "min(90vw,350px)";
                    registrform_form.style.overflow="hidden";
                    R_F_open.style.display = "none";
                    forms[1].style.transform = "translateY(-35px) rotate(-90deg)";
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
                    registrform_form.style.removeProperty("overflow");
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

      
            const Lemail = document.getElementById("Lemail");
            const Lpassword = document.getElementById("Lpassword");
            const login_check = document.getElementById("login_check");
            


        forms[0].addEventListener(
        "submit", function(e){
            e.preventDefault();

            let valid = true;
        //E-mail error block
           if(Lemail.value.trim() === ""){
            hideError1(Lemail);
            showError(Lemail);
           }
           if(!Lemail.value.includes('@gmail') || !Lemail.value.includes('.')){
            login_check.innerText = "";
                hideError(Lemail);
                showError1(Lemail);
                valid = false;
            }
            else{
                hideError1(Lemail);
                hideError(Lemail);
            }
            
         //password error block
            if(Lpassword.value.trim() === ""){
                login_check.innerText = "";
                showError(Lpassword);
                valid = false;
            }
            else{
                hideError(Lpassword);
            }
            fetch("/check_login",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Lpassword: Lpassword.value,
                    Lemail: Lemail.value
                })
            })
            .then(loginCheck => loginCheck.json())
            .then(data => {
                if(data.success){
                    login_check.innerText = "";
                    hideError(Lemail);
                    hideError(Lpassword);
                    if(valid){
                        window.location.href = "/";
                        }
                        else{
                            login_check.innerText = "invalid login details";
                            showError1(Lemail);
                            showError1(Lpassword);
                        }
                }
                else{
                    if(Lpassword.value.trim() === ""){
                    login_check.innerText = "";
                      valid = false;
                      }
                      else{
                        setTimeout(() => {
                        login_check.innerText = "invalid login details";
                        }, 500);
                        }
                }
            });

            
       
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

            const username = document.getElementById("user-name");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const Cpassword = document.getElementById("conform-password");
            const email_status = document.getElementById("email-status");

            let E_Available = true;
            
            // email.addEventListener("blur", function(){
            //     fetch("/check-LR",{
            //         method: "POST",
            //         headers:{
            //             "Content-Type": "application/json"
            //         },body:JSON.stringify({
            //             email: email.value
            //         })
            //     })
            //     .then(Response => Response.json())
            //     .then(data =>{
            //         document.getElementById("email-status").innerText 
            //         t = data.massage;
            //     });
            // });


email.addEventListener("blur", function () {

                    if(email.value.trim()===""){
                        email_status.innerText = "";
                        hideError(email);
                        setTimeout(()=>{
                        showError1(email);
                        },200);
                    }
                    else if(!email.value.includes('@gmail') || !email.value.includes('.')){
                        email_status.innerText = "";
                        hideError1(email);
                       showError(email);
                    //    valid = false; 
                    }
                    
                    else{
                        fetch("/check-LR", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                email: email.value
                            })
                                })

                                .then(response => response.json())

                                .then(data => {

                                    email_status.innerText = data.message;

                                     if (data.message === "Email Available"){
                            email_status.style.color = "#18b050";
                                E_Available = true;
                                hideError(email);
                        }
                        else{
                            email_status.style.color = "red";
                            E_Available = false;
                            hideError1(email);
                            
                            }
                                });
                           
                    }

    

});

password.addEventListener("blur", function(){
    // if(password.value.trim() === ""){
    //            showError(password);
    //            valid = false;
    //         }
    const pwdvalue = password.value;
        let letter ="";
        let capltr ="";
        let number ="";
        let chare ="";

    for(let i=0; i < pwdvalue.length; i++ ){
        let pwd = pwdvalue[i];
        if(pwd >= 'A' && pwd <= 'Z'){
            capltr += pwd;
        }
        else if(pwd >= 'a' && pwd <= 'z'){
            letter += pwd;
        }
        else if(pwd >= '0' && pwd <= '9' ){
            number += pwd;
        }
        else{
            chare += pwd;
        }
    }

    if(password.value.trim()===""){
            showError(password);
            hideError1(password);
               valid = false;
        }
    else if(pwdvalue.length >= 8 && pwdvalue.length <= 15 
    && capltr.length >= 1 && number.length >= 3 
    && chare.length >= 1
    ){
        hideError1(password);
    }
    else{
        hideError(password);
        showError1(password);
    }
});



       forms[1].addEventListener(
        "submit", function(e){
            e.preventDefault();
            

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
            if(email.value.trim()===""){
                hideError(email);
                showError1(email);
            }
            else if(!email.value.includes('@gmail') || !email.value.includes('.')){
                hideError1(email);
                showError(email);
                valid = false;
            }
            else{
                hideError(email);
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
                hideError(password);
                hideError(Cpassword);
                hideError1(Cpassword);
            }

            if(!E_Available){
                    valid = false;
                }
            const emptyusername = "";
            const emptyemail = "";
            const emptypassword = "";

            if(valid){
                fetch("/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        username: username.value,
                        email: email.value,
                        password:password.value,

                        // username: emptyusername,
                        // email: emptyemail,
                        // password:emptypassword,
                    })
                })
                .then(response => response.json())
                .then(data=>{
                    if(data.ok){
                         window.location.href = "/";
                         console.log("hello");
                    }
                    else{
                        window.location.reload();
                        alert("Something is ⚠️wrong. Please check once.");
                    }
                }) 
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

