<?php

/**
 * Andrea Morales Mata
 * Gracias por el usuario guardado en la cookie buscamos el nombre y los apellidos en la base de datos para poderlos mostar en el formulario.
 */

use proven\user as us;
//include function library file.
include "lib/fn_user.php";

// recoger las peticiones
$entrada = file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable PHP
$entrada = json_decode($entrada);

//asociar objecto 
$username = $entrada;


//buscar su nombre y apellidos en la base de datos

$database= us\searchUser($username);



$nombre = $database[3];
$apellidos = $database[4];

//array con nombre completo
$nombreCompleto= array();
array_push($nombreCompleto, $nombre, $apellidos);




//envio de resultado imprimiendolo: variable PHP a JSON
echo json_encode($nombreCompleto);
