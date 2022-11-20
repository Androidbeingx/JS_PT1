/**
 * Andrea Morales Mata
 * Fichero de js de la pagina principal de la prectica
 * Saluda al ususario, recoge datos de vuelos y los muestra, muestra factira con posibilidad de imprimir.
 */

var origen;
var destino;
var ida;
var vuelta;
var pasajeros;
var idadia;
var vueltadia;
var usuari;

//control errors formulario busqueda vuelos
var errorOrg = true, errorDes = true, errorIda = true, errorVuel = true, errorPas = true;

document.addEventListener("DOMContentLoaded", function(){

  document.getElementById("carregant").style.display = "none";
  document.getElementById("buscador").style.display = "none";
  document.getElementById("vuelos").style.display="none";
  document.getElementById("data").style.display="none";
  checkCookie();
  myTimer();    
  setInterval(myTimer, 1000);
  


  //BOTÓ LOG OUT
  //ELIMINA LA COOKIE CREADA Y VUELVE AL INDEX.HTML
  document.getElementById("btout").addEventListener("click", function(){
      document.getElementById("buscador").style.display = "none";
      document.getElementById("carregant").style.display = "block";
      document.getElementById("home").style.display = "none";
      document.getElementById("vuelos").style.display="none";
      document.getElementById("data").style.display="none";
      document.getElementById("myDiv").innerHTML="<div  class= 'container col-md-6 col-md-offset-1' style='background-color: white;'><h3 >Adèu, no triguis en tronar! ;)</h3></div>";
      setTimeout(returnPage, 1500);
      del_cookie("user");

  });

  //BOTÓ HOME VOLS
  document.getElementById("btho").addEventListener("click", function(){
    document.getElementById("buscador").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("vuelos").style.display="none";
    document.getElementById("data").style.display="none";
    document.getElementById("carregant").style.display = "none";
});

  //BOTÓ VOLS
  //Muestra formulario con opciones de fechas.
  document.getElementById("btfl").addEventListener("click", function(){
    
    document.getElementById("carregant").style.display = "none";
    document.getElementById("vuelos").style.display="none";
    document.getElementById("home").style.display = "none";
    document.getElementById("data").style.display="none";
    document.getElementById("buscador").style.display = "block";

    Server();
    calendarmin()
    calendarmax()
  });


  //FORM CERCA VOLS
  //VALIDAR BOTÓN Y OBTENER DATA

  //ORIGEN
  document.getElementById("selecto").addEventListener("mouseenter", function(){
    origen = document.getElementById("selecto").value;
    
    if (origen){
      errorOrg = false;
    }else { 
      errorOrg = true;
    }
    checkButtonFV ();
  });

  //DESTINO
  document.getElementById("selectd").addEventListener("mouseenter", function(){
    destino = document.getElementById("selectd").value;
    
    if (destino){
      errorDes = false;
    }else { 
      errorDes = true;
    };
    checkButtonFV ();
  });

  //IDA
  document.getElementById("calendara").addEventListener("change", function(){
    ida = document.getElementById("calendara").value;
    
    if (ida){
      errorIda = false;
    }else { 
      errorIda = true;
    };
    checkButtonFV ();
  });

  //VUELTA
  document.getElementById("calendart").addEventListener("change", function(){
    vuelta = document.getElementById("calendart").value;
    
    if (vuelta){
      errorVuel = false;
    }else { 
      errorVuel = true;
    };
    checkButtonFV ();
  });

  //PASSATGERS
  document.getElementById("numpass").addEventListener("mouseenter", function(){
    pasajeros = document.getElementById("numpass").value;
    
    if (pasajeros){
      errorPas = false;
    }else { 
      errorPas = true;
    };
    checkButtonFV ();
  });

  //DISPLAY RESPOSTA SERVER DEL VOLS DISPONIBLES
  // BOTÓ CERCA VOLS
  document.getElementById("btvol").addEventListener("click", function(){
    document.getElementById("buscador").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("carregant").style.display = "none";
    document.getElementById("vuelos").style.display="block";

    //numero del dia de la setmana (0-6)
    let formatdatai = new Date(ida);
    let formatdatav = new Date(vuelta);

    idadia = formatdatai.getDay();
    vueltadia = formatdatav.getDay();

    //objecte amb totes les dades per enviar al server 
    selection = {
      origin: origen,
      desti: destino,
      anada: idadia,
      tornada: vueltadia,
      passatgers: pasajeros
    };
    serverVols();

  });

  

});

//FUNCIONS
/////////////////////////////////////////////////////////////////////


/**
 * Misma funcion que nav.js
 * Muestra la fecha en català.
 * Esta repetida por que los js no estan linkados en el html. Asi evitar sobreescribir.
 */
//RELLOTGE
function myTimer() {
    var options = { weekday: 'long', day: 'numeric', month: 'long' }
    const d = new Date();

    document.getElementById("hora").innerHTML = d.toLocaleDateString('cat-ES', options) +" "+ d.toLocaleTimeString();
};

//COOKIES

/**
 * Obtiene la cokkie y su valor
 * @param strig nombre de la cookie
 */

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
};

/**
 * Comprobar cookie si existe saludar al usuario si no reenviar al inde.html
 */

function checkCookie() {
    let user = getCookie("user");
    if (user != "") {
      capi = user.toUpperCase();
      document.getElementById("cookie").innerHTML += " "+ capi;
    } else {
      alert("Has de fer login primer!.");
      returnPage();
      
    }
};


/**
 * Elimina la cookie otorgandole fecha de expiracion.
 */

function del_cookie(name) {
    document.cookie = name +
    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
};

/**
 * Volver a la pagina index.html.
 * Para redirigir si no esta logeado comprobando la cookie o el boton logout
 */
//OBRE UNA ALTRA PAGINA HTML
function returnPage() {
    window.open("index.html", "_self");
};
 
  


// ACORTAR CALENDARIO VISIBLE

/**
 * Añade meses deseados a una fecha.
 * @param int numero de meses
 * @param date fecha de hoy
 */


function addMonths(numOfMonths, date = new Date()) {
  date.setMonth(date.getMonth() + numOfMonths);

  return date;
}

/**
 * Darle foormato a la fecha para uqe html la coja
 * @param date fecha elegida
 */
function format(inputDate) {

  let day = inputDate.getDate();
  let month = inputDate.getMonth()+1;
  let year = inputDate.getFullYear();

  date = day.toString().padStart(2,'0');
  month = month.toString().padStart(2,'0');

  return `${year}-${month}-${date}`
};

/**
 * Determina el minimo del calendario a la fecha del dia
 */

function calendarmin() {
  today = new Date()
  todayf = format(today);
  
  minca = document.getElementById("calendara").min = todayf;
  minct = document.getElementById("calendart").min = todayf;
  
}


/**
 * Determina el maximo visible el calendario 6 meses a partir de la fecha del dia
 * funcion utiliza de añadir meses
 */

function calendarmax() {
  today = new Date()
  maxd = addMonths(6 ,today)
  maxf = format(maxd);
  
  maxca = document.getElementById("calendara").max =  maxf;
  maxct = document.getElementById("calendart").max =  maxf;
  
  
}


//COMMPROVACIÓ BOTÓ

/**
 * Si no hay errores habilita el boton para continuar en la pagina.
 */
function checkButtonFV () {
    if (!errorOrg && !errorDes && !errorIda && !errorVuel && !errorPas){
        if (origen !== destino) {
          document.getElementById("btvol").disabled = false;
        }       
    }else{
        document.getElementById("btvol").disabled = true;
    }
}


//SERVER
////////////////////////////////////////////////////////////////////////////////

/**
 * Envia una peticion al servidor (search.php)
 * Para obtener las ciudades disponobles guardadas en un selector
 */

function Server(){
  //enviar aquest objecte al servidor:
  let xhr= new XMLHttpRequest();
  xhr.open("GET","./php/search.php"); 
  xhr.send();
  xhr.onload=function(){ 
   
      if (xhr.status != 200) { 
      alert(`Error ${xhr.status}: ${xhr.statusText}`); 
      } else { 
          //xhr.response en un JSON que viene desde PHP
          let responseServer = JSON.parse(xhr.response);

          for (i = 0; i <responseServer.length; i++) {
           
            document.getElementById("selecto").innerHTML += "<option selected>"+responseServer[i]+"</option>";  
            document.getElementById("selectd").innerHTML += "<option selected>"+responseServer[i]+"</option>";
            
          }                       
        }
      }
  };  

  /**
   * Con el objeto selection envia los datos al servidor para comprobar los vuelos.
   * Al ser repuesta asincrona todo el manejo de la respuesta como crecion de tablas o guardar valores se hace dentro de 
   * esta funcion si no de otra manera daria el resultado indefinido.
   * Crea tablas con los vuelos disponibles 
   * Se guarda los valores seleccionados y da a paso a un formulario para el usuario
   * Una vez rellenado y validado se procede a hacer la "compra" y la posterior factura de todos los datos introducidos.
   */

  function serverVols(){

    //enviar aquest objecte al servidor:
    let xhr= new XMLHttpRequest();
    xhr.open("POST", "./php/search2.php"); //obrir connexio (2 parametros)
    xhr.send(JSON.stringify(selection));//enviament de dades: objeto a JSON antes del envio
    xhr.onload=function(){ // esperar a rebre dades
     
        if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
        } else { // muestra el resultado
            //xhr.response en un JSON que viene desde PHP
            responseServer = JSON.parse(xhr.response);//es un array de tpda la informacion disponible
            

            //Convertimos en tabla todas las opciones con su boton de reservar funcional cada una 
            //Contempladas todas las respuestas del usuario.
            if (ida > vuelta){
              //si elije una fecha de vuelta anterios a la de ida
              document.getElementById("tablavuelos").innerHTML = "Malauradament encara no es pot viatjar al passat <br> DATA ANADA: "+ida+"<br>DATA TORNADA: "+ vuelta;  
            }else if (responseServer[4].length === 0 && responseServer[5].length === 0){
              //si los arrays de horas de ida i vuelta estan vacios
              document.getElementById("tablavuelos").innerHTML = "No hi ha vols disponibles. Torna-ho a intentar ;)";           
            }else if (responseServer[4].length === 0){
              //si el array de horas de ida esta vacio
              document.getElementById("tablavuelos").innerHTML = "No hi ha vols disponibles en la data d'anada. Torna-ho a intentar ;)";
            }else if(responseServer[5].length === 0){
              //si el array de horas de vuelta esta vacio
              document.getElementById("tablavuelos").innerHTML = "No hi ha vols disponibles en la data de tornada. Torna-ho a intentar ;)";             
            }else if (responseServer[4].length !== 0 && responseServer[5].length !== 0){
              //si hay horas disponibles en las dos variables
              var mytable =""; 
              if(responseServer[4].length === 2 && responseServer[5].length === 1){
                  // si hay dos horas de ida y una de vuelta
                  mytable += "<table class='center'><tr>";  
                  mytable += "<th>DIA</th>";
                  mytable += "<th>SORTIDA</th>";
                  mytable += "<th>INFORMACIÓ</th>";
                  mytable += "<th>ARRIBADA</th>";
                  mytable += "<th>TRAJECTE</th>";
                  mytable += "<th>ANADA I TORNADA</th>";
                  mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv1' value='RESERVA'></th>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2' id='diai1'>"+ida+"</td>";
                  mytable += "<td id='hsi1'>"+responseServer[4][0]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                  mytable += "<td>"+horaLlegada(responseServer[4][0],responseServer[0])+"h</td>";
                  mytable += "<td rowspan='4' id='pv1'>"+responseServer[2]+" €</td>";
                  mytable += "<td rowspan='4'id='pf1'>"+responseServer[3]+" €</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td>"+origen+"</td>";
                  mytable += "<td>"+destino+"</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2'id='diav1'>"+vuelta+"</td>";
                  mytable += "<td id='hsv1'>"+responseServer[5]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                  mytable += "<td >"+horaLlegada(responseServer[5],responseServer[0])+"h</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td >"+destino+"</td>";
                  mytable += "<td >"+origen+"</td>";
                  mytable += "</tr>";
                  mytable += "</table>";
                  mytable += "<table class='center'><tr>"; 
                  mytable += "<th>DIA</th>";
                  mytable += "<th>SORTIDA</th>";
                  mytable += "<th>INFORMACIÓ</th>";
                  mytable += "<th>ARRIBADA</th>";
                  mytable += "<th>TRAJECTE</th>";
                  mytable += "<th>ANADA I TORNADA</th>";
                  mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv2' value='RESERVA'></th>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2' id='diai2'>"+ida+"</td>";
                  mytable += "<td id='hsi2'>"+responseServer[4][1]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                  mytable += "<td>"+horaLlegada(responseServer[4][1],responseServer[0])+"h</td>";
                  mytable += "<td rowspan='4'id='pv2'>"+responseServer[2]+" €</td>";
                  mytable += "<td rowspan='4' id='pf2'>"+responseServer[3]+" €</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td>"+origen+"</td>";
                  mytable += "<td>"+destino+"</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2'id='diav2'>"+vuelta+"</td>";
                  mytable += "<td id='hsv2'>"+responseServer[5]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                  mytable += "<td>"+horaLlegada(responseServer[5],responseServer[0])+"h</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td >"+destino+"</td>";
                  mytable += "<td >"+origen+"</td>";
                  mytable += "</tr>";
                  mytable += "</table>"; 

                  document.getElementById("tablavuelos").innerHTML = mytable;

                  //Si es clica l'opció 1
                    document.getElementById("btreserv1").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai1").innerHTML;
                      diavuelta = document.getElementById("diav1").innerHTML;
                      horasida = document.getElementById("hsi1").innerHTML;
                      horasvuel = document.getElementById("hsv1").innerHTML;
                      preciotrayecto = document.getElementById("pv1").innerHTML;
                      preciofinal = document.getElementById("pf1").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                      
                      searhUser();
                      ServerConnect();
                      createForm ();
                      
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });

                    //Si es clica l'opció 2
                    document.getElementById("btreserv2").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai2").innerHTML;
                      diavuelta = document.getElementById("diav2").innerHTML;
                      horasida = document.getElementById("hsi2").innerHTML;
                      horasvuel = document.getElementById("hsv2").innerHTML;
                      preciotrayecto = document.getElementById("pv2").innerHTML;
                      preciofinal = document.getElementById("pf2").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                      
                      searhUser();
                      ServerConnect();
                      createForm ();
                      
                                            
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });


                }else if (responseServer[4].length === 1 && responseServer[5].length === 2){
                  //Si hay una hora de ida y dos de vuelta

                  mytable += "<table class='center'><tr>";  
                  mytable += "<th>DIA</th>";
                  mytable += "<th>SORTIDA</th>";
                  mytable += "<th>INFORMACIÓ</th>";
                  mytable += "<th>ARRIBADA</th>";
                  mytable += "<th>TRAJECTE</th>";
                  mytable += "<th>ANADA I TORNADA</th>";
                  mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv1' value='RESERVA'></th>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2' id='diai1'>"+ida+"</td>";
                  mytable += "<td id='hsi1'>"+responseServer[4]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                  mytable += "<td>"+horaLlegada(responseServer[4],responseServer[0])+"h</td>";
                  mytable += "<td rowspan='4' id='pv1'>"+responseServer[2]+" €</td>";
                  mytable += "<td rowspan='4'id='pf1'>"+responseServer[3]+" €</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td>"+origen+"</td>";
                  mytable += "<td>"+destino+"</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2'id='diav1'>"+vuelta+"</td>";
                  mytable += "<td id='hsv1'>"+responseServer[5][0]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                  mytable += "<td>"+horaLlegada(responseServer[5][0],responseServer[0])+"h</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td >"+destino+"</td>";
                  mytable += "<td >"+origen+"</td>";
                  mytable += "</tr>";
                  mytable += "</table>";
                  mytable += "<table class='center'><tr>"; 
                  mytable += "<th>DIA</th>";
                  mytable += "<th>SORTIDA</th>";
                  mytable += "<th>INFORMACIÓ</th>";
                  mytable += "<th>ARRIBADA</th>";
                  mytable += "<th>TRAJECTE</th>";
                  mytable += "<th>ANADA I TORNADA</th>";
                  mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv2' value='RESERVA'></th>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2' id='diai2'>"+ida+"</td>";
                  mytable += "<td id='hsi2'>"+responseServer[4]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                  mytable += "<td>"+horaLlegada(responseServer[4],responseServer[0])+"h</td>";
                  mytable += "<td rowspan='4' id='pv2'>"+responseServer[2]+" €</td>";
                  mytable += "<td rowspan='4' id='pf2'>"+responseServer[3]+" €</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td>"+origen+"</td>";
                  mytable += "<td>"+destino+"</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td rowspan='2'id='diav2'>"+vuelta+"</td>";
                  mytable += "<td id='hsv2'>"+responseServer[5][1]+"h</td>";
                  mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                  mytable += "<td>"+horaLlegada(responseServer[5][1],responseServer[0])+"h</td>";
                  mytable += "</tr>";
                  mytable += "<tr>";
                  mytable += "<td >"+destino+"</td>";
                  mytable += "<td >"+origen+"</td>";
                  mytable += "</tr>";
                  mytable += "</table>"; 

                  document.getElementById("tablavuelos").innerHTML = mytable;


                  //Si es clica l'opció 1
                  document.getElementById("btreserv1").addEventListener("click", function(){
                    //GUARDAR INFO
                    diaida = document.getElementById("diai1").innerHTML;
                    diavuelta = document.getElementById("diav1").innerHTML;
                    horasida = document.getElementById("hsi1").innerHTML;
                    horasvuel = document.getElementById("hsv1").innerHTML;
                    preciotrayecto = document.getElementById("pv1").innerHTML;
                    preciofinal = document.getElementById("pf1").innerHTML;

                    //DISPLAY FORM
                    document.getElementById("buscador").style.display = "none";
                    document.getElementById("home").style.display = "none";
                    document.getElementById("carregant").style.display = "none";
                    document.getElementById("vuelos").style.display="none";
                    document.getElementById("data").style.display="block";
                    
                    searhUser();
                    ServerConnect();
                    createForm ();
                    
                                          
                    //CHECK VALUES FORM PERSONAL DATA
                    var dni, telf, email;
                    //control errors
                    var errorDNI = true, errorEmail=true, errorTelf=true;

                    //DNI
                    document.getElementById("dnif").addEventListener("blur", function(){
                      dni = document.getElementById("dnif").value;
                      errorDNI = validaDNI(dni);//false -> sin errores

                      if (!errorDNI){
                          document.getElementById("errorDNI").innerHTML="";
                          errorDNI=false;
                      }else { 
                          document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                          document.getElementById("dnif").innerHTML="";
                      };
                      
                    });

                    //TELF
                    document.getElementById("telf").addEventListener("blur", function(){
                      telf = document.getElementById("telf").value;
                      errorTelf = validaTelf(telf);//false -> sin errores

                      if (!errorTelf){
                          document.getElementById("errorTelf").innerHTML="";
                          errorTelf=false;
                      }else { 
                          document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                          document.getElementById("telf").innerHTML="";
                      };
                      
                    });

                      

                    //EMAIL
                    document.getElementById("emailf").addEventListener("blur", function(){
                      email = document.getElementById("emailf").value;
                      errorEmail = validaEmail(email);//false -> sin errores

                      if (!errorEmail){
                          document.getElementById("errorEmail").innerHTML="";
                          errorEmail=false;
                      }else { 
                          document.getElementById("errorEmail").innerHTML="Email no valit";
                          document.getElementById("emailf").innerHTML="";
                      };
                      
                    });

                    //HABILTAR BOTO
                    document.getElementById("emailf").addEventListener("mouseout", function(){
                      if (!errorDNI && !errorTelf && !errorEmail){
                        document.getElementById("btprint").disabled = false;
                      }else{
                        document.getElementById("btprint").disabled = true;
                      };
                    });
                    
                                          
                    //PRINT WINDOW AND SAVE VALUES OF THE FORM
                    document.getElementById('btprint').addEventListener('click', function (){
                      nombre = document.getElementById("namef").value;
                      apellidos = document.getElementById("surnamef").value;

                      PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                    });
                  });

                  //Si es clica l'opció 2
                  document.getElementById("btreserv2").addEventListener("click", function(){
                    //GUARDAR INFO
                    diaida = document.getElementById("diai2").innerHTML;
                    diavuelta = document.getElementById("diav2").innerHTML;
                    horasida = document.getElementById("hsi2").innerHTML;
                    horasvuel = document.getElementById("hsv2").innerHTML;
                    preciotrayecto = document.getElementById("pv2").innerHTML;
                    preciofinal = document.getElementById("pf2").innerHTML;

                    //DISPLAY FORM
                    document.getElementById("buscador").style.display = "none";
                    document.getElementById("home").style.display = "none";
                    document.getElementById("carregant").style.display = "none";
                    document.getElementById("vuelos").style.display="none";
                    document.getElementById("data").style.display="block";
                    
                    searhUser();
                    ServerConnect();
                    createForm ();
                    
                                          
                    //CHECK VALUES FORM PERSONAL DATA
                    var dni, telf, email;
                    //control errors
                    var errorDNI = true, errorEmail=true, errorTelf=true;

                    //DNI
                    document.getElementById("dnif").addEventListener("blur", function(){
                      dni = document.getElementById("dnif").value;
                      errorDNI = validaDNI(dni);//false -> sin errores

                      if (!errorDNI){
                          document.getElementById("errorDNI").innerHTML="";
                          errorDNI=false;
                      }else { 
                          document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                          document.getElementById("dnif").innerHTML="";
                      };
                      
                    });

                    //TELF
                    document.getElementById("telf").addEventListener("blur", function(){
                      telf = document.getElementById("telf").value;
                      errorTelf = validaTelf(telf);//false -> sin errores

                      if (!errorTelf){
                          document.getElementById("errorTelf").innerHTML="";
                          errorTelf=false;
                      }else { 
                          document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                          document.getElementById("telf").innerHTML="";
                      };
                      
                    });

                      

                    //EMAIL
                    document.getElementById("emailf").addEventListener("blur", function(){
                      email = document.getElementById("emailf").value;
                      errorEmail = validaEmail(email);//false -> sin errores

                      if (!errorEmail){
                          document.getElementById("errorEmail").innerHTML="";
                          errorEmail=false;
                      }else { 
                          document.getElementById("errorEmail").innerHTML="Email no valit";
                          document.getElementById("emailf").innerHTML="";
                      };
                      
                    });

                    //HABILTAR BOTO
                    document.getElementById("emailf").addEventListener("mouseout", function(){
                      if (!errorDNI && !errorTelf && !errorEmail){
                        document.getElementById("btprint").disabled = false;
                      }else{
                        document.getElementById("btprint").disabled = true;
                      };
                    });
                    
                                          
                    //PRINT WINDOW AND SAVE VALUES OF THE FORM
                    document.getElementById('btprint').addEventListener('click', function (){
                      nombre = document.getElementById("namef").value;
                      apellidos = document.getElementById("surnamef").value;

                      PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                    });
                  });


                }else if (responseServer[4].length === 2 && responseServer[5].length === 2){
                  //Si hay dos horas de ida y dos de vuelta
                  if (ida === vuelta && responseServer[4][0] < responseServer[5][1]){
                    //Si ida y vuleta es el mismo dia hora de ida es mmas temprano que la de vuelta

                    mytable += "<table class='center'><tr>";  
                    mytable += "<th>DIA</th>";
                    mytable += "<th>SORTIDA</th>";
                    mytable += "<th>INFORMACIÓ</th>";
                    mytable += "<th>ARRIBADA</th>";
                    mytable += "<th>TRAJECTE</th>";
                    mytable += "<th>ANADA I TORNADA</th>";
                    mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv1' value='RESERVA'></th>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2' id='diai1'>"+ida+"</td>";
                    mytable += "<td id='hsi1'>"+responseServer[4][0]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                    mytable += "<td>"+horaLlegada(responseServer[4][0],responseServer[0])+"h</td>";
                    mytable += "<td rowspan='4' id='pv1'>"+responseServer[2]+" €</td>";
                    mytable += "<td rowspan='4'id='pf1'>"+responseServer[3]+" €</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td>"+origen+"</td>";
                    mytable += "<td>"+destino+"</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2'id='diav1'>"+vuelta+"</td>";
                    mytable += "<td id='hsv1'>"+responseServer[5][1]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                    mytable += "<td >"+horaLlegada(responseServer[5][1],responseServer[0])+"h</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td >"+destino+"</td>";
                    mytable += "<td >"+origen+"</td>";
                    mytable += "</tr>";
                    mytable += "</table>";

                    document.getElementById("tablavuelos").innerHTML = mytable;

                    //Si es clica l'opció 1
                    document.getElementById("btreserv1").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai1").innerHTML;
                      diavuelta = document.getElementById("diav1").innerHTML;
                      horasida = document.getElementById("hsi1").innerHTML;
                      horasvuel = document.getElementById("hsv1").innerHTML;
                      preciotrayecto = document.getElementById("pv1").innerHTML;
                      preciofinal = document.getElementById("pf1").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                        
                      searhUser();
                      ServerConnect();
                      createForm ();
                        
                                              
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });

                  }else if (ida == vuelta && responseServer[4][1] > responseServer[5][0]){
                    //Si la hora de ida es mas tarde que la hora de vuelta

                    mytable += "<table class='center'><tr>";  
                    mytable += "<th>DIA</th>";
                    mytable += "<th>SORTIDA</th>";
                    mytable += "<th>INFORMACIÓ</th>";
                    mytable += "<th>ARRIBADA</th>";
                    mytable += "<th>TRAJECTE</th>";
                    mytable += "<th>ANADA I TORNADA</th>";
                    mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv1' value='RESERVA'></th>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2' id='diai1'>"+ida+"</td>";
                    mytable += "<td id='hsi1'>"+responseServer[4][0]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                    mytable += "<td>"+horaLlegada(responseServer[4][0],responseServer[0])+"h</td>";
                    mytable += "<td rowspan='4' id='pv1'>"+responseServer[2]+" €</td>";
                    mytable += "<td rowspan='4'id='pf1'>"+responseServer[3]+" €</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td>"+origen+"</td>";
                    mytable += "<td>"+destino+"</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2'id='diav1'>"+vuelta+"</td>";
                    mytable += "<td id='hsv1'>"+responseServer[5][1]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                    mytable += "<td >"+horaLlegada(responseServer[5][1],responseServer[0])+"h</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td >"+destino+"</td>";
                    mytable += "<td >"+origen+"</td>";
                    mytable += "</tr>";

                    document.getElementById("tablavuelos").innerHTML = mytable;

                    //Si es clica l'opció 1
                    document.getElementById("btreserv1").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai1").innerHTML;
                      diavuelta = document.getElementById("diav1").innerHTML;
                      horasida = document.getElementById("hsi1").innerHTML;
                      horasvuel = document.getElementById("hsv1").innerHTML;
                      preciotrayecto = document.getElementById("pv1").innerHTML;
                      preciofinal = document.getElementById("pf1").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                        
                      searhUser();
                      ServerConnect();
                      createForm ();
                        
                                              
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });

                  }else if (ida !== vuelta){
                    //Si el dia de ida no es igual que el de vuelta imprmir las cautro opciones

                    mytable += "<table class='center'><tr>";  
                    mytable += "<th>DIA</th>";
                    mytable += "<th>SORTIDA</th>";
                    mytable += "<th>INFORMACIÓ</th>";
                    mytable += "<th>ARRIBADA</th>";
                    mytable += "<th>TRAJECTE</th>";
                    mytable += "<th>ANADA I TORNADA</th>";
                    mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv1' value='RESERVA'></th>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2' id='diai1'>"+ida+"</td>";
                    mytable += "<td id='hsi1'>"+responseServer[4][0]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                    mytable += "<td>"+horaLlegada(responseServer[4][0],responseServer[0])+"h</td>";
                    mytable += "<td rowspan='4' id='pv1'>"+responseServer[2]+" €</td>";
                    mytable += "<td rowspan='4'id='pf1'>"+responseServer[3]+" €</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td>"+origen+"</td>";
                    mytable += "<td>"+destino+"</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2'id='diav1'>"+vuelta+"</td>";
                    mytable += "<td id='hsv1'>"+responseServer[5][0]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                    mytable += "<td>"+horaLlegada(responseServer[5][0],responseServer[0])+"h</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td >"+destino+"</td>";
                    mytable += "<td >"+origen+"</td>";
                    mytable += "</tr>";
                    mytable += "</table>";
                    mytable += "<table class='center'><tr>"; 
                    mytable += "<th>DIA</th>";
                    mytable += "<th>SORTIDA</th>";
                    mytable += "<th>INFORMACIÓ</th>";
                    mytable += "<th>ARRIBADA</th>";
                    mytable += "<th>TRAJECTE</th>";
                    mytable += "<th>ANADA I TORNADA</th>";
                    mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv2' value='RESERVA'></th>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2' id='diai2'>"+ida+"</td>";
                    mytable += "<td id='hsi2'>"+responseServer[4][1]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                    mytable += "<td>"+horaLlegada(responseServer[4][1],responseServer[0])+"h</td>";
                    mytable += "<td rowspan='4' id='pv2'>"+responseServer[2]+" €</td>";
                    mytable += "<td rowspan='4' id='pf2'>"+responseServer[3]+" €</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td>"+origen+"</td>";
                    mytable += "<td>"+destino+"</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2'id='diav2'>"+vuelta+"</td>";
                    mytable += "<td id='hsv2'>"+responseServer[5][1]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                    mytable += "<td>"+horaLlegada(responseServer[5][1],responseServer[0])+"h</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td >"+destino+"</td>";
                    mytable += "<td >"+origen+"</td>";
                    mytable += "</tr>";
                    mytable += "</table>";
                    mytable += "<table class='center'><tr>"; 
                    mytable += "<th>DIA</th>";
                    mytable += "<th>SORTIDA</th>";
                    mytable += "<th>INFORMACIÓ</th>";
                    mytable += "<th>ARRIBADA</th>";
                    mytable += "<th>TRAJECTE</th>";
                    mytable += "<th>ANADA I TORNADA</th>";
                    mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv3' value='RESERVA'></th>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2' id='diai3'>"+ida+"</td>";
                    mytable += "<td id='hsi3'>"+responseServer[4][1]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                    mytable += "<td>"+horaLlegada(responseServer[4][1],responseServer[0])+"h</td>";
                    mytable += "<td rowspan='4' id='pv3'>"+responseServer[2]+" €</td>";
                    mytable += "<td rowspan='4' id='pf3'>"+responseServer[3]+" €</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td>"+origen+"</td>";
                    mytable += "<td>"+destino+"</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2'id='diav3'>"+vuelta+"</td>";
                    mytable += "<td id='hsv3'>"+responseServer[5][0]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                    mytable += "<td>"+horaLlegada(responseServer[5][0],responseServer[0])+"h</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td >"+destino+"</td>";
                    mytable += "<td >"+origen+"</td>";
                    mytable += "</tr>";
                    mytable += "</table>";
                    mytable += "<table class='center'><tr>"; 
                    mytable += "<th>DIA</th>";
                    mytable += "<th>SORTIDA</th>";
                    mytable += "<th>INFORMACIÓ</th>";
                    mytable += "<th>ARRIBADA</th>";
                    mytable += "<th>TRAJECTE</th>";
                    mytable += "<th>ANADA I TORNADA</th>";
                    mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv4' value='RESERVA'></th>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2' id='diai4'>"+ida+"</td>";
                    mytable += "<td id='hsi4'>"+responseServer[4][0]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                    mytable += "<td>"+horaLlegada(responseServer[4][0],responseServer[0])+"h</td>";
                    mytable += "<td rowspan='4' id='pv4'>"+responseServer[2]+" €</td>";
                    mytable += "<td rowspan='4' id='pf4'>"+responseServer[3]+" €</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td>"+origen+"</td>";
                    mytable += "<td>"+destino+"</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2'id='diav4'>"+vuelta+"</td>";
                    mytable += "<td id='hsv4'>"+responseServer[5][1]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                    mytable += "<td>"+horaLlegada(responseServer[5][1],responseServer[0])+"h</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td >"+destino+"</td>";
                    mytable += "<td >"+origen+"</td>";
                    mytable += "</tr>";
                    mytable += "</table>";

                    document.getElementById("tablavuelos").innerHTML = mytable;  
                    
                    //Si es clica l'opció 1
                    document.getElementById("btreserv1").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai1").innerHTML;
                      diavuelta = document.getElementById("diav1").innerHTML;
                      horasida = document.getElementById("hsi1").innerHTML;
                      horasvuel = document.getElementById("hsv1").innerHTML;
                      preciotrayecto = document.getElementById("pv1").innerHTML;
                      preciofinal = document.getElementById("pf1").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                      
                      searhUser();
                      ServerConnect();
                      createForm ();
                      
                                            
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });

                    //Si es clica l'opció 2
                    document.getElementById("btreserv2").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai2").innerHTML;
                      diavuelta = document.getElementById("diav2").innerHTML;
                      horasida = document.getElementById("hsi2").innerHTML;
                      horasvuel = document.getElementById("hsv2").innerHTML;
                      preciotrayecto = document.getElementById("pv2").innerHTML;
                      preciofinal = document.getElementById("pf2").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                      
                      searhUser();
                      ServerConnect();
                      createForm ();
                      
                                            
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });

                    //Si es clica l'opció 3
                    document.getElementById("btreserv3").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai3").innerHTML;
                      diavuelta = document.getElementById("diav3").innerHTML;
                      horasida = document.getElementById("hsi3").innerHTML;
                      horasvuel = document.getElementById("hsv3").innerHTML;
                      preciotrayecto = document.getElementById("pv3").innerHTML;
                      preciofinal = document.getElementById("pf3").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                      
                      searhUser();
                      ServerConnect();
                      createForm ();
                      
                                            
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });

                    //Si es clica l'opció 4
                    document.getElementById("btreserv4").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai4").innerHTML;
                      diavuelta = document.getElementById("diav4").innerHTML;
                      horasida = document.getElementById("hsi4").innerHTML;
                      horasvuel = document.getElementById("hsv4").innerHTML;
                      preciotrayecto = document.getElementById("pv4").innerHTML;
                      preciofinal = document.getElementById("pf4").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                      
                      searhUser();
                      ServerConnect();
                      createForm ();
                      
                                            
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });
                  }

                }else if (responseServer[4].length === 1 && responseServer[5].length === 1){
                  //Si solo hay una hora de ida y una hora de vuelta

                  if (ida === vuelta && idadia === 6){
                    //Si es el mismo dia y coincide con sabado
                    document.getElementById("tablavuelos").innerHTML = "Hi ha només un vol a les destinacions escollides a la mateixa hora. Disculpa les molèsties";
                  }else{
                    //demas opciones

                    mytable += "<table class='center'><tr>";  
                    mytable += "<th>DIA</th>";
                    mytable += "<th>SORTIDA</th>";
                    mytable += "<th>INFORMACIÓ</th>";
                    mytable += "<th>ARRIBADA</th>";
                    mytable += "<th>TRAJECTE</th>";
                    mytable += "<th>ANADA I TORNADA</th>";
                    mytable += "<th rowspan='5' ><input type='button' class='bttable' id='btreserv1' value='RESERVA'></th>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2' id='diai1'>"+ida+"</td>";
                    mytable += "<td id='hsi1'>"+responseServer[4]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[0]+" minuts</td>";
                    mytable += "<td>"+horaLlegada(responseServer[4],responseServer[0])+"h</td>";
                    mytable += "<td rowspan='4' id='pv1'>"+responseServer[2]+" €</td>";
                    mytable += "<td rowspan='4'id='pf1'>"+responseServer[3]+" €</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td>"+origen+"</td>";
                    mytable += "<td>"+destino+"</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td rowspan='2'id='diav1'>"+vuelta+"</td>";
                    mytable += "<td id='hsv1'>"+responseServer[5]+"h</td>";
                    mytable += "<td rowspan='2'>"+responseServer[1]+" € persona</td>";
                    mytable += "<td>"+horaLlegada(responseServer[5],responseServer[0])+"h</td>";
                    mytable += "</tr>";
                    mytable += "<tr>";
                    mytable += "<td >"+destino+"</td>";
                    mytable += "<td >"+origen+"</td>";
                    mytable += "</tr>";
                    mytable += "</table>";

                    document.getElementById("tablavuelos").innerHTML = mytable;

                   //Si es clica l'opció 1
                    document.getElementById("btreserv1").addEventListener("click", function(){
                      //GUARDAR INFO
                      diaida = document.getElementById("diai1").innerHTML;
                      diavuelta = document.getElementById("diav1").innerHTML;
                      horasida = document.getElementById("hsi1").innerHTML;
                      horasvuel = document.getElementById("hsv1").innerHTML;
                      preciotrayecto = document.getElementById("pv1").innerHTML;
                      preciofinal = document.getElementById("pf1").innerHTML;

                      //DISPLAY FORM
                      document.getElementById("buscador").style.display = "none";
                      document.getElementById("home").style.display = "none";
                      document.getElementById("carregant").style.display = "none";
                      document.getElementById("vuelos").style.display="none";
                      document.getElementById("data").style.display="block";
                      
                      searhUser();
                      ServerConnect();
                      createForm ();
                      
                                            
                      //CHECK VALUES FORM PERSONAL DATA
                      var dni, telf, email;
                      //control errors
                      var errorDNI = true, errorEmail=true, errorTelf=true;

                      //DNI
                      document.getElementById("dnif").addEventListener("blur", function(){
                        dni = document.getElementById("dnif").value;
                        errorDNI = validaDNI(dni);//false -> sin errores

                        if (!errorDNI){
                            document.getElementById("errorDNI").innerHTML="";
                            errorDNI=false;
                        }else { 
                            document.getElementById("errorDNI").innerHTML="DNI no vàlit";
                            document.getElementById("dnif").innerHTML="";
                        };
                        
                      });

                      //TELF
                      document.getElementById("telf").addEventListener("blur", function(){
                        telf = document.getElementById("telf").value;
                        errorTelf = validaTelf(telf);//false -> sin errores

                        if (!errorTelf){
                            document.getElementById("errorTelf").innerHTML="";
                            errorTelf=false;
                        }else { 
                            document.getElementById("errorTelf").innerHTML="Telèfon no valit. Llargaria 9 digits.";
                            document.getElementById("telf").innerHTML="";
                        };
                        
                      });

                        

                      //EMAIL
                      document.getElementById("emailf").addEventListener("blur", function(){
                        email = document.getElementById("emailf").value;
                        errorEmail = validaEmail(email);//false -> sin errores

                        if (!errorEmail){
                            document.getElementById("errorEmail").innerHTML="";
                            errorEmail=false;
                        }else { 
                            document.getElementById("errorEmail").innerHTML="Email no valit";
                            document.getElementById("emailf").innerHTML="";
                        };
                        
                      });

                      //HABILTAR BOTO
                      document.getElementById("emailf").addEventListener("mouseout", function(){
                        if (!errorDNI && !errorTelf && !errorEmail){
                          document.getElementById("btprint").disabled = false;
                        }else{
                          document.getElementById("btprint").disabled = true;
                        };
                      });
                      
                                            
                      //PRINT WINDOW AND SAVE VALUES OF THE FORM
                      document.getElementById('btprint').addEventListener('click', function (){
                        nombre = document.getElementById("namef").value;
                        apellidos = document.getElementById("surnamef").value;

                        PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horasida, horasvuel, diaida, diavuelta);
                      });
                    });
                  }
                  
                }                              
    
            }  
        }
    }; 
}

/**
 * Envia objeto de datos de usuario desde la cookie para obter nombre y apellidos del usuario
 */
function ServerConnect(){
  //enviar aquest objecte al servidor:
  
  let xhr= new XMLHttpRequest();
  xhr.open("POST", "./php/search3.php"); //obrir connexio (2 parametros)
  xhr.send(JSON.stringify(usuari));//enviament de dades: objeto a JSON antes del envio
  xhr.onload=function(){ // esperar a rebre dades
   
      if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
      } else { // muestra el resultado
          //xhr.response en un JSON que viene desde PHP
          let responseServer = JSON.parse(xhr.response);//reconvertirlo/parsearlo
          document.getElementById("namef").value = responseServer[0];
          document.getElementById("surnamef").value = responseServer[1];
        
         }
      }
}; 

//ACABA SERVER
//////////////////////////////////////////////////////////

/**
 * Suma la hora de vuelvo, calcula la hora de llegada.
 * @param string hora de salida
 * @param int tiempo de vuelo
 * @return int calculo de la hora de llegada
 */
function horaLlegada(horaSalida, tiempoVuelo) {

  let calculo = new Date(new Date("1970/01/01 " + horaSalida).getTime() + tiempoVuelo * 60000).toLocaleTimeString("en-UK", {hour: "2-digit", minute: "2-digit", hour12: false});

  return calculo;
}


/**
 * Crea un formulario dinamicamente
 * Formulario de datos personales
 */

function createForm () {

  var br = document.createElement("br");

  var form = document.createElement("form");
  form.setAttribute('method', "post");
  form.setAttribute('class', "container");

  var title = document.createElement("h1");
  title.innerHTML="Dades Personals";
  title.setAttribute('class', "a font-effect-shadow-multiple");


  var labelnam = document.createElement("label");
  labelnam.innerHTML="Nom";
  labelnam.setAttribute('for', "namef");
  labelnam.setAttribute('class', "form-label");
  
  var nameform = document.createElement("input");
  nameform.setAttribute('type', "text");
  nameform.setAttribute('id', "namef");
  nameform.setAttribute('disabled', "disabled");
  nameform.setAttribute('class', "form-control");

  var labelsur = document.createElement("label");
  labelsur.innerHTML="Cognoms";
  labelsur.setAttribute('for', "surnamef");
  labelsur.setAttribute('class', "form-label");

  var surnameform = document.createElement("input");
  surnameform.setAttribute('type', "text");
  surnameform.setAttribute('id', "surnamef");
  surnameform.setAttribute('disabled', "disabled");
  surnameform.setAttribute('class', "form-control");

  var labeldni = document.createElement("label");
  labeldni.innerHTML="DNI";
  labeldni.setAttribute('for', "dnif");
  labeldni.setAttribute('class', "form-label");

  var dniform = document.createElement("input");
  dniform.setAttribute('type', "text");
  dniform.setAttribute('id', "dnif");
  dniform.setAttribute('required', "required");
  dniform.setAttribute('placeholder', "12345678V");
  dniform.setAttribute('class', "form-control");

  errorDNI = document.createElement("div");
  errorDNI.setAttribute('id', "errorDNI");
  errorDNI.setAttribute('class', "danger");

  var labeltelf = document.createElement("label");
  labeltelf.innerHTML="Telèfon";
  labeltelf.setAttribute('for', "telf");
  labeltelf.setAttribute('class', "form-label");

  var telfform = document.createElement("input");
  telfform.setAttribute('type', "tel");
  telfform.setAttribute('id', "telf");
  telfform.setAttribute('required', "required");
  telfform.setAttribute('placeholder', "672347899");
  telfform.setAttribute('pattern', "[0-9]{3} [0-9]{2}[0-9]{2}[0-9]{2}");
  telfform.setAttribute('class', "form-control");

  errorTelf= document.createElement("div");
  errorTelf.setAttribute('id', "errorTelf");
  errorTelf.setAttribute('class', "danger");

  var labelemail = document.createElement("label");
  labelemail.innerHTML="Email";
  labelemail.setAttribute('for', "emailf");
  labelemail.setAttribute('class', "form-label");

  var emailform = document.createElement("input");
  emailform.setAttribute('type', "email");
  emailform.setAttribute('id', "emailf");
  emailform.setAttribute('required', "required");
  emailform.setAttribute('placeholder', "name@domain.cat");
  emailform.setAttribute('class', "form-control");

  errorEmail= document.createElement("div");
  errorEmail.setAttribute('id', "errorEmail");
  errorEmail.setAttribute('class', "danger");
  
  var button = document.createElement("input");
  button.setAttribute('type', "button");
  button.setAttribute('id', "btprint");
  button.setAttribute('disabled', "disabled");
  button.setAttribute('class', "buttonf");
  button.setAttribute('value', "FACTURA");

  form.appendChild(title);
  form.appendChild(labelnam);
  form.appendChild(nameform);
  form.appendChild(labelsur);
  form.appendChild(surnameform);
  form.appendChild(labeldni);
  form.appendChild(dniform);
  form.appendChild(errorDNI);
  form.appendChild(br);
  form.appendChild(labeltelf);
  form.appendChild(telfform);
  form.appendChild(errorTelf);
  form.appendChild(br);
  form.appendChild(labelemail);
  form.appendChild(emailform);
  form.appendChild(errorEmail);
  form.appendChild(br);
  form.appendChild(button);

  document.getElementById("formdata").appendChild(form); 

  

}


//VALIDACION DATOS FORFULARIO DATOS PERSONALES

//FUNCIO COMPROVACIO DNI
/**
 * Comprueba el dni introducido es correcto
 * @param dni strin dni del usuario
 * @return bool si es correcto o no.
 */
function validaDNI(dni){

  result = false;
  //Separem numeros i lletra
  var lletraDNI = dni.substring(8, 9).toUpperCase();
  var numDNI = parseInt(dni.substring(0, 8));

  //Calcul lletra
  var lletras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
  var lletraCorrecta = lletras[numDNI % 23];

  //Comprobació llaragaria
  if (dni.length >= 10){
    return true;
  }else if (dni.length < 9){
    return true;
  };

  //Comprovació lletra
  if (lletraDNI != lletraCorrecta){
    return true;
  }else if (lletraDNI === lletraCorrecta){
    return false;
  };

}

//FUNCIO COMPROVACIO TELEFON
/**
 * Compruba si el telefono tiene la mediada indicada
 * @param int numero de telefono
 * @return bool si esta bien o no
 */

function validaTelf(telf) {

  if (telf.length  === 9){
    return false;
  }else if (telf.length < 9){
    return true;
  }else if (telf.length > 9){
    return true;
  }
}

//FUNCIÓ COMPROVAR MAIL
/**
 * Comprobar mail si el dominio y el servidor son correctos
 * @param string email usuario
 * @return bool si esta bien o no
 */

function validaEmail(emailf) {

  email = emailf.normalize("NFD"). replace(/[\u0300-\u036f]/g, "");
  email = emailf.toLowerCase();

  var namee = email.substring(0, email.lastIndexOf("@"));
  var server = email.substring(0, email.lastIndexOf("@") + 1, email.lastIndexOf("."));
  var server2 = email.substring(email.lastIndexOf("@") + 1);
  var domain = email.substring(email.lastIndexOf(".") + 1);

  if (email.includes('@')){
    if (server.length < 3) {
      return true;
    }

    if (!server2.includes('.')){
      return true;
    }

    if (domain.length < 3){
      return true;
    }else if (domain.length > 6){
      return true;
    }else{
      return false;
    }

  }else {
    return true;
  }
  
};


/**
 * A partir de la cookie establecida en el log in se guarda el usuario en una variable
 * para mandarla al servidor o te redirige a la pagina principal si no estas loggeado.
 */

function searhUser() {
  let usuario= getCookie("user");
  if (usuario != "") {
    usuari = usuario;
  } else {
    alert("Has de fer login primer!.");
    window.open("index.html", "_self");
    
  }
};


/**
 * Funcion para redirigir a una pagina nueva la factura de todos los datos recopilados escogidos has ahora.
 * @param string noombre usuario
 * @param string apellidos usuario
 * @param string email usuario
 * @param int telefono usuario
 * @param string dni usario
 * @param string localizacion origen elegido
 * @param string localizacion destino elegido
 * @param int numero de pasajero introducido
 * @param int precio calculado por trayecto y pasajeros
 * @param int precio calculado finall ida y vuelta.
 * @param string valor celda hora de ida
 * @param string valor celda hora de vuelta
 * @param date valor celda dia de ida
 * @param date valor celda dia de vuelta
 */

function PrintElem(nombre,apellidos,email, telf, dni, origen, destino, pasajeros, preciotrayecto, preciofinal, horaida, horavuelta, diaida, divuelta) {
  var mywindow = window.open('', 'PRINT');
  mywindow.document.write('<html><head><title>AIRPROVEN</title></head>');
  mywindow.document.write('<style>table, th, td{border: 1px solid black; border-collapse: collapse; padding: 10px;}');
  mywindow.document.write('td{text-align: center;}');
  mywindow.document.write('.grid-container {display: grid;grid-template-columns: 1fr 1fr;grid-gap: 20px;}');
  mywindow.document.write('.center { margin-left: auto; margin-right: auto;}');
  mywindow.document.write('.container {position: relative;}');
  mywindow.document.write('.centerbutton { margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); }');
  mywindow.document.write('.total { text-align: right;}');
  mywindow.document.write('.image { margin-left: auto; margin-right: auto; display: block; width: 40%; height: 10% border: 1px solid black; border-radius: 4px; padding: 5px;}');
  mywindow.document.write('</style>');
  mywindow.document.write('<body><h1>FACTURA AIRPROVEN</h1>');
  mywindow.document.write('<div class="grid-container">');
  mywindow.document.write('<div><fieldset><legend>CONTACTE CLIENT</legend><p>'+nombre+' '+apellidos +'<br>'+email+'<br>'+telf +'<br>'+dni+'</p></fieldset></div>');
  mywindow.document.write('<div><fieldset><legend>CONTACTE EMPRESA</legend><p>934578910<br>airproven@provençana.cat <br> Carrer de la Ciència, 2H <br> 08840 Viladecans, Barcelona</p></fieldset></div>');
  mywindow.document.write('</div>');
  mywindow.document.write('<br>');
  mywindow.document.write('<table class="center">');
  mywindow.document.write('<tr><th> DIA</th><th>TRAJECTE</th><th>HORA</th><th>PASATJERS</th><th>PREU</th><th>VOL</th></tr>');
  mywindow.document.write('<tr><td>'+ diaida +'</td><td>'+origen+' - '+destino+'</td><td>'+horaida+'</td><td>'+pasajeros+'</td><td>'+preciotrayecto+'</td><td>EZS1012</td></tr>');
  mywindow.document.write('<tr><td>'+ divuelta +'</td><td>'+destino+' - '+origen+'</td><td>'+horavuelta+'</td><td>'+pasajeros+'</td><td>'+preciotrayecto+'</td><td>BA2490</td></tr>');
  mywindow.document.write('<tr><td colspan="5" class="total"><b>TOTAL '+ preciofinal+'</b></td></tr></table>');
  mywindow.document.write('<br>');
  mywindow.document.write('<div class="container">');
  mywindow.document.write('<div class="centerbutton">');
  mywindow.document.write('<button onclick="window.print()">IMPRIMIR</button>');
  mywindow.document.write('</div></div>');
  mywindow.document.write('<br><br>');
  mywindow.document.write('<img class="image" src="./img/codigobarras.jpg">');
  mywindow.document.write('</body></html>');
  
}


