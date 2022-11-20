/**
 * Andrea Morales Mata
 * Fichero para hacer las funciones de la pagina de login.
 */


let user;
var username;
var password;
var resposta;

document.addEventListener("DOMContentLoaded", function(){
    
    //Enviar el input que introduce en usuario en la base de datos y validarlo
    document.getElementById("valida").addEventListener("click", function(){
        username = document.getElementById("username").value;
        password = document.getElementById("contra").value;
        user={
            usuari: username,
            contrasenya: password
        };
        connectingServer();
        

    });

 
});

/**
 * Función para conectar con el server (server.php) i esperar la respuesta. 
 * @param object user con las credenciales
 */
function connectingServer(){
    //enviar aquest objecte al servidor:
    
    let xhr= new XMLHttpRequest();
    xhr.open("POST", "./php/server.php"); //obrir connexio (2 parametros)
    xhr.send(JSON.stringify(user));//enviament de dades: objeto a JSON antes del envio
    xhr.onload=function(){ // esperar a rebre dades
     
        if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
        } else { // muestra el resultado
            //xhr.response en un JSON que viene desde PHP
            let responseServer = JSON.parse(xhr.response);//reconvertirlo/parsearlo

            if (responseServer=="Client"){
                    resposta = true;
                }else if (responseServer=="Gestor"){
                    resposta = true;
                }else{
                    resposta = false;
                } 

           if(resposta){
            document.getElementById("login").style.display = "none";
            document.getElementById("carregant").style.display = "block";
            document.getElementById("myDiv").innerHTML= "<div  class= 'container col-md-6 col-md-offset-1' style='background-color: white;'><h3 >Tens privilegis de " + responseServer + "<br> Login exitós. Carregant la pàgina.</h3></div>";
            setCookie("user", username, 30);
            setTimeout(showPage, 1500);
           }else if (!resposta){
            document.getElementById("response").innerHTML = responseServer;
           }
        }
    }; 
}


/**
 * Para redirigir a otra pagina html despues de logearte
 */

//OBRE UNA ALTRA PAGINA HTML
function showPage() {
    window.open("main.html", "_self");
};


/**
 * Funcion para guardar el usuario en una cookie de sesion(sin expire)
 */

// FICAR Cookie
function setCookie(cname, cvalue) {
        
    document.cookie = cname + "=" + cvalue + ";";
  }
  
