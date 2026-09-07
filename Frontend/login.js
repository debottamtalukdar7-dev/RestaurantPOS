const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const forgetlabel = document.getElementById("l3");

loginBtn.addEventListener("click", async () => {

    const username = usernameInput.value;
    const password = passwordInput.value;

    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    console.log(data);

    if(response.ok){
        localStorage.setItem("token", data.token);
        window.location.href = "./Dashboard/dashboard.html";
        
    }

    alert(data["message"])
    
});

forgetlabel.addEventListener("click", async () => {
    
    window.location.href = "forget.html";

})