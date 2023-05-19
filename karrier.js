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
