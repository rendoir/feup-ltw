<?php
  define("ROOT", $_SERVER["DOCUMENT_ROOT"]);

  include_once('php/session.php');
  include_once('php/database.php');
?>


<!DOCTYPE html>
<html>
  <head>
    <title>ListIt</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed" rel="stylesheet">
  </head>
  <body>

    <header>
      <img src="images/check.svg">

      <section id="user">
        <input type="button" class="login" value="Login">
        <input type="button" class="register" value="Register">
        <section id="login">
           <form action="action_login.php" method="post">
             <input type="text" placeholder="username" name="username">
             <input type="password" placeholder="password" name="password">
             <input type="submit" value="Login">
           </form>
         </section>
         <section id="register">
            <form action="action_register.php" method="post">
              <input type="text" placeholder="username" name="username">
              <input type="password" placeholder="password" name="password">
              <input type="submit" value="Register">
            </form>
          </section>
        </section>

        <label id="description"> Organize yourself </label>
    </header>


    <footer>
      &copy 2017; Daniel Marques - Daniel Machado - Sofia Alves
    <footer>

  </body>
</html>
