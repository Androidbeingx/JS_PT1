/**
 * Andrea Morales Mata
 * Fichero para dinamizar las funciones de registro.
 * Validar parametros y registra ususrio.
 */

var nom;
var cognoms;
var pass;
var pass2;
var username;
//control errors
var errorName = true, errorCognoms=true, errorPass=true, errorPass2=true, errorUser= true;


document.addEventListener("DOMContentLoaded", function(){

    // VALIDA NOM
    document.getElementById("nom").addEventListener("blur", function(){
        nom = document.getElementById("nom").value;
        errorName = validaNoms(nom);//false -> sin errores

        if (!errorName){
            document.getElementById("errorN").innerHTML="";
            errorName=false;
        }else { //validaNomCognoms = true, hay errores
            document.getElementById("errorN").innerHTML="Nom no permès. Només ha de contenir lletres";
            document.getElementById("nom").innerHTML="";
        };
        checkButton ();
    });

    // VALIDA COGNOMS
    document.getElementById("cognoms").addEventListener("blur", function(){
        cognoms = document.getElementById("cognoms").value;
        errorCognoms = validaNoms(cognoms);//false -> sin errores

        if (!errorCognoms){
            document.getElementById("errorC").innerHTML="";
            errorCognoms=false;
        }else { //validaNomCognoms = true, hay errores
            document.getElementById("errorC").innerHTML="Cognoms no vàlids. Només ha de contenir lletres";
            document.getElementById("cognoms").innerHTML="";
        };
        checkButton ();
    });

    // VALIDA USER
    document.getElementById("usernamer").addEventListener("blur", function(){
        username = document.getElementById("usernamer").value;
        errorUser = validaNoms(username);//false -> sin errores

        if (!errorUser){
            document.getElementById("errorU").innerHTML="";
            errorUser=false;
        }else { //validaNomCognoms = true, hay errores
            document.getElementById("errorU").innerHTML="Usuari no vàlid. Només ha de contenir lletres";
            document.getElementById("usernamer").innerHTML="";
        };
        checkButton ();
    });

    //VALIDA PASSWORD
    document.getElementById("password1").addEventListener("blur", function(){
        pass = document.getElementById("password1").value;
        errorPass = validaPass(pass);//false -> sin errores

        if (!errorPass){
            document.getElementById("errorP").innerHTML="";
            errorPass=false;
    
        }else { //validaNomCognoms = true, hay errores
            document.getElementById("errorP").innerHTML="Contrasenya no vàlida. Mínima llargària 8 caràcters. Lletres i números.";
            document.getElementById("password1").innerHTML="";
        };    
        checkButton ();
    });

    //VALIDA PASSWORD2
    document.getElementById("password2").addEventListener("mouseout", function(){
        pass2 = document.getElementById("password2").value;

        if (pass === pass2) {
            document.getElementById("errorP1").innerHTML="";
            errorPass2=false;
        }else{
            document.getElementById("errorP1").innerHTML="No coincideix la contrasenya";
            document.getElementById("password2").innerHTML="";
            errorPass2=true;    
        };
        checkButton ();
    });


    //BOTÓ CARREGA INFO AL SERVER PER FER UN CHECK A LA BASE DE DADES
    document.getElementById("registra").addEventListener("click", function (){
        //Els nous registres són clients de base.
        userre={
            usr: username,
            pass: pass,
            name: nom,
            surname: cognoms,
            rol: "Client"
        };
        addingServer()
    });
  
});


/**
 * @param string con nombre , apellidos o usuario
 * Utiliza pattern para validarlo
 * Devuelve false si no coicide saltando un mensaje de error al usuario
 */

//VALIDA NOM, COGNOMS, USER

function validaNoms(value){
    var pattern = /^([a-zA-Z-'ªçñÑÇáéíóúàèìòùÄÜËÏÖäëïöü ]+)$/;
    if (pattern.test(value)){
        return false;//no hay errores
    }else{
        return true;//hay errores
    };
};


/**
 * @param string con la contraseña 
 * valida que tenga minimo una letra y un numero
 */

//VALIDA PASSWORD

function validaPass(value){
    var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (pattern.test(value)){
        return false;//no hay errores
    }else{
        return true;//hay errores
    };
};


/**
 * Funcion para comprobar si los hay errores y habilitar el boton de registrar
 * Si no hay errores lo habilita
 */

//COMMPROVACIÓ BOTÓ

function checkButton () {
    if (!errorName && !errorCognoms && !errorUser && !errorPass && !errorPass2){
        document.getElementById("registra").disabled = false;
    }else{
        document.getElementById("registra").disabled = true;
    };
};


/**
 * Funcion para enviar al servidor (server2.php) el objeto con la informacion del usuario
 * VAlida si existe el usuario y sino lo añade en la base de daros.
 */

// CONECTAR AL SERVER

function addingServer(){
    //enviar aquest objecte al servidor:
    let xhr= new XMLHttpRequest();
    xhr.open("POST", "./php/server2.php"); //obrir connexio (2 parametros)
    xhr.send(JSON.stringify(userre));//enviament de dades: objeto a JSON antes del envio
    xhr.onload=function(){ // esperar a rebre dades
     
        if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
        }else { // muestra el resultado
            //xhr.response en un JSON que viene desde PHP
            let responseServer = JSON.parse(xhr.response);//reconvertirlo/parsearlo
            document.getElementById("response2").innerHTML = responseServer;   
        }
    };
};