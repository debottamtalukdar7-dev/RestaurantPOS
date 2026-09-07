
const name_textbox =
    document.querySelector("#form2 .name_input");

const password_textbox =
    document.querySelector("#form2 .password_input");

const question_textbox =
    document.querySelector("#form2 .question_input");

const answer_textbox =
    document.querySelector("#form2 .answer_input");

const changesBtn = document.querySelector("#form2 .save");    

name_textbox.value = localStorage.getItem("username");
password_textbox.value = localStorage.getItem("password");

changesBtn.addEventListener("click", async (event) =>
{
    const response = await fetch("http://localhost:3000/api/auth/update",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body:JSON.stringify(
            {
                username: name_textbox.value,
                password: password_textbox.value,
                question: question_textbox.value,
                answer: answer_textbox.value
            })
        }
    )

    if(response.ok)
    {
        const data = await response.json();

        alert(data["message"])
    }

    else
    {
        const data = await response.json();

        console.error(data["message"])
    }
    
    
});
