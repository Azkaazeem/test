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
            location.href = "login.html";
        });

        }



       } catch (err) {
           console.log(err) 
        }
    }

    logoutBtn && logoutBtn.addEventListener("click",logout)               




























// DASHBOARD FUNCTIONALITY
const questionForm = document.getElementById('question-form');
const questionTypeSelect = document.getElementById('question-type');
const optionsSection = document.getElementById('options-section');
const optionsList = document.getElementById('options-list');
const addOptionBtn = document.getElementById('add-opt-btn');


// ---------------------------
// 1. Timer Start Only on User Activity
// ---------------------------
let time = 600;
let timerStarted = false;

function startTimer() {
    if (timerStarted) return;
    timerStarted = true;

    const countdown = setInterval(() => {
        let m = Math.floor(time / 60);
        let s = time % 60;
        s = s < 10 ? "0" + s : s;

        document.getElementById("timer-display").innerText = `Time Left: ${m}:${s}`;

        if (time === 0) {
            clearInterval(countdown);
            window.location.href = "signup.html";
        }

        time--;
    }, 1000);
}

document.addEventListener("click", startTimer);
document.addEventListener("scroll", startTimer);


// ---------------------------
// Option Functionality
// ---------------------------
questionTypeSelect.addEventListener('change', (e) => {
    const type = e.target.value;

    if (type === 'Data') {
        optionsList.innerHTML = "";  
        optionsSection.style.display = 'none';
    } 
    else {
        optionsSection.style.display = 'block';

        if (optionsList.children.length === 0) {
            addNewOption("Option 1");
        }
    }
});

function addNewOption(placeholderText) {
    const newRow = document.createElement('div');
    newRow.className = 'input-group mb-2 option-row';

    newRow.innerHTML = `
        <div class="input-group-text">
            <input class="form-check-input mt-0 correct-answer-radio" type="radio" name="correct_answer">
        </div>
        <input type="text" class="form-control option-input" placeholder="${placeholderText}">
        <button type="button" class="btn btn-outline-danger remove-option-btn">Delete</button>
    `;

    optionsList.appendChild(newRow);
}

addOptionBtn.addEventListener('click', () => addNewOption("New Option"));


// ---------------------------
// Delete Option
// ---------------------------
optionsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-option-btn')) {
        const row = e.target.closest('.option-row');

        if (optionsList.children.length > 1) {
            row.remove();
        } else {
            showToast("At least one option is required!", "red");
        }
    }
});


// ---------------------------
// 2. Select Correct Answer → Highlight Green
// ---------------------------
optionsList.addEventListener("change", (e) => {
    if (e.target.classList.contains("correct-answer-radio")) {
        document.querySelectorAll(".option-input").forEach(inp => {
            inp.style.background = "white";
        });

        const row = e.target.closest(".option-row");
        const input = row.querySelector(".option-input");
        input.style.background = "#d4ffd4";
    }
});


// ---------------------------
// Form Submit
// ---------------------------
questionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const questionText = document.getElementById('en-question').value;
    const type = questionTypeSelect.value;
    const isRequired = document.querySelector('input[name="is_required"]').checked;

    const failResponseValue = document.querySelector('input[name="fail_response"]:checked').value;
    const failResponseBool = (failResponseValue === "Yes");

    let optionsArray = [];
    let correctAnswerText = null;

    if (type !== 'Data') {
        const optionRows = document.querySelectorAll('.option-row');

        let emptyFound = false;

        optionRows.forEach(row => {
            const textInput = row.querySelector('.option-input');
            const radioInput = row.querySelector('input[type="radio"]');

            if (textInput.value.trim() === "") {
                textInput.style.border = "2px solid red";
                emptyFound = true;
            } else {
                textInput.style.border = "1px solid #ced4da";
            }

            if (textInput.value.trim() !== "") {
                optionsArray.push(textInput.value.trim());
                if (radioInput.checked) correctAnswerText = textInput.value.trim();
            }
        });

        if (emptyFound) {
            showToast("Please fill all option fields!", "red");
            return;
        }

        if (!correctAnswerText) {
            showToast("Please select the Correct Answer!", "red");
            return;
        }
    }

    // ---------------------------
    // SAVE TO SUPABASE
    // ---------------------------
    try {
        const { data, error } = await supaBase
            .from('Questions')
            .insert({
                ques_en: questionText,
                type: type,
                options_json: optionsArray,
                correct_answer_value: correctAnswerText,
                fail_response_is_yes: failResponseBool,
                is_required: isRequired
            });

        if (error) throw error;

        showToast("Question Saved Successfully!", "green");

        questionForm.reset();
        optionsList.innerHTML = "";
        addNewOption("Option 1");

        if (type === 'Data') {
            optionsSection.style.display = 'none';
        }

    } catch (err) {
        console.error("Supabase Error:", err);
        showToast("Error saving: " + err.message, "red");
    }
});


// ---------------------------
// 5. Custom Toast Function
// ---------------------------
function showToast(msg, color) {
    let box = document.createElement("div");
    box.innerText = msg;

    box.style.position = "fixed";
    box.style.bottom = "20px";
    box.style.right = "20px";
    box.style.padding = "12px 18px";
    box.style.background = color;
    box.style.color = "white";
    box.style.borderRadius = "6px";
    box.style.zIndex = "99999";
    box.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    box.style.fontSize = "15px";

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 2000);
}
