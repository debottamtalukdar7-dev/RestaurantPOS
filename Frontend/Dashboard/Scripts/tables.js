import qrcode from "qrcode"

async function showTables()
{
    const response = await fetch("http://localhost:3000/api/table/list",
        {
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        }
    )

    if(response.ok)
    {
        const data = await response.json();
        const tables = data.tables;

        // console.log(data);
        tables.forEach(table => {
            createTable(table.tablenumber,table.seats,table.status);
            createQR(table.tablenumber,table.seats,table.status);    
        });
    }
}

async function createQR(tablenumber,seats,status)
{
    const bookingURL = `http://localhost:3000/api/table/book/${tablenumber}`;
    const QRLink = await qrcode.toDataURL(bookingURL);
    
    const QRList = document.getElementById("qrContainer");

    const qr = document.createElement("div");
    qr.classList.add("qr-code");
    qr.setAttribute("tablenumber",tablenumber);

    if(status == "occupied")
    {
        qr.style.borderColor = "red";
    }

    const image = document.createElement("img");
    image.src = QRLink;

    image.style.position = "absolute";
    image.style.left="2%"
    image.style.width = "15%";
    image.style.height = "auto";

    const l1 = document.createElement("label");
    const l2 = document.createElement("label");

    l1.innerText = `Table ${tablenumber}`;
    l2.innerText = `${seats} Seats`;
    l1.classList.add("tableidx");
    l2.classList.add("seats");

    const downloadBtn = document.createElement("input");
    downloadBtn.type = "button";
    downloadBtn.value = "Download";
    downloadBtn.classList.add("download");

    const link = document.createElement("a");
    link.href = bookingURL;
    link.innerText = "Click here to book the table!";
    link.classList.add("link");

    qr.appendChild(image);
    qr.appendChild(l1);
    qr.appendChild(l2);
    qr.appendChild(downloadBtn);
    qr.appendChild(link);

    QRList.appendChild(qr);
}

let id = null;
let editBTN = null;

async function createTable(tablenumber,seats,status)
{
    const tableList = document.getElementById("tableList");
    const table = document.createElement("div");
    table.classList.add("table");
    const tableLogo = document.createElement("img");

    const table_number = document.createElement("label");
    table_number.classList.add("tablenumber");
    table_number.innerText = `Table${tablenumber}`;

    const totalseats = document.createElement("label");
    totalseats.classList.add("totalseats");
    totalseats.innerText = `${seats} seats`;
    const status_box = document.createElement("div");

    if (status == "available") {
        tableLogo.setAttribute("src", `../../Images/dining-table-available.png`);
        status_box.innerText = "Available";

        if (status_box.classList.contains("occupied")) {
            status_box.classList.remove(["occupied"]);
        }
    }

    else {
        tableLogo.setAttribute("src", `../../Images/dining-table.png`);
        status_box.innerText = "Occupied";
        table.style.borderColor = "red";

        if (status_box.classList.contains("occupied") == false) {
            status_box.classList.add(["occupied"]);
        }

    }

    const edit = document.createElement("input");
    edit.setAttribute("type", "button");
    const remove = document.createElement("input");
    remove.setAttribute("type", "button");
    edit.classList.add("edit");
    remove.classList.add("delete");
    remove.setAttribute("table_number", tablenumber);
    edit.setAttribute("table_number",tablenumber);

    remove.addEventListener("click", async (e) => {

        console.log("Deleting......");
        const response = await fetch(`http://localhost:3000/api/table/delete/${tablenumber}`,
            {
                method: "DELETE"
                
            }
        )

        const reply = await response.json();

        if (response.status != 200) {
            alert(reply["message"]);
            return;
        }

        const removedTable = e.target.closest(".table");
        const removedqr = document.querySelector(`.qr-code[tablenumber="${tablenumber}"]`);
        removedTable.remove();
        removedqr.remove();
    });

    edit.addEventListener("click",(e)=>
    {
        e.target.style.backgroundColor = "blue";
        e.target.style.backgroundImage = 'url("../../Images/edit_light.png")'

        const tableNumbertextbox = document.getElementById("tableNumbertxt");
        const seatTextbox = document.getElementById("seatstxt");
        const statusbox = document.getElementById("status");

        tableNumbertextbox.value = tablenumber;
        id = tablenumber;
        editBTN = e.target;
        seatTextbox.value = seats;
        statusbox.value = status;
    })

    table.appendChild(tableLogo);
    table.appendChild(table_number);
    table.appendChild(totalseats);
    table.appendChild(status_box);
    table.appendChild(edit);
    table.appendChild(remove);

    tableList.appendChild(table);
}

export function init() {
    
    showTables();
    const saveBtn = document.getElementById("save");
    const editBtn = document.getElementById("edit");
    const tableNumbertextbox = document.getElementById("tableNumbertxt");
    const seatTextbox = document.getElementById("seatstxt");
    const statusbox = document.getElementById("status");
    
    
    saveBtn.addEventListener("click",async ()=>{

        const tablenumber = tableNumbertextbox.value;
        const seats = seatTextbox.value;
        const status = statusbox.value;

        const response = await fetch("http://localhost:3000/api/table/add",
            {
                method: "POST",
                headers:
                {
                    "content-type": "application/json",

                },
                body: JSON.stringify({ tablenumber, seats, status })
            }
        );

        if (response.ok) {
            
            if(response.status != 409)
            {
                createTable(tablenumber, seats, status);
                createQR(tablenumber, seats);
            }
            
            // alert(`Table${tablenumber} is added successfully`);
        }
        
        const reply = await response.json();
        // alert(reply["message"]);
    });

    editBtn.addEventListener("click",async ()=>{

        const tablenumber = tableNumbertextbox.value;
        const seats = seatTextbox.value;
        const status = statusbox.value;
        
        if(editBTN != undefined)
        {
            console.log(id);
            editBTN.style.backgroundColor = '';
            editBTN.style.backgroundImage = "url('../../Images/edit.png')";
            
            const table = editBTN.closest(".table");
            const number_label = table.querySelector(".tablenumber");
            const seats_label = table.querySelector(".totalseats");
            const status_label = table.querySelector("div");

            number_label.innerText = `Table ${tablenumber}`;
            seats_label.innerText = `${seats} seats`;
            const qr = document.querySelector(`.qr-code[tablenumber="${id}"]`);
            
            if(status == 'occupied')
            {
                table.style.borderColor = "red";

                if(status_label.classList.contains("occupied") == false)
                {
                    status_label.classList.add(["occupied"]);
                }
                
                status_label.innerText = "Occupied";
                qr.style.borderColor = "red";
                
            }

            else
            {
                table.style.borderColor = "";
                if (status_label.classList.contains("occupied") == true) {
                    status_label.classList.remove(["occupied"]);
                }
                status_label.innerText = "Available";
                qr.style.borderColor = ""
            }

            const l1 = qr.querySelector(".tableidx");
            const l2 = qr.querySelector(".seats");

            console.log("hsdfgv")

            l1.innerText = `Table ${tablenumber}`;
            l2.innerText = `${seats} Seats`;
        }
        
        const response = await fetch(`http://localhost:3000/api/table/update/${id}`,{
            
            method:"PATCH",
            headers:
            {
                "content-type":"application/json"
            },
            body:JSON.stringify({tablenumber,seats,status})
        });

        if(response.ok)
        {
            const data = await response.json();
            alert(data["message"]);
        }
    });

}
  
