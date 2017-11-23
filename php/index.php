<?php
include ('../html/header.html');
include ('../php/database.php');
include ('../html/login.html');

$db = new DataBase('../database/todo.db');
//$db->checkLogin('nao', 'existe');
$db->checkLogin('timon', 'hakunamatata');

include ('../html/footer.html');
?>
