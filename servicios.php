<?php

include 'includes/funciones.php';

$servicios = consultaServicios();

// echo "<pre>";
// var_dump($servicios);
// echo "</pre>";

echo json_encode($servicios);

?>