<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if($_POST){
$file = fopen("./../data-1.json", "r");
$contenido = fread($file, filesize("../data-1.json"));
$contenido = json_decode($contenido);
$obFiltro = json_decode(json_encode($_POST));
$obFiltro->Precio = split(";", $obFiltro->Precio);
$limite = sizeof($contenido);
$resultado = array();
for ($i = 0; $i < $limite; $i++) {
    $casa = $contenido[$i];
    $casa->Precio = str_replace("$", "", $casa->Precio);
    $casa->Precio = str_replace(",", "", $casa->Precio);
    $casa->Precio = intval($casa->Precio);
    if (($casa->Precio >= $obFiltro->Precio[0] ) && $casa->Precio <= $obFiltro->Precio[1]) {
        if ($obFiltro->selectCiudad == "" && $obFiltro->selectTipo == "") {
            $resultado[] = $casa;
        }else if($obFiltro->selectCiudad != "" && $obFiltro->selectTipo == "" ){
            if($obFiltro->selectCiudad == $casa->Ciudad ){
                $resultado[] = $casa;
            }
        }else if($obFiltro->selectCiudad == "" && $obFiltro->selectTipo != "" ){
            if($obFiltro->selectTipo == $casa->Tipo ){
                $resultado[] = $casa;
            }
        }else {
            if($obFiltro->selectTipo == $casa->Tipo && $obFiltro->selectCiudad == $casa->Ciudad ){
                $resultado[] = $casa;
            }
        }
    }
}
echo json_encode($resultado);
fclose($file);
}else{
    header("location:../");
}