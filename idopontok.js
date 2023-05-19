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
if(document.querySelector(".form_content button") == null){

}
else{
    document.querySelector(".form_content button").onclick = () =>{

        let email = document.querySelector(".form_content .form_email");
        let inpName = document.querySelector(".form_name");
        let careerModal = document.querySelector("#career_modal");
        
        ValidateName(inpName.value.split(" "));
        ValidateEmail(email);
        
        if(document.querySelector(".name_error").style.display == "none")
            if(document.querySelector(".email_error").style.display == "none"){
                email.value = "";
                inpName.value = "";
    
                careerModal.showModal();
                document.querySelector(".succes").innerHTML = `<i class="fa fa-circle-check"></i>`;
    
                setTimeout(() =>{
                    careerModal.close();
                }, 2500)
            }
    }
}


// Időpontok táblázat

document.querySelectorAll(".barber_box").forEach(target =>{
    let barberName = target.querySelector(".name").innerHTML;

    for(let i = 0; i < fodraszok.borbelyok.length; i++){
        if(barberName == fodraszok.borbelyok[i].nev){
            for(let j = 0; j < fodraszok.borbelyok[i].idopontok.length; j++){
                target.querySelector(".foglalhato").innerHTML += `
                    <span>${fodraszok.borbelyok[i].idopontok[j]}</span>
                `
            }
        }
    }
})


document.querySelectorAll(".foglalhato span").forEach(target =>{
    target.onclick = () =>{
        let selectedSpan = document.querySelector(".foglalhato .selectedSpan");
        var parNode = target.parentNode.parentNode;
        var targetIdo = target.innerHTML;

        if(selectedSpan)
            selectedSpan.classList.remove("selectedSpan");

        target.classList.add("selectedSpan");
        target.parentNode.parentNode.querySelector(".buttons").style.display = "block";

        target.parentNode.parentNode.querySelector(".megse_btn").onclick = () =>{
            let selectedSpan = document.querySelector(".foglalhato .selectedSpan");

            selectedSpan.classList.remove("selectedSpan");
            parNode.querySelector(".buttons").style.display = "none";
        }

        target.parentNode.parentNode.querySelector(".foglal_btn").onclick = () =>{
            let foglalModal = document.querySelector("#modal");
            let selectedSpan = document.querySelector(".foglalhato .selectedSpan");

            if(selectedSpan){
                foglalModal.showModal();
                parNode.querySelector(".buttons").style.display = "none";
            }
        }

        document.querySelector(".close_btn").onclick = () =>{
            modal.close();
        }

        document.querySelector(".go").onclick = () =>{
            let foglaloNeve = document.querySelector(".form .neve");
            let szama = document.querySelector(".form .szama");
            let selectedSpan = document.querySelector(".foglalhato .selectedSpan");
            let succesModal = document.querySelector(".succes_modal");

            ValidateName(foglaloNeve.value.split(" "));


            if(szama.value.match(/[0-9]{11}/))
                document.querySelector(".form .tel_error").style.display = "none";
            else
                document.querySelector(".form .tel_error").style.display = "block";

            if(document.querySelector(".form .tel_error").style.display == "none"){
                if(document.querySelector(".form .name_error").style.display = "none"){

                    parNode.querySelector(".foglalt").style.display = "block";
                    parNode.querySelector(".foglalt_p").style.display = "block";

                    for(let i = 0; i < fodraszok.borbelyok.length; i++){
                        if(fodraszok.borbelyok[i].nev == parNode.querySelector(".name").innerHTML)
                            for(let j = 0; j < fodraszok.borbelyok[i].idopontok.length; j++)
                                if(fodraszok.borbelyok[i].idopontok[j] == targetIdo){
                                    let target = fodraszok.borbelyok[i].idopontok.indexOf(targetIdo);
                                    let pushTarget = fodraszok.borbelyok[i].idopontok.splice(target, 1);
                                    console.log(pushTarget);

                                    fodraszok.borbelyok[i].lefoglalt.push(pushTarget);

                                    let barsName = parNode.querySelector(".name").innerHTML;

                                    for(let i = 0; i < fodraszok.borbelyok.length; i++){
                                        if(barsName == fodraszok.borbelyok[i].nev){
                                            for(let j = 0; j < fodraszok.borbelyok[i].lefoglalt.length; j++){
                                                parNode.querySelector(".foglalt").innerHTML += `
                                                    <span class="piros">${fodraszok.borbelyok[i].lefoglalt[j]}</span>
                                                `
                                            }
                                        }
                                    }
                                }
                    }

                    modal.close();
                    selectedSpan.style.display = "none";

                    succesModal.showModal();

                    setTimeout(() =>{
                        succesModal.close()
                    }, 2500)
                }
            }

            parNode.querySelectorAll(".piros").forEach(target =>{
                target.onclick = () =>{

                    target.classList.add("sel");

                    parNode.querySelector(".buttons").style.display = "block";
                    parNode.querySelector(".buttons").innerHTML = "";

                    parNode.querySelector(".buttons").innerHTML += `
                        <button class="lemond">Lemondom</button>
                        <button class="lemond_megse_btn">Mégse</button>
                    `;
                    
                    parNode.querySelector(".lemond").onclick = () =>{
                        let selectedSpan = document.querySelector(".foglalhato .selectedSpan");

                        parNode.querySelector(".piros").remove();

                        parNode.querySelector(".buttons").innerHTML = "";

                        parNode.querySelector(".buttons").innerHTML += `
                            <button class="foglal_btn">Lefoglalom</button>
                            <button class="megse_btn">Mégse</button>
                        `;

                        parNode.querySelector(".buttons").style.display = "none";

                        for(let i = 0; i < fodraszok.borbelyok.length; i++){
                            for(let j = 0; j < fodraszok.borbelyok[i].lefoglalt; j++){
                                fodraszok.borbelyok[i].lefoglalt = [];
                            }
                        }

                        selectedSpan.style.display = "block"
                    }

                    parNode.querySelector(".lemond_megse_btn").onclick = () =>{
                        parNode.querySelector(".piros.sel").classList.remove("sel");
                        parNode.querySelector(".buttons").style.display = "none";
                    }
                }

            })
            
        }
    }

    }
)