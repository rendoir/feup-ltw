<?php

/*
  This file is responsible for the database connection, querying and updating.
*/

  class DataBase {
    private static $db = null;

    public static function init() {
      if(self::$db == null) {
        try {
          self::$db = new PDO('sqlite:' . ROOT . '/sqlite/todo.db');
          self::$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
          die($e->getMessage());
        }
      }
    }

    public static function checkLogin($username, $password) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM User
                                  WHERE username == ? AND password == ?;');
      if(!$stmt)
        return false;
      if($stmt->execute(array($username, $password)))
        return $stmt->fetch() != false;
      return false;
    }

    public static function addUser($username, $password, $email, $name) {
      $stmt = self::$db->prepare('INSERT INTO User (username, password, email, name)
                                  VALUES (?, ?, ?, ?);');
      if(!$stmt)
        return false;
      return $stmt->execute(array($username, $password, $email, $name));
    }

    public static function getUserProjects($username) {
      $stmt = self::$db->prepare('SELECT project, project_manager
                                  FROM Contributes, Project
                                  WHERE project == title AND user == ?;');
      if($stmt->execute(array($username)))
        return $stmt->fetchAll();
      return null;
    }

    public static function getToDoListsOfProject($project) {
      $stmt = self::$db->prepare('SELECT title, category, color
                                  FROM TodoList
                                  WHERE project == ?;');
      if($stmt->execute(array($project)))
        return $stmt->fetchAll();
      return null;
    }

    public static function getListItemsOfList($project, $todo) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return null;
      $stmt = self::$db->prepare('SELECT task, is_completed, due_date, user
                                  FROM ListItem
                                  WHERE todo_list == ?;');
      if($stmt->execute(array($todo_id)))
        return $stmt->fetchAll();
      return null;
    }

    public static function getTodoID($project, $todo) {
      $stmt = self::$db->prepare('SELECT list_id
                                  FROM TodoList
                                  WHERE project == ? AND title == ?;');
      if($stmt->execute(array($project, $todo)))
        return $stmt->fetch()["list_id"];
      return null;
    }

    public static function getListItemsAssignedToUser($user) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM ListItem
                                  WHERE user == ?;');
      if($stmt->execute(array($user)))
        return $stmt->fetchAll();
      return null;
    }

    public static function addProject($project, $user) {
      $stmt = self::$db->prepare('INSERT INTO Project (title, project_manager)
                                  VALUES (?, ?);');
      if(!$stmt)
        return false;
      $result = $stmt->execute(array($project, $user));
      if(!$result)
        $result = self::addUserToProject($user, $project);
      return $result;
    }

    public static function addUserToProject($user, $project) {
      $stmt = self::$db->prepare('INSERT INTO Contributes (user, project)
                                  VALUES (?, ?);');
      if(!$stmt)
        return $stmt->execute(array($user, $project));
      return false;
    }

    public static function addToDoList($title, $project, $category, $color) {
      $stmt = self::$db->prepare('INSERT INTO TodoList (title, category, color, project)
                                  VALUES (?, ?, ?, ?);');
      return $stmt->execute(array($title, $category, $color, $project));
    }

    public static function addListItem($task, $due_date, $todo, $project) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return false;
      $stmt = self::$db->prepare('INSERT INTO ListItem (task, due_date, todo_list)
                                  VALUES (?, ?, ?);');
      return $stmt->execute(array($task, $due_date, $todo_id));
    }

    public static function assignListItemToUser($item, $user) {
      $stmt = self::$db->prepare('UPDATE ListItem
                                  SET user = ?
                                  WHERE item_id == ?;');
      return $stmt->execute(array($user, $item));
    }

    public static function setCompletedListItem($task, $todo, $project, $completed) {
      $todo_id = DataBase::getTodoID($project, $todo);
      $stmt = self::$db->prepare('UPDATE ListItem
                                  SET is_completed = ?
                                  WHERE todo_list == ? AND task == ?;');
      return $stmt->execute(array($completed, $todo_id, $task));
    }

    public static function deleteProject($project) {
      $stmt = self::$db->prepare('DELETE FROM Project
                                  WHERE title == ?;');
      if($stmt)
        return $stmt->execute(array($project));
      return false;
    }
  }

  DataBase::init();
?>
