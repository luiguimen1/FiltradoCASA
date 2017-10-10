<?php
/**
 * Pagina que permite obtener una cadena de 
 * JSON, para llevar los campos de 
 * SelectCiudad y SelectTipo
 * sinq ue se repitan criterios. 
 */
$file = fopen("./../data-1.json", "r");

$contenido = fread($file, filesize("../data-1.json"));
$contenido = json_decode($contenido);
$listaCasa = array();
$limite = sizeof($contenido);
$filtro = $_POST["elem"];
for ($i = 0; $i < $limite; $i++) {
    $casa = $contenido[$i];
    $obj = (object) array("$filtro" => $casa->$filtro);
    if (!in_array($obj , $listaCasa) == 1) {
        $listaCasa[sizeof($listaCasa)] = $obj; 
    }
}
echo json_encode($listaCasa);
fclose($file);