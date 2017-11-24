<!DOCTYPE html>
<html>
  <head>
    <title>ListIt</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Oxygen:700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed" rel="stylesheet">
  </head>
  <body>

    <header>
      <div id="info">
        <img src="images/check.svg">
        <h1><a href="index.php">List It</a></h1>
      <!--  <a href="list_cart.php"><i class="fa fa-shopping-cart"></i>(0)</a>-->
      </div>
     <div id="user">
        <form action="action_login.php" method="post">
          <input type="text" placeholder="username" name="username">
          <input type="password" placeholder="password" name="password">
          <div>
            <input type="submit" value="Login">
            <a href="register.php">Register</a>
          </div>
        </form>
      </div>
    </header>

    <form id="space">
      <label> Organize yourself </label>
    </form>

    <form id="login" method="post" action="../php/login.php">
      <label>Username: <input id="username" name="username" type="text" value="Username" autofocus></label>
      <label>Password: <input id="password" name="password" type="password" value="Password"></label>
      <label>Sign in <input id="signin" type="submit" value="Sign In"></label>
      <label>Sign up <input id="signup" type="submit" value="Sign Up"></label>
    </form>

    <table id="lists">
      <tr><th>New To-Do List</th><th>Add Items </th><th>Delete To-Do List</th></tr>
    </table>

    <footer>
      <label> &copy; Daniel Marques - Daniel Machado - Sofia Alves </label>

    <footer>

  </body>
</html>
