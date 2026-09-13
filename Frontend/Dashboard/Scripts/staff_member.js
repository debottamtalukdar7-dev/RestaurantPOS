

function clearTable(table)
{
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

async function searchStaff(param,value)
{
    
    
    const response = await fetch(`http://localhost:3000/api/staff/search?${param}=${value}`,
        {
            method: "GET"
        }
    )
    const staffs = await response.json();
    
    console.log(staffs);
    if(response.ok)
    {
        const table = document.getElementById("list");
        clearTable(table);
        Array.from(staffs).forEach(staff => addToStaffList({ ...staff }))
    }

    else
    {
        alert(staffs["message"])
    }
    
}

async function addToStaffList(staff)
{
    console.log(`${staff.name} ${staff.role} ${staff.salary}`)

    const row = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.classList.add("cell");

    let l1 = document.createElement("label");
    l1.innerHTML = staff.name;
    l1.classList.add("name")

    cell1.appendChild(l1);

    let cell2 = document.createElement("td");
    cell2.classList.add("cell");

    const avatarImg = document.createElement("img");
    let imgName;

    switch (staff.role) {
        case "chef":
            {
                imgName = "baker.png";
                break;
            }

        case "waiter":
            {
                imgName = "waiter.png";
                break;
            }

        case "manager":
            {
                imgName = "manager2.png";
                break;
            }
    }

    avatarImg.setAttribute("src", `../../Images/${imgName}`);

    const role_label = document.createElement("div")
    role_label.classList.add("role");
    role_label.classList.add(`${staff.role}`);
    role_label.innerHTML = staff.role;

    cell2.appendChild(avatarImg);
    cell2.appendChild(role_label);

    let cell3 = document.createElement("td");
    cell3.classList.add("cell");

    const I1 = document.createElement("input");
    const I2 = document.createElement("input");
    I1.classList.add("remove");
    I2.classList.add("edit");
    I1.setAttribute("type", "button");
    I2.setAttribute("type", "button");

    cell3.appendChild(I1);
    cell3.appendChild(I2);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    const tbody = document.getElementById("list_body");


    tbody.appendChild(row);

    I1.addEventListener("click", async () => {
        const current_row = I1.closest("tr");

        if (current_row) {
            current_row.remove();
        }

        const response = await fetch("http://localhost:3000/api/staff/delete",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        id: staff.id
                    }
                )
            }
        );

        const data = await response.json()
        alert(data["message"]);
        // if(response.ok)
        // {

        // }
        // else
        // {
        //     alert("Something goes wrong");
        // }
    })

    I2.addEventListener("click", async () => {

        const nametxt = document.createElement("input");
        nametxt.setAttribute("type","text");
        nametxt.classList.add("nametxt");

        const roletxt = document.createElement("input");
        roletxt.setAttribute("type", "text");
        roletxt.classList.add("roletxt");

        cell1.appendChild(nametxt);
        cell2.appendChild(roletxt);
        l1.setAttribute("visibility","hidden");
        role_label.setAttribute("visibility","hidden")

        nametxt.addEventListener("keydown",async (event)=>
        {
            if(event.key == "Enter")
            {
                const response = await fetch("http://localhost:3000/api/staff/edit",
                    {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json" // important!
                        },
                        body:JSON.stringify(
                            {
                                staff_id:staff.id,
                                parameter:"name",
                                value:nametxt.value
                            }
                        )
                    }
                );

                if (response.ok) {
                    const data = await response.json()
                    alert(data["message"]);
                }
                
                else {
                    alert("Something goes wrong")
                }

                l1.innerText = nametxt.value;
                l1.setAttribute("visibility","visible");
                role_label.setAttribute("visibility","visible");
                nametxt.remove();
            }

            else if(event.key == "Escape")
            {
                nametxt.remove();
            }
        });

        roletxt.addEventListener("keydown", async (event) => {
            if (event.key == "Enter") {

                switch (roletxt.value) {
                    case "chef":
                        {
                            imgName = "baker.png";
                            break;
                        }

                    case "waiter":
                        {
                            imgName = "waiter.png";
                            break;
                        }

                    case "manager":
                        {
                            imgName = "manager2.png";
                            break;
                        }
                }

                

                const response = await fetch("http://localhost:3000/api/staff/edit",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json" // important!
                        },
                        body: JSON.stringify(
                            {
                                staff_id: staff.id,
                                parameter: "role",
                                value: roletxt.value
                            }
                        )
                    }
                );

                if (response.ok) {

                    role_label.classList.replace(staff.role,roletxt.value);
                    console.log(role_label.classList.toString())
                    role_label.innerText = roletxt.value;
                    avatarImg.setAttribute("src", `../../Images/${imgName}`);
                    const data = await response.json();
                    alert(data["message"]);
                }

                else {
                    alert("Something goes wrong")
                }

                
                roletxt.remove();
            }

            else if (event.key == "Escape") {
                roletxt.remove();
            }
        })

        
    })
}

async function showList()
{
    const response = await fetch("http://localhost:3000/api/staff/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok)
    {   
        console.log("Name   Role   Salary");
        
        const data = await response.json();
        const staffs = data.staffs;
        
        staffs.forEach(staff => addToStaffList(staff));
    }
}

export function init() {

    console.log("Loaded!");
    showList();
    const id_input = document.getElementById("id_input");
    const name_input = document.getElementById("name_input");
    const role_input = document.getElementById("role_input");
    const add_btn = document.getElementById("add");
    const search_btn = document.getElementById("searchbtn");
    const search_role = document.getElementById("search-role");
    const search_box = document.getElementById("searchbar");

    search_btn.addEventListener("click", async () => {
        searchStaff(search_role.value, search_box.value);
    });

    search_box.addEventListener("input", async (event) => {
        if (search_box.value == "") {
            const table = document.getElementById("list");
            clearTable(table);

            showList();
        }
    })

    search_box.addEventListener("keydown", async (event) => {
        if (event.key == "Enter") {
            searchStaff(search_role.value, search_box.value);
        }
    })

    add_btn.addEventListener("click", async () => {
        const id = id_input.value;
        const name = name_input.value;
        const role = role_input.value;

        console.log("Staff!");
        const response = await fetch("http://localhost:3000/api/staff/appoint",
            {
                method: "POST",

                headers:
                {
                    "content-type": "application/json"
                },

                body: JSON.stringify(
                    {
                        id: id,
                        name: name,
                        role: role
                    }
                )

            }
        );

        const data = await response.json();

        if (response.ok) {
            
            addToStaffList({
                id: id,
                name: name,
                role: role
            });
        }

        alert(data["message"])

    });


    
}




