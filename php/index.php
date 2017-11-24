<?php
include ('../html/header.html');
include ('../php/database.php');
//include ('../html/login.html');

$db = new DataBase('..\database\todo.db');
//$db->addUser('timon', 'hakunamatata');
if($db->checkLogin('nao', 'existe') == FALSE)
  echo "User not found\n";
$db->checkLogin('timon', 'hakunamatata');

include ('../html/footer.html');
?>
