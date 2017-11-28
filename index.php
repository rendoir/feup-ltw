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
    <script src="javascript/ui_index.js" defer></script>
  </head>
  <body>

    <header>
      <section id="logo">
        <img src="images/check.svg">
        <label id="description"> Organize yourself </label>
      </section>


      <section id="user">
        <input type="button" id="change_to_login" value="Login">
        <input type="button" id="change_to_register" value="Register">
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

    </header>


    <footer>
      &copy 2017; Daniel Machado - Daniel Marques - Sofia Alves
    <footer>

  </body>
</html>
