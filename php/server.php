<?php

/**
 * Andrea Morales Mata
 * Programa que dadoo un usuario y una contraseña lo compruba en una base de datos
 * Resultado rol y acceso a la web si existe y las credeciales son correctas
 * Mensaje error si las credenciales son incorrectas o no existe el usuario.
 */

use proven\user as us;
//include function library file.
include "lib/fn_user.php";

// recoger las peticiones
$entrada = file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable PHP
$entrada = json_decode($entrada);

//asociar objecto 
$username = $entrada->{'usuari'};
$password = $entrada->{'contrasenya'};


/**
 * Checks in a txt if exists
 * @param string usr given by user passed by javascript
 * @param string pass given by user passed by javascript
 * @return string rol if exixst, error message if not exists.
 */

function checkLogin (string $username, string $password): string {
    
    
    $database = us\searchUser($username);
  
    if (count($database) !== 0){
        if ($database[1] === $password){
            $result = $database[2];

        }else{
            $result = "Credencials incorrectes";
        };
    };    
    return $result;
 };


//envio de resultado imprimiendolo: variable PHP a JSON
echo json_encode(checkLogin($username, $password));
