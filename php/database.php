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
          self::$db->exec('PRAGMA foreign_keys = ON;');
        } catch (PDOException $e) {
          die($e->getMessage());
        }
      }
    }

    public static function userExists($username) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM User
                                  WHERE username == ?;');
      if(!$stmt)
        return false;
      if($stmt->execute(array($username)))
        return $stmt->fetch() !== false;
      return false;
    }


    public static function checkLogin($username, $password) {
      $stmt = self::$db->prepare('SELECT password
                                  FROM User
                                  WHERE username == ?;');
      if(!$stmt)
        return false;
      if($stmt->execute(array($username))) {
        $result = $stmt->fetch();
        if(!$result)
          return false;
        return password_verify($password, $result["password"]);
      }
      return false;
    }

    public static function addUser($username, $password, $email, $name, $birth_date) {
      $stmt = self::$db->prepare('INSERT INTO User (username, password, email, name, birth_date)
                                  VALUES (?, ?, ?, ?, ?);');
      if(!$stmt)
        return false;
      $hashed_password = password_hash($password, PASSWORD_DEFAULT);
      return $stmt->execute(array($username, $hashed_password, $email, $name, $birth_date));
    }

    public static function getUserProjects($username) {
      $stmt = self::$db->prepare('SELECT project, project_manager
                                  FROM Contributes, Project
                                  WHERE project == title AND user == ?;');
      if(!$stmt)
        return false;
      if($stmt->execute(array($username)))
        return $stmt->fetchAll();
      return null;
    }

    public static function getToDoListsOfProject($project) {
      $stmt = self::$db->prepare('SELECT title, category, color
                                  FROM TodoList
                                  WHERE project == ?;');
      if(!$stmt)
        return false;
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
      if(!$stmt)
        return false;
      if($stmt->execute(array($todo_id)))
        return $stmt->fetchAll();
      return null;
    }

    public static function getTodoID($project, $todo) {
      $stmt = self::$db->prepare('SELECT list_id
                                  FROM TodoList
                                  WHERE project == ? AND title == ?;');
      if(!$stmt)
        return false;
      if($stmt->execute(array($project, $todo)))
        return $stmt->fetch()["list_id"];
      return null;
    }

    public static function getListItemsAssignedToUser($user) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM ListItem
                                  WHERE user == ?;');
      if(!$stmt)
        return false;
      if($stmt->execute(array($user)))
        return $stmt->fetchAll();
      return null;
    }

    public  static function getUserInfo($username){
      $stmt = self::$db->prepare('SELECT name, email, birth_date, image
                                  FROM User
                                  WHERE username == ?;');
      if(!$stmt)
        return false;
      if($stmt->execute([$username]))
        return $stmt->fetch();
      return null;
    }

    public static function addProject($project, $user) {
      $stmt = self::$db->prepare('INSERT INTO Project (title, project_manager)
                                  VALUES (?, ?);');
      if(!$stmt)
        return false;
      if(!$stmt->execute(array($project, $user)))
        return false;
      return self::addUserToProject($user, $project);
    }

    public static function addUserToProject($user, $project) {
      $stmt = self::$db->prepare('INSERT INTO Contributes (user, project)
                                  VALUES (?, ?);');
      if(!$stmt)
        return false;
      return $stmt->execute(array($user, $project));
    }

    public static function addToDoList($title, $project, $category, $color) {
      $stmt = self::$db->prepare('INSERT INTO TodoList (title, category, color, project)
                                  VALUES (?, ?, ?, ?);');
      if(!$stmt)
        return false;
      return $stmt->execute(array($title, $category, $color, $project));
    }

    public static function addListItem($task, $due_date, $todo, $project) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return false;
      $stmt = self::$db->prepare('INSERT INTO ListItem (task, due_date, todo_list)
                                  VALUES (?, ?, ?);');
      if(!$stmt)
        return false;
      return $stmt->execute(array($task, $due_date, $todo_id));
    }

    public static function assignListItemToUser($item, $user) {
      $stmt = self::$db->prepare('UPDATE ListItem
                                  SET user = ?
                                  WHERE item_id == ?;');
      if(!$stmt)
        return false;
      return $stmt->execute(array($user, $item));
    }

    public static function setCompletedListItem($task, $todo, $project, $completed) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return false;
      $stmt = self::$db->prepare('UPDATE ListItem
                                  SET is_completed = ?
                                  WHERE todo_list == ? AND task == ?;');
      if(!$stmt)
        return false;
      return $stmt->execute(array($completed, $todo_id, $task));
    }

    public static function deleteProject($project) {
      $stmt = self::$db->prepare('DELETE FROM Project
                                  WHERE title == ?;');
      if(!$stmt)
        return false;
      return $stmt->execute(array($project));
    }

    public static function deleteTodo($project, $todo) {
      $stmt = self::$db->prepare('DELETE FROM TodoList
                                  WHERE title == ? AND project == ?;');
      if(!$stmt)
        return false;
      return $stmt->execute(array($todo, $project));
    }

    public static function deleteTask($project, $todo, $task) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return false;
      $stmt = self::$db->prepare('DELETE FROM ListItem
                                  WHERE todo_list == ? AND task == ?;');
      if(!$stmt)
        return false;
      return $stmt->execute(array($todo_id, $task));
    }

    public static function setProfileImage($user, $path) {
      $stmt = self::$db->prepare('UPDATE User
                                  SET image = ?
                                  WHERE username == ?;');
      if(!$stmt)
        return false;
      return $stmt->execute(array($path, $user));
    }
  }

  DataBase::init();
?>
