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

/* ============================
   Local Storage Helper Functions 
   ============================ */
function getQuestions() {
  return JSON.parse(localStorage.getItem("surveyQuestions")) || [];
}

function saveQuestions(data) {
  localStorage.setItem("surveyQuestions", JSON.stringify(data));
}

/* ============================
   Add Question Functionality
   ============================ */
const addForm = document.getElementById('addForm');

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('qTitle').value;
    const type = document.getElementById('qType').value;
    const optA = document.getElementById('optA').value;
    const optB = document.getElementById('optB').value;
    const optC = document.getElementById('optC').value;
    const optD = document.getElementById('optD').value;
    const failMsg = document.getElementById('failMsg').value;

    // Insert into Supabase
    const { data, error } = await supaBase
        .from('SurveyQuestions')
        .insert([
            {
                title: title,
                type: type,
                option_a: optA,
                option_b: optB,
                option_c: optC,
                option_d: optD,
                fail_message: failMsg
            }
        ]);

    if (error) {
        console.log(error);
        Swal.fire('Error!', error.message, 'error');
    } else {
        Swal.fire('Success!', 'Question added!', 'success');
        addForm.reset(); // form clear
    }
});


/* ============================
   Display Questions in Table
   ============================ */
function displayQuestions() {
  let table = document.getElementById("questionsTable");
  let questions = getQuestions();

  table.innerHTML = "";

  questions.forEach((q, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${q.title}</td>
        <td>${q.type.toUpperCase()}</td>
        <td>${q.type === "mcq" ? q.options.a : "-"}</td>
        <td>${q.failMsg || "-"}</td>
        <td>
          <button onclick="deleteQuestion(${q.id})" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    `;
  });
}

displayQuestions();

/* ============================
   Delete Question
   ============================ */
function deleteQuestion(id) {
  let all = getQuestions();
  let updated = all.filter(q => q.id !== id);

  saveQuestions(updated);
  displayQuestions();
}

















  // Get questions from localStorage
  const questions = JSON.parse(localStorage.getItem('surveyQuestions')) || [];
  const form = document.getElementById('surveyForm');

  // Display questions dynamically
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('question');

    let html = `<p>${index+1}. ${q.title}</p>`;

    if(q.type.toLowerCase() === 'multiple choice') {
      html += `
        <div class="form-check"><input type="checkbox" class="form-check-input" id="q${index}a"><label class="form-check-label">${q.options.a}</label></div>
        <div class="form-check"><input type="checkbox" class="form-check-input" id="q${index}b"><label class="form-check-label">${q.options.b}</label></div>
        <div class="form-check"><input type="checkbox" class="form-check-input" id="q${index}c"><label class="form-check-label">${q.options.c}</label></div>
        <div class="form-check"><input type="checkbox" class="form-check-input" id="q${index}d"><label class="form-check-label">${q.options.d}</label></div>
      `;
    } else if(q.type.toLowerCase() === 'true / false') {
      html += `
        <div class="form-check"><input type="radio" class="form-check-input" name="q${index}" value="True"><label class="form-check-label">True</label></div>
        <div class="form-check"><input type="radio" class="form-check-input" name="q${index}" value="False"><label class="form-check-label">False</label></div>
      `;
    } else if(q.type.toLowerCase() === 'data (no correct answer)') {
      html += `<input type="text" class="form-control" placeholder="Enter your answer">`;
    }

    html += `<textarea class="form-control mt-2" placeholder="Comment (optional)"></textarea>`;
    div.innerHTML = html;
    form.appendChild(div);
  });

  // Submit survey
  document.getElementById('submitBtn').addEventListener('click', () => {
    alert('Survey submitted successfully!');
    // Here you can also save user responses to localStorage or Supabase
  });