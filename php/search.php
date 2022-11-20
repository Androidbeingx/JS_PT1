<?php

/**
 * Andrea Morales Mata
 * Programa que te devuelve todas las ciudades disponibles en un selctor.
 */


// recoger las peticiones
$entrada = file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable PHP
$entrada = json_decode($entrada);

//array con ciudades para hacer un selector dinamico
$destinos= ["Barcelona", "Madrid", "València"];

//envio de resultado imprimiendolo: variable PHP a JSON
echo json_encode($destinos);
