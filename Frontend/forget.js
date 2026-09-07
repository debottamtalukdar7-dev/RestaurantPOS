const confirmbtn = document.getElementById("confirmBtn");
const answerInput = document.getElementById("question");
const newpasswordInput = document.getElementById("newpass")
const confirmpasswordInput = document.getElementById("confirmpass")
const usernameInput = document.getElementById("username")
const question_label = document.getElementById("l4")

confirmbtn.addEventListener("click", async () =>
{
    const answer = answerInput.value;
    const newpassword = newpasswordInput.value;
    const confirmpassword = confirmpasswordInput.value;
    const username = usernameInput.value;

    const response = await fetch("http://localhost:3000/api/auth/forget", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            answer,
            newpassword,
            confirmpassword
        })
    });

    const data = await response.json();

    console.log(data);

    if(response.ok){
        localStorage.setItem("token", data.token);
        alert("Update Successful");
        window.location.href = "login_page.html";
    }else{
        alert(data.message);
    }

});
