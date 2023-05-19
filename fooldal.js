let fodraszok = {
    
    borbelyok: [
        {
            nev: "Zsombi",
            idopontok: ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
            lefoglalt: []
        },
        {
            nev: "Ati",
            idopontok: ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
            lefoglalt: []
        },
        {
            nev: "Krisztián",
            idopontok: ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
            lefoglalt: []
        },
        {
            nev: "Erik",
            idopontok: ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
            lefoglalt: []
        },
    ]
}

// Menü

document.querySelector(".toggle").onclick = function(){
    document.querySelector(".menu_list").classList.toggle("active");
};

document.querySelectorAll(".nav_links").forEach(links =>{
    links.onclick = function(){
        document.querySelector(".menu_list").classList.remove("active");
    }
})

// Számláló

window.addEventListener("scroll", () =>{
    let scrolled = window.scrollY;

    if(scrolled > 60 && scrolled < 100){
        let targets = document.querySelectorAll(".counter_num");

        targets.forEach(value =>{
            let startValue = 600;
            let endValue = parseInt(value.getAttribute("data-val"));
            let counter = setInterval(()=>{
                startValue ++;
                value.innerHTML = startValue;
            if(startValue == endValue){
                clearInterval(counter);
            } 
            })
        })
    }
})

//Borbély időpontok

document.querySelectorAll(".txt button").forEach(target =>{
    target.onclick = () =>{
        let name = target.parentNode.querySelector("h3").innerHTML;

        for(var i = 0; i < fodraszok.borbelyok.length; i++){
            if(name == fodraszok.borbelyok[i].nev){

                target.parentNode.querySelector("p").style.display = "none";
                target.parentNode.querySelector("button").style.display = "none";

                let box = document.createElement("div");
                box.classList.add("appointment_container");

                let xBtn = document.createElement("button");
                let bookBtn = document.createElement("button");

                xBtn.classList.add("remove");
                bookBtn.classList.add("foglal");
                xBtn.innerHTML = "Mégsem";
                bookBtn.innerHTML = "Lefoglalom";

                let btnBox = document.createElement("div");
                btnBox.classList.add("btn_box");
                btnBox.appendChild(bookBtn);
                btnBox.appendChild(xBtn);

                for(let j = 0; j < fodraszok.borbelyok[i].idopontok.length; j++){
                    let span = document.createElement("span");
                    span.innerHTML = fodraszok.borbelyok[i].idopontok[j];
                    
                    box.appendChild(span)
                    target.parentNode.appendChild(box);
                    target.parentNode.appendChild(btnBox);
                }
            }
        }

        document.querySelectorAll(".appointment_container span").forEach(target =>{
            target.onclick = () =>{
                let selectedItem = document.querySelector(".appointment_container .selected");
        
                if(selectedItem)
                    selectedItem.classList.remove("selected");
        
                target.classList.add("selected");
                target.parentNode.parentNode.querySelector(".btn_box .foglal").style.backgroundColor = "green";  
            }
        });

        document.querySelectorAll(".btn_box .foglal").forEach(target =>{
            target.onclick = () =>{
                let selectedItem = document.querySelector(".appointment_container .selected");
                let modal = document.querySelector("#modal");
                let today = new Date();
                let date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

                if(selectedItem){
                    modal.querySelector("h2").innerHTML = target.parentNode.parentNode.querySelector("h3").innerHTML;
                    modal.querySelector(".nap").innerHTML = date;
                    modal.querySelector(".ora").innerHTML = selectedItem.innerHTML;
                    modal.showModal();
                }
                    
            }
        })

        document.querySelectorAll(".btn_box .remove").forEach(target =>{
            target.onclick = () =>{
                let selectedItem = document.querySelector(".appointment_container .selected");

                selectedItem.classList.remove("selected");
                document.querySelector(".btn_box .foglal").style.backgroundColor = "#370617";
            }
        })

        document.querySelector(".close_btn").onclick = () =>{
            modal.close();
        }

        document.querySelector(".go").onclick = () =>{
            let foglaloNeve = document.querySelector(".form .neve");
            let szama = document.querySelector(".form .szama");
            let ido = document.querySelector(".datum .ora").innerHTML;
            let selectedItem = document.querySelector(".appointment_container .selected");
            let succesModal = document.querySelector(".succes_modal")

            ValidateName(foglaloNeve.value.split(" "));

            if(szama.value.match(/[0-9]{11}/))
                document.querySelector(".form .tel_error").style.display = "none";
            else
                document.querySelector(".form .tel_error").style.display = "block";

            if(document.querySelector(".form .tel_error").style.display == "none")
                if(document.querySelector(".form .name_error").style.display = "none"){
                    for(let i = 0; i < fodraszok.borbelyok.length; i++){
                        if(fodraszok.borbelyok[i].nev == document.querySelector("#modal h2").innerHTML)
                            for(let j = 0; j < fodraszok.borbelyok[i].idopontok.length; j++)
                                if(fodraszok.borbelyok[i].idopontok[j] == ido){
                                    let target = fodraszok.borbelyok[i].idopontok.indexOf(ido);
                                    let pushTarget = fodraszok.borbelyok[i].idopontok.splice(target, 1);

                                    fodraszok.borbelyok[i].lefoglalt.push(pushTarget);
                                }
                    }

                    modal.close();
                    selectedItem.remove();
                    document.querySelector(".btn_box .foglal").style.backgroundColor = "#370617";

                    succesModal.showModal();

                    setTimeout(() =>{
                        succesModal.close()
                    }, 2500)
                }
        }
    }
})


// Név validátor

function ValidateName(inputText){

    if(inputText.length < 2){
        document.querySelector(".name_error").style.display = "block";
    }
    else{
        document.querySelector(".name_error").style.display = "none";
        return true;
    }
}


// Email validátor

function ValidateEmail(inputText){
    let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(inputText.value.match(regEx))
        document.querySelector(".email_error").style.display = "none";
    else
        document.querySelector(".email_error").style.display = "block";
}
