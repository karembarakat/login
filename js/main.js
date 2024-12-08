"use strict";
// All Variables
const uName = document.getElementById("name");
const uEmail = document.getElementById("mail");
const uPassword = document.getElementById("pass");
const btn = document.querySelector(".btn");
const login = document.querySelector(".login");
const pathName = window.location.pathname;
const host = window.location.host;
const content = document.querySelector(".content");
const logout = document.querySelector(".logout");
const errorMsg = document.querySelector(".errormsg");
const allUsers = [];
//Save Var
if (pathName === "/login/") { // Register Paeg

    function sendInfo() {
        // Regex for validating English letters (a-z, A-Z)
        const nameRegex = /^[A-Za-z]+$/;
        // Password must be at least 8 characters long
        const passwordRegex = /^.{8,}$/;
        // Regex for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



        // Check if fields are empty
        function isEmpty() {
            if (uName.value === "" || uEmail.value === "" || uPassword.value === "") {
                return false
            } else {
                return true
            }
        }
        if (isEmpty() == false) {
            errorMsg.textContent = "All inputs is required";
            return false;
        }


        if (!nameRegex.test(uName.value)) {
            // alert("Username must contain only English letters.");
            errorMsg.textContent = "Username must contain only English letters."
            return;
        }
        if (!emailRegex.test(uEmail.value)) {
            errorMsg.textContent = "Please enter a valid email address."
            return;
        }
        if (!passwordRegex.test(uPassword.value)) {
            errorMsg.textContent = "Password must be at least 8 characters long."
            return;
        }


        let allusers = JSON.parse(localStorage.getItem("allusers")) || [];
        let newUserId = allusers.length > 0 ? allusers[allusers.length - 1].id + 1 : 1;
        let newUser = {
            id: newUserId,
            name: uName.value,
            email: uEmail.value,
            password: uPassword.value
        }

        // check if email already exists
        if (allusers.some(user => user.email === newUser.email)) {
            errorMsg.textContent = "Email already exists. Please choose another one.";
            return;
        } else {

        }
        allUsers.push(newUser);
        localStorage.setItem("allusers", JSON.stringify(allUsers));


        window.location.href = "/login/login.html"
        console.log(newUser);
    }
    // Event Listener
    btn.addEventListener("click", function () {
        sendInfo();
    });
} else if (pathName === "/login/login.html") { // Login Page
    // Compare info with localStorage
    function compareInfo() {

        // Check if fields are empty
        function isEmpty() {
            if (uEmail.value === "" || uPassword.value === "") {
                return false
            } else {
                return true
            }
        }
        if (isEmpty() == false) {
            errorMsg.textContent = "All inputs is required";
            return false;
        }


        const passwordRegex = /^.{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(uEmail.value)) {
            errorMsg.textContent = "Please enter a valid email address."
            return;
        }
        if (!passwordRegex.test(uPassword.value)) {
            errorMsg.textContent = "Password must be at least 8 characters long."
            return;
        }


        let storedUser = JSON.parse(localStorage.getItem("allusers"));
        let user = storedUser.find(user => user.email === uEmail.value && user.password === uPassword.value);
        if (user) {
            // alert(`Welcome ${user.name}! ${user.id}`);
            localStorage.setItem('userID', JSON.stringify(user.id));
            // window.location.replace('/home.html');
            window.location.replace = "/login/home.html";
        } else {
            errorMsg.textContent = "Invalid Email or Password."
            
        }
        let loggedUser = JSON.parse(localStorage.getItem('userID'));
        if (loggedUser) {
            console.log(loggedUser);
        }
    }

    login.addEventListener("click", compareInfo);


} else if (pathName === '/login/home.html') { // It's home
    // Get data from localStorage
    let userID = JSON.parse(localStorage.getItem("userID"));
    if (!userID) {
        console.log("No user is currently logged in.");
        // window.location.replace('/index.html');
        window.location.replace("/login/");
    } else {
        let allusers = JSON.parse(localStorage.getItem("allusers")) || [];
        if (!Array.isArray(allusers)) {
            allusers = [];
        }
        let loggedUser = allusers.find(user => user.id === userID);

        content.innerHTML = `<h2>Hello ${loggedUser.name}!</h2>`;

    }

    logout.addEventListener("click", function () {
        localStorage.removeItem("userID");
        // window.location.replace('/index.html');
        // window.location.href = "/";
    })
}