<?php

/**
 * Andrea Morales Mata
 * Programa que comprueba si el usuario en el registro ya esta pillado si no registrar el usuario en la base de datos.
 * Mensaje si ha ido correcto pudiendo hacer login.
 */


use proven\user as us;
//include function library file.
include "lib/fn_user.php";

// recoger las peticiones
$entrada = file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable PHP
$entrada = json_decode($entrada);

//asociar objecto 
$username = $entrada->{'usr'};
$password = $entrada->{'pass'};
$name = $entrada->{'name'};
$surname = $entrada->{'surname'};
// todos los nuevos usuarios son clientes
$rol = $entrada->{'rol'};

/**
 * Adds to a database a string.
 * @param string valid username
 * @param string valid password
 * @param string rol (standard client)
 * @param string $name
 * @param string $surname
 */
    
function addData (string $usr, string $pass, string $rol, string $name, string $surname){
    $filepath = './files/database.txt';
    $formatdata = $usr . ":" . $pass . ":" . $rol . ":". $name . ":" . $surname . "\n";
    file_put_contents($filepath,$formatdata,FILE_APPEND);
}; 


$exists = us\searchUser($username);

$response = "Usuari agafat proba un altre!";
if (!$exists){
    $added= addData($username,$password,$rol,$name,$surname);
    if ($added == false){
        $response = "Usuari no agregat, el fitxer no te permissos";
    }
    $response = "Registre complet! Ja pots fer login.";
}

//envio de resultado imprimiendolo: variable PHP a JSON
echo json_encode($response);
