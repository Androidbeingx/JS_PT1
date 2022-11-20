/**
 * Andrea Morales Mata
 * Fichero para darle interacción al navegador de index.html
 */

document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById("login").style.display = "none";
    document.getElementById("registre").style.display = "none";
    document.getElementById("carregant").style.display = "none";
    document.getElementById("home1").style.display = "block";
    myTimer();    
    setInterval(myTimer, 1000);//actualizar al segundo

    document.getElementById("btlog").addEventListener("click", function(){
        document.getElementById("registre").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("carregant").style.display = "none";
        document.getElementById("home1").style.display = "none";
    });

    document.getElementById("btre").addEventListener("click", function(){
        document.getElementById("registre").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("carregant").style.display = "none";
        document.getElementById("home1").style.display = "none";
        
    });

    //BOTÓ HOME REGISTRE
    document.getElementById("btho1").addEventListener("click", function(){
        document.getElementById("registre").style.display = "none";
        document.getElementById("home1").style.display = "block";
        document.getElementById("login").style.display="none";
        document.getElementById("carregant").style.display = "none";
    });

    
});


/**
 * Funcion para mostrar la fecha en catala con la hora que se actuliza al segundo
 */

function myTimer() {
    var options = { weekday: 'long', day: 'numeric', month: 'long' }
    const d = new Date();

    document.getElementById("hora").innerHTML = d.toLocaleDateString('cat-ES', options) +" "+ d.toLocaleTimeString();
}