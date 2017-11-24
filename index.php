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


    <section id="categories">
      <h2>Categories</h2>
      <ul>
        <li><a href="?cat_id=1">Projects</a></li>
        <li><a href="?cat_id=2">Calendar</a></li>
        <li><a href="?cat_id=3">Search</a></li>
      </ul>
    </section>

    <section id="products">
      <article>
        <h2>To Do List</h2>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros turpis, interdum at ligula sed, egestas consectetur libero. Mauris cursus eros et vehicula tincidunt. Nunc a dictum nulla. Phasellus non magna condimentum, malesuada sem id, consectetur ipsum. Vivamus porta lectus sit amet semper suscipit. Nunc scelerisque rhoncus gravida. </p>
        <img src="images/plus.png">
        <p class="date">24-11-2017</p>
        <a href="action_add_to_cart.php?id=1">Add</a>
      </article>
      <article>
        <h2>To Do List</h2>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros turpis, interdum at ligula sed, egestas consectetur libero. Mauris cursus eros et vehicula tincidunt. Nunc a dictum nulla. Phasellus non magna condimentum, malesuada sem id, consectetur ipsum. Vivamus porta lectus sit amet semper suscipit. Nunc scelerisque rhoncus gravida. </p>
        <img src="images/plus.png">
        <p class="date">24-11-2017</p>
        <a href="action_add_to_cart.php?id=1">Add</a>
      </article>
      <article>
        <h2>To Do List</h2>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros turpis, interdum at ligula sed, egestas consectetur libero. Mauris cursus eros et vehicula tincidunt. Nunc a dictum nulla. Phasellus non magna condimentum, malesuada sem id, consectetur ipsum. Vivamus porta lectus sit amet semper suscipit. Nunc scelerisque rhoncus gravida. </p>
        <img src="images/plus.png">
        <p class="date">24-11-2017</p>
        <a href="action_add_to_cart.php?id=1">Add</a>
      </article>
      <article>
        <h2>To Do List</h2>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros turpis, interdum at ligula sed, egestas consectetur libero. Mauris cursus eros et vehicula tincidunt. Nunc a dictum nulla. Phasellus non magna condimentum, malesuada sem id, consectetur ipsum. Vivamus porta lectus sit amet semper suscipit. Nunc scelerisque rhoncus gravida. </p>
        <img src="images/plus.png">
        <p class="date">24-11-2017</p>
        <a href="action_add_to_cart.php?id=1">Add</a>
      </article>
      <article>
        <h2>To Do List</h2>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros turpis, interdum at ligula sed, egestas consectetur libero. Mauris cursus eros et vehicula tincidunt. Nunc a dictum nulla. Phasellus non magna condimentum, malesuada sem id, consectetur ipsum. Vivamus porta lectus sit amet semper suscipit. Nunc scelerisque rhoncus gravida. </p>
        <img src="images/plus.png">
        <p class="date">24-11-2017</p>
        <a href="action_add_to_cart.php?id=1">Add</a>
      </article>
      <article>
        <h2>To Do List</h2>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros turpis, interdum at ligula sed, egestas consectetur libero. Mauris cursus eros et vehicula tincidunt. Nunc a dictum nulla. Phasellus non magna condimentum, malesuada sem id, consectetur ipsum. Vivamus porta lectus sit amet semper suscipit. Nunc scelerisque rhoncus gravida. </p>
        <img src="images/plus.png">
        <p class="date">24-11-2017</p>
        <a href="action_add_to_cart.php?id=1">Add</a>
      </article>
    </section>


    <footer>
      &copy; Daniel Marques - Daniel Machado - Sofia Alves
    <footer>

  </body>
</html>
