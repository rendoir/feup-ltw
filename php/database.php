<?php

/*
  This file is responsible for the database connection, querying and updating.
*/

  class DataBase {
    private $db;

    public function __construct($path) {
      try {
        $pdo_path = 'sqlite:' . $path;
        $this->db = new PDO($pdo_path);
      } catch (PDOException $e) {
        die($e->getMessage());
      }
    }

    public function checkLogin($username, $password) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM User
                                  WHERE username == ? AND password == ?;');
      $stmt->execute(array($username, $password));
      return $stmt->fetch() != FALSE;
    }

    public function addUser($username, $password) {
      $stmt = $this->db->prepare('INSERT INTO User (username, password)
                                  VALUES (?, ?);');
      $stmt->execute(array($username, $password));
    }

    public function getUserProjects($username) {
      $stmt = $this->db->prepare('SELECT title
                                  FROM Contributes
                                  WHERE username == ?;');
      $stmt->execute(array($username));
      return $stmt->fetchAll();
    }

    public function getToDoListsOfProject($project) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM TodoList
                                  WHERE project == ?;');
      $stmt->execute(array($project));
      return $stmt->fetchAll();
    }

    public function getListItemsOfList($todo_list) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM ListItem
                                  WHERE todo_list == ?;');
      $stmt->execute(array($todo_list));
      return $stmt->fetchAll();
    }

    public function getListItemsAssignedToUser($user) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM ListItem
                                  WHERE user == ?;');
      $stmt->execute(array($user));
      return $stmt->fetchAll();
    }

    public function addProject($project) {
      $stmt = $this->db->prepare('INSERT INTO Project (title)
                                  VALUES (?);');
      $stmt->execute(array($project));
    }

    public function addUserToProject($user, $project) {
      $stmt = $this->db->prepare('INSERT INTO Contributes (user, project)
                                  VALUES (?, ?);');
      $stmt->execute(array($user, $project));
    }

    public function addToDoList($title, $project, $category, $color) {
      $stmt = $this->db->prepare('INSERT INTO TodoList (title, category, color, project)
                                  VALUES (?, ?, ?, ?);');
      $stmt->execute(array($title, $category, $color, $project));
    }

    public function addListItem($task, $due_date, $color, $todo_list) {
      $stmt = $this->db->prepare('INSERT INTO ListItem (task, due_date, color, todo_list)
                                  VALUES (?, ?, ?, ?);');
      $stmt->execute(array($task, $due_date, $color, $todo_list));
    }

    public function assignListItemToUser($item, $user) {
      $stmt = $this->db->prepare('UPDATE ListItem
                                  SET user = ?
                                  WHERE item_id == ?;');
      $stmt->execute(array($user, $item));
    }

    public function completedListItem($item) {
      $stmt = $this->db->prepare('UPDATE ListItem
                                  SET is_completed = 1
                                  WHERE item_id == ?;');
      $stmt->execute(array($item));
    }
  }
  
?>
