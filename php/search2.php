<?php

/**
 * Andrea Morales Mata
 * Programa que te devuelve en un array toda la informacion necesaria para desplegarte vuelos y precios disponibles.
 */


// recoger las peticiones
$entrada = file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable PHP
$entrada = json_decode($entrada);


//asociar objecto 
$origen = $entrada->{'origin'};
$destino = $entrada->{'desti'};
$ida = $entrada->{'anada'};
$vuelta = $entrada->{'tornada'};
$pasajeros = $entrada->{'passatgers'};

//arrays con la info 
$dias = [
    1 => ["08:00", "17:00"],
    2 => [],
    3 => [],
    4 => [],
    5 => ["07:00", "19:30"],
    6 => ["14:00"],
    0 => []
];

$trayectos =[ 
    "Barcelona" => ["Madrid"    => ["temps" => 67,"preu" => 55],
                    "València"  => ["temps" => 57,"preu" => 40]],
    "Madrid"    => ["Barcelona" => ["temps" => 67,"preu" => 55],
                    "València"  => ["temps" => 52,"preu" => 35]],
    "València"  => ["Madrid"    => ["temps" => 52,"preu" => 35],
                    "Barcelona" => ["temps" => 57,"preu" => 40]]
];


//devolver tiiempo y precio trayecto
if (array_key_exists($origen, $trayectos)){
    $temps = $trayectos[$origen][$destino]['temps'];
    $preu = $trayectos[$origen][$destino]['preu'];
};


//devolver precio tatal de viaje y precio por trayecto
if (array_key_exists($origen, $trayectos)){
    $preu_total_viaje = $trayectos[$origen][$destino]["preu"]* $pasajeros;
    $preu_total_ida_vuelta = $preu_total_viaje * 2;
};


//si existe el dia de ida devuelve las horas diponibles, puede devolver array vacio
if (array_key_exists($ida, $dias)){
    $horasida = $dias[$ida];
}


//si existe el dia de vuelta devuelve las horas diponibles, puede devolver array vacio
if (array_key_exists($vuelta, $dias)){
    $horasvuelta = $dias[$vuelta];
}


//devolver toda la informacion en un unico array
$response = array();
array_push($response, $temps, $preu, $preu_total_viaje,$preu_total_ida_vuelta, $horasida, $horasvuelta);


// //envio de resultado imprimiendolo: variable PHP a JSON
echo json_encode($response);
