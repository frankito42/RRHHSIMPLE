<?php
session_start();
require "../conn/conn.php";

    $sqlTraerMotivoEmple="SELECT `idAsis`, `motivo`,empleados FROM `asisemple`
     WHERE idAsis=:id AND `motivo`=:motivo";
    $traer=$conn->prepare($sqlTraerMotivoEmple);
    $traer->bindParam(":id",$_GET['id']);
    $traer->bindParam(":motivo",$_GET['motivo']);
    $traer->execute();
    $traer=$traer->fetch(PDO::FETCH_ASSOC);

/* $_SESSION['ultimoHCD']=$traer; */
echo json_encode($traer);

?>