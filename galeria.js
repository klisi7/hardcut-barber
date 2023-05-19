// Menü

document.querySelector(".toggle").onclick = function(){
    document.querySelector(".menu_list").classList.toggle("active");
};

document.querySelectorAll(".nav_links").forEach(links =>{
    links.onclick = function(){
        document.querySelector(".menu_list").classList.remove("active");
    }
})