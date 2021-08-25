<?php 

function consultaServicios () {

    try {
        
        /**Importar una conexión a la BD */
        require 'databases.php';
        $bd ->set_charset("utf8");
        // mysqli_set_charset($bd, "utf8");

        /**Sentencias SQL */
        $sql = 'SELECT * FROM servicios;';

        $query = mysqli_query($bd, $sql);
        
        /**arreglo vacío */
        $servicios = [];

        /**RESULTADOS
         * Mientras en $row se almacene algo.... */
        $i = 0;
        while($row = mysqli_fetch_assoc($query)) {
            $servicios[$i]['id'] = $row['id'];
            $servicios[$i]['nombre'] = $row['nombre'];
            $servicios[$i]['precio'] = $row['precio'];

            $i++;
        };

    // echo "<pre>";
    // var_dump($servicios);
    // echo "</pre>";

    return $servicios;
        
    } catch (\Throwable $th) {
        //throw $th;
    }
};

consultaServicios();


?>