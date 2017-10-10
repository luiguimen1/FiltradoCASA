<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$file = fopen("./../data-1.json", "r");
$contenido = fread($file, filesize("../data-1.json"));
$contenido = json_decode($contenido);
echo json_encode($contenido);
fclose($file);