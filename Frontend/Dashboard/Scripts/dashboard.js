// import { init,hello } from "./settings.js";
// import {createStaff} from "./staff_member.js"
const dashboardBtn = document.getElementById("dashboard");
const logout = document.getElementById("logout");
const content = document.getElementById("content");
const pages = ["overview.html","orders.html","menu.html","staff.html","tables.html","reports.html","settings.html"]
const scripts = ["overview.js","orders.js","menu.js","staff_member.js","tables.js","reports.js","settings.js"]
const dashboard_buttons = Array.from(document.getElementsByClassName("sbutton"));

dashboard_buttons.unshift(dashboardBtn);
loadPage("overview.html",0)
dashboard_buttons.forEach((button) =>
{
    if(button != null || button != logout)
    {
        button.addEventListener("click",
        async function()
        {
            const n = dashboard_buttons.length;
            
            for(let i = 0; i < n; i++)
            {
                if (dashboard_buttons[i] != button && dashboard_buttons[i].classList.item(0) == "sbutton-selected")
                {
                    dashboard_buttons[i].classList.replace("sbutton-selected","sbutton");
                    break;
                }
            }

            button.classList.replace("sbutton","sbutton-selected");
            const index = dashboard_buttons.indexOf(button);

            await loadPage(pages[index], index);
            
        })
    }
});



logout.addEventListener("click",
    function()
    {
        document.location.href = "../../login_page.html";
    }
)

async function loadPage(page,index) {

    const response = await fetch(`../Pages/${page}`);
    const data = await response.text();
    content.innerHTML = data;
    
    // settings.html → settings.js
    // staff.html    → staff.js
    // orders.html   → orders.js
    if(index != 0)
    {
        const script = await import(`../Scripts/${scripts[index]}`);
        script.init();
    }
    
    // if(index != 0)
    //     {   
    //         const scriptName = scripts[index];
    //         if (!document.querySelector(`script[src="../Scripts/${scriptName}"]`)) {
                
    //             const script = document.createElement("script");
                
    //             script.src = `../Scripts/${scriptName}`;
    //             script.type = "module"
                
    //             document.body.appendChild(script);
    //         }
    //     }
        
        console.log(data);

    // if(page == "settings.html")
    // {
    //     init();
    //     hello();
    // }
}
