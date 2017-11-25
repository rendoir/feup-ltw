<?php

/*
  This file is responsible for the database connection, querying and updating.
*/

  class DataBase {
    private static $db = NULL;

    public static function init() {
      try {
        self::$db = new PDO('sqlite:sqlite/todo.db');
      } catch (PDOException $e) {
        die($e->getMessage());
      }
    }

    public static function checkLogin($username, $password) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM User
                                  WHERE username == ? AND password == ?;');
      $stmt->execute(array($username, $password));
      return $stmt->fetch() != FALSE;
    }

    public static function addUser($username, $password) {
      $stmt = $this->db->prepare('INSERT INTO User (username, password)
                                  VALUES (?, ?);');
      $stmt->execute(array($username, $password));
    }

    public static function getUserProjects($username) {
      $stmt = $this->db->prepare('SELECT title
                                  FROM Contributes
                                  WHERE username == ?;');
      $stmt->execute(array($username));
      return $stmt->fetchAll();
    }

    public static function getToDoListsOfProject($project) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM TodoList
                                  WHERE project == ?;');
      $stmt->execute(array($project));
      return $stmt->fetchAll();
    }

    public static function getListItemsOfList($todo_list) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM ListItem
                                  WHERE todo_list == ?;');
      $stmt->execute(array($todo_list));
      return $stmt->fetchAll();
    }

    public static function getListItemsAssignedToUser($user) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM ListItem
                                  WHERE user == ?;');
      $stmt->execute(array($user));
      return $stmt->fetchAll();
    }

    public static function addProject($project) {
      $stmt = $this->db->prepare('INSERT INTO Project (title)
                                  VALUES (?);');
      $stmt->execute(array($project));
    }

    public static function addUserToProject($user, $project) {
      $stmt = $this->db->prepare('INSERT INTO Contributes (user, project)
                                  VALUES (?, ?);');
      $stmt->execute(array($user, $project));
    }

    public static function addToDoList($title, $project, $category, $color) {
      $stmt = $this->db->prepare('INSERT INTO TodoList (title, category, color, project)
                                  VALUES (?, ?, ?, ?);');
      $stmt->execute(array($title, $category, $color, $project));
    }

    public static function addListItem($task, $due_date, $color, $todo_list) {
      $stmt = $this->db->prepare('INSERT INTO ListItem (task, due_date, color, todo_list)
                                  VALUES (?, ?, ?, ?);');
      $stmt->execute(array($task, $due_date, $color, $todo_list));
    }

    public static function assignListItemToUser($item, $user) {
      $stmt = $this->db->prepare('UPDATE ListItem
                                  SET user = ?
                                  WHERE item_id == ?;');
      $stmt->execute(array($user, $item));
    }

    public static function completedListItem($item) {
      $stmt = $this->db->prepare('UPDATE ListItem
                                  SET is_completed = 1
                                  WHERE item_id == ?;');
      $stmt->execute(array($item));
    }
  }

  DataBase::init();
?>
