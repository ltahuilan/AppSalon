<?php

//conectando con la base de datos
$bd = mysqli_connect('localhost', 'root', 'root', 'appsalon');

if(!$bd) {
    echo 'ERROR en la conexión...';
    exit;
}

// echo 'Conxión correcta...';
?>