import supaBase from "./config.js";

const passwordInput = document.getElementById("password");
const toggleIcon = document.querySelector(".toggle-password");

if (passwordInput && toggleIcon) {
    toggleIcon.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        if (type === "text") {
            toggleIcon.classList.remove("fa-eye-slash");
            toggleIcon.classList.add("fa-eye");
        } else {
            toggleIcon.classList.remove("fa-eye");
            toggleIcon.classList.add("fa-eye-slash");
        }
    });
}

//  SIGN UP FUNCTIONALITY

let sUName = document.getElementById("name");
let sEmail = document.getElementById("email");
let sPass = document.getElementById("password");
let sPhn = document.getElementById("ph-no.");
let sBtn = document.querySelector(".btn-signup");

async function signUp(e) {
  e.preventDefault();

  if (!sUName.value.trim() ||
    !sEmail.value.trim() ||
    !sPass.value.trim() ||
    !sPhn.value.trim()) {
    Swal.fire({
      title: "All fields required!",
      text: "Please fill all fields before signup.",
      icon: "warning",
      background: "#f9fbfc",
      color: "#003b46",
      confirmButtonColor: "#003b46",
      confirmButtonText: "OK",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    })

    return
  };


  if (sPhn.value.length !== 11) {
    Swal.fire({
      title: "Incorrect Phone Number!",
      text: "Phone number must be exactly 11 digits.",
      icon: "warning",
      background: "#f9fbfc",
      color: "#003b46",
      confirmButtonColor: "#003b46",
      confirmButtonText: "Try Again",
      customClass: {
        popup: "glass-alert"
      }

    }).then(() => {
      sPhn.value = "";
    })
    return;
  }


  try {



    const { data, error } = await supaBase.auth.signUp(
      {
        email: sEmail.value,
        password: sPass.value,
        options: {
          data: {
            user_name: sUName.value,
            phone_no: sPhn.value,
          }
        }
      }
    )

    if (error) {
      console.log(error);
      Swal.fire({
        title: "Signup Failed!",
        text: error.message,
        icon: "error",
        draggable: true,
        background: "#f9fbfc",
        color: "#003b46",
        confirmButtonColor: "#003b46",
        confirmButtonText: "OK",
        padding: "20px",
        borderRadius: "15px",
        customClass: {
          popup: "glass-alert"
        }
      }).then(() => {
        sUName.value = "";
        sEmail.value = "";
        sPass.value = "";
        sPhn.value = "";
      
      })
      return;
    }

    const { error: dbError } = await supaBase
      .from('Profiles')
      .insert({
        username: sUName.value,
        email: sEmail.value,
        phone: sPhn.value
      });

    if (dbError) {
      console.log("Database Error:", dbError);
      Swal.fire({
        title: "Database Error!",
        text: dbError.message,
        icon: "error",
         color: "#003b46",
        confirmButtonColor: "#003b46",
        confirmButtonText: "OK",
        padding: "20px",
        borderRadius: "15px",
      });

    } else {
      Swal.fire({
        title: "Signup successfully!",
        text: "Welcome to Covid 19 Survey",
        icon: "success",
        draggable: true,
        background: "#f9fbfc",
        color: "#003b46",
        confirmButtonColor: "#003b46",
        confirmButtonText: "Go to Home",
        padding: "20px",
        borderRadius: "15px",
        customClass: {
          popup: "glass-alert"
        }

      })
        .then(() => {
          location.href = "home.html"
        })


    }
  } catch (err) {
    console.log(err)
    Swal.fire({
      title: "System error!",
      html: `Something went wrong internally! <br></br> <b>${err.message || "Unknown error"}</b>`,
      icon: "error",
      background: "#f9fbfc",
      color: "#003b46",
      confirmButtonColor: "#003b46",
      confirmButtonText: "Report issue",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    }).then(() => {
        sUName.value = "";
        sEmail.value = "";
        sPass.value = "";
        sPhn.value = "";
      
      })
  }
}

sBtn && sBtn.addEventListener("click", signUp);




























// LOGIN PAGE FUNCNALITY

let lEmail = document.getElementById("email");
let lPass = document.getElementById("password");
let lBtn = document.querySelector(".btn-primary");






async function login(e) {
    e.preventDefault();

    let email = lEmail.value.trim();
    let pass = lPass.value.trim();

    if (!email) {
        Swal.fire({
            title: "Please enter your email address.",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        });
        return;
    }

    if (!email.includes("@") || !email.includes("gmail.com")) {
        Swal.fire({
            title: "Please enter a valid Gmail address.",
            text: "Example: yourname@gmail.com",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            lEmail.value = "";
            lPass.value = "";
        })
        return;
    }

    if (!pass) {
        Swal.fire({
            title: "Password field is empty.",
            text: "Please enter your password.",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        });
        return;
    }

    if (pass.length < 6) {
        Swal.fire({
            title: "Invalid password!",
            text: "Password must be at least 6 characters long.",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            lPass.value = "";
        })
        return;
    }

    if (email === "admin@gmail.com" && pass === "admin12345") {

        Swal.fire({
            title: "Admin logged in Successfully!",
            icon: "success",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "Go to Admin portal..",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            location.href = "dashbord.html";
        });



        return;

    }

    try {

        const { data, error } = await supaBase.auth.signInWithPassword({
            email: email,
            password: pass
        });


        if (error) {
            console.log("Supabase Error: ", error);


            if (error.message.includes("Invalid login credentials")) {
                Swal.fire({
                    title: "Login failed!",
                    text: "Incorrect Email or Password. Please try again.",
                    icon: "error",
                    background: "#f9fbfc",
                    color: "#003b46",
                    confirmButtonColor: "#003b46",
                    confirmButtonText: "Try Again!",
                    padding: "20px",
                    customClass: {
                        popup: "glass-alert"
                    }
                }).then(() => {
                    lEmail.value = "";
                    lPass.value = "";
                })
            }
            else {

                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    background: "#f9fbfc",
                    color: "#003b46",
                    confirmButtonColor: "#003b46",
                    confirmButtonText: "Try Again!",
                    padding: "20px",
                    customClass: {
                        popup: "glass-alert"
                    }
                }).then(() => {
                    lEmail.value = "";
                    lPass.value = "";
                })


            }
            return;
        }

        Swal.fire({
            title: "Successfully logged in!",
            icon: "success",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "Go to Home",
            padding: "20px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            location.href = "home.html";
        });



    } catch (err) {
        console.log(err);
        Swal.fire({
            title: "System error!",
            html: `Something went wrong internally!<br></br> <b> ${(err.message) || "Unknown error"}</b>`,
            icon: "error",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "Report issue",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then ( () => {
            lEmail.value = "";
            lPass.value = "";
        })
    }
}


lBtn && lBtn.addEventListener("click", login);




























// LOGOUT FUNCTIONALITY


 let logoutBtn = document.getElementById("logout-btn")

     console.log(logoutBtn);
       async function logout(){
       
        try {
            const { error } = await supaBase.auth.signOut()


        if (!error) {
            Swal.fire({
            title: "Successfully logged out!",
            icon: "success",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "Go to Login page",
            padding: "20px",
           
        }).then(() => {
            location.href = "/Authentication/login.html";
        });

        }



       } catch (err) {
           console.log(err) 
        }
    }

    logoutBtn && logoutBtn.addEventListener("click",logout)               




























// DASHBOARD FUNCTIONALITY

// --- 1. DOM ELEMENTS ---
const questionForm = document.getElementById('question-form');
const questionTypeSelect = document.getElementById('question-type');
const optionsSection = document.getElementById('options-section');
const optionsList = document.getElementById('options-list');
const addOptionBtn = document.getElementById('add-opt-btn');

// --- 2. QUESTION TYPE CHANGE ---
questionTypeSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    if (type === 'Data') {
        optionsSection.style.display = 'none';
    } else {
        optionsSection.style.display = 'block';
    }
});

// --- 3. ADD OPTION FUNCTION ---
addOptionBtn.addEventListener('click', () => {
    const newRow = document.createElement('div');
    newRow.className = 'input-group mb-2 option-row';
    
    // CHANGE: Neche input se 'required' hata diya hai
    newRow.innerHTML = `
        <div class="input-group-text">
            <input class="form-check-input mt-0 correct-answer-radio" type="radio" name="correct_answer">
        </div>
        <input type="text" class="form-control" placeholder="New Option"> <button type="button" class="btn btn-outline-danger remove-option-btn">Delete</button>
    `;
    optionsList.appendChild(newRow);
});

// ... (Beech ka code same rahega) ...

// --- Form Reset Logic (Submit k end mein) ---
// Yahan bhi 'required' hata den
optionsList.innerHTML = `
        <div class="input-group mb-2 option-row">
        <div class="input-group-text">
            <input class="form-check-input mt-0 correct-answer-radio" type="radio" name="correct_answer">
        </div>
        <input type="text" class="form-control" placeholder="Option 1"> <button type="button" class="btn btn-outline-danger remove-option-btn">Delete</button>
    </div>
`;

// --- 4. REMOVE OPTION ---
optionsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-option-btn')) {
        const row = e.target.closest('.option-row');
        if (optionsList.children.length > 1) {
            row.remove();
        } else {
            alert("At least one option is required!");
        }
    }
});

// --- 5. FORM SUBMISSION (ERROR FIXED HERE) ---
questionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // --- A. DATA COLLECTION ---
    const questionText = document.getElementById('en-question').value;
    const type = questionTypeSelect.value;
    const isRequired = document.querySelector('input[name="is_required"]').checked;
    
    // Fail Response Logic
    const failResponseValue = document.querySelector('input[name="fail_response"]:checked').value;
    const failResponseBool = (failResponseValue === "Yes");

    let optionsArray = [];
    let correctAnswerText = null;

    // --- B. OPTIONS HANDLING ---
    if (type !== 'Data') {
        const optionRows = document.querySelectorAll('.option-row');

        optionRows.forEach(row => {
            // FIX: '.option-text' ki jagah hum 'input[type="text"]' use kar rahy hain
            // Ta ke wo apki HTML wali input ko bhi pakar le
            const textInput = row.querySelector('input[type="text"]'); 
            const radioInput = row.querySelector('input[type="radio"]');

            if (textInput && textInput.value.trim() !== "") {
                const val = textInput.value.trim();
                optionsArray.push(val); 
                
                if (radioInput.checked) {
                    correctAnswerText = val;
                }
            }
        });

        // Validation
        if (optionsArray.length === 0) {
            alert("Please add at least one option!");
            return;
        }
        if (!correctAnswerText) {
            alert("Please select the Correct Answer (Radio button)!");
            return;
        }
    }

    // --- C. SEND TO SUPABASE ---
    try {
        const { data, error } = await supaBase
            .from('Questions') // Make sure Table Name sahi ho (Capital Q)
            .insert({
                ques_en: questionText,
                type: type,
                options_json: optionsArray,
                correct_answer_value: correctAnswerText,
                fail_response_is_yes: failResponseBool,
                is_required: isRequired
            });

        if (error) throw error;

        // --- D. SUCCESS ---
        alert("Question Saved Successfully!");
        questionForm.reset();
        
        // Reset Options UI
        optionsList.innerHTML = `
             <div class="input-group mb-2 option-row">
                <div class="input-group-text">
                    <input class="form-check-input mt-0 correct-answer-radio" type="radio" name="correct_answer">
                </div>
                <input type="text" class="form-control" placeholder="Option 1" required>
                <button type="button" class="btn btn-outline-danger remove-option-btn">Delete</button>
            </div>
        `;
        
        if (type === 'Data') {
            optionsSection.style.display = 'block'; 
        }

    } catch (err) {
        console.error("Supabase Error:", err);
        alert("Error saving: " + err.message);
    }
});