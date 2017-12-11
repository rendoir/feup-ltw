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
      if($stmt)
        if($stmt->execute(array($username)))
          return $stmt->fetch() != false;
      return null;
    }


    public static function checkLogin($username, $password) {
      $stmt = self::$db->prepare('SELECT password
                                  FROM User
                                  WHERE username == ?;');
      if($stmt)
        if($stmt->execute(array($username)))
          if(($result = $stmt->fetch()))
            return password_verify($password, $result["password"]);
      return false;
    }

    public static function addUser($username, $password, $email, $name, $birth_date) {
      $stmt = self::$db->prepare('INSERT INTO User (username, password, email, name, birth_date)
                                  VALUES (?, ?, ?, ?, ?);');
      if($stmt) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        return $stmt->execute(array($username, $hashed_password, $email, $name, $birth_date));
      }
      return false;
    }

    public static function getUserProjects($username) {
      $stmt = self::$db->prepare('SELECT project, project_manager
                                  FROM Contributes, Project
                                  WHERE project == title AND user == ?;');
      if($stmt)
        if($stmt->execute(array($username)))
          return $stmt->fetchAll();
      return null;
    }

    public static function getToDoListsOfProject($project) {
      $stmt = self::$db->prepare('SELECT title, category, color
                                  FROM TodoList
                                  WHERE project == ?;');
      if($stmt)
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
      if($stmt)
        if($stmt->execute(array($todo_id)))
          return $stmt->fetchAll();
      return null;
    }

    public static function getTodoID($project, $todo) {
      $stmt = self::$db->prepare('SELECT list_id
                                  FROM TodoList
                                  WHERE project == ? AND title == ?;');
      if($stmt)
        if($stmt->execute(array($project, $todo)))
          return $stmt->fetch()["list_id"];
      return null;
    }

    public static function getListItemsAssignedToUser($user) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM ListItem
                                  WHERE user == ?;');
      if($stmt)
        if($stmt->execute(array($user)))
          return $stmt->fetchAll();
      return null;
    }

    public  static function getUserInfo($username){
      $stmt = self::$db->prepare('SELECT name, email, birth_date, image
                                  FROM User
                                  WHERE username == ?;');
      if($stmt)
        if($stmt->execute([$username]))
          return $stmt->fetch();
      return null;
    }

    public static function addProject($project, $user) {
      $stmt = self::$db->prepare('INSERT INTO Project (title, project_manager)
                                  VALUES (?, ?);');
      if($stmt)
        if($stmt->execute(array($project, $user)))
          return self::addUserToProject($user, $project);
      return false;
    }

    public static function addUserToProject($user, $project) {
      $stmt = self::$db->prepare('INSERT INTO Contributes (user, project)
                                  VALUES (?, ?);');
      if($stmt)
        return $stmt->execute(array($user, $project));
      return false;
    }

    public static function addToDoList($title, $project, $category, $color) {
      $stmt = self::$db->prepare('INSERT INTO TodoList (title, category, color, project)
                                  VALUES (?, ?, ?, ?);');
      if($stmt)
        return $stmt->execute(array($title, $category, $color, $project));
      return false;
    }

    public static function addListItem($task, $due_date, $todo, $project) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return false;
      $stmt = self::$db->prepare('INSERT INTO ListItem (task, due_date, todo_list)
                                  VALUES (?, ?, ?);');
      if($stmt)
        return $stmt->execute(array($task, $due_date, $todo_id));
      return false;
    }

    public static function assignListItemToUser($item, $user) {
      $stmt = self::$db->prepare('UPDATE ListItem
                                  SET user = ?
                                  WHERE item_id == ?;');
      if($stmt)
        return $stmt->execute(array($user, $item));
      return false;
    }

    public static function setCompletedListItem($task, $todo, $project, $completed) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return false;
      $stmt = self::$db->prepare('UPDATE ListItem
                                  SET is_completed = ?
                                  WHERE todo_list == ? AND task == ?;');
      if($stmt)
        return $stmt->execute(array($completed, $todo_id, $task));
      return false;
    }

    public static function deleteProject($project) {
      $stmt = self::$db->prepare('DELETE FROM Project
                                  WHERE title == ?;');
      if($stmt)
        return $stmt->execute(array($project));
      return false;
    }

    public static function deleteTodo($project, $todo) {
      $stmt = self::$db->prepare('DELETE FROM TodoList
                                  WHERE title == ? AND project == ?;');
      if($stmt)
        return $stmt->execute(array($todo, $project));
      return false;
    }

    public static function deleteTask($project, $todo, $task) {
      $todo_id = DataBase::getTodoID($project, $todo);
      if($todo_id === null)
        return false;
      $stmt = self::$db->prepare('DELETE FROM ListItem
                                  WHERE todo_list == ? AND task == ?;');
      if($stmt)
        return $stmt->execute(array($todo_id, $task));
      return false;
    }

    public static function setProfileImage($user, $path) {
      $stmt = self::$db->prepare('UPDATE User
                                  SET image = ?
                                  WHERE username == ?;');
      if($stmt)
        return $stmt->execute(array($path, $user));
      return false;
    }

    public static function getSimilarUsers($input, $current_user) {
      $stmt = self::$db->prepare('SELECT username
                                  FROM User
                                  WHERE username LIKE ? AND username != ?;');
      if($stmt)
        if($stmt->execute(array('%' . $input . '%', $current_user)))
          return $stmt->fetchAll();
      return false;
    }

    public static function inviteUserToProject($user, $project) {
      $stmt = self::$db->prepare('INSERT INTO Invite (user, project)
                                  VALUES (?, ?);');
      if($stmt)
        return $stmt->execute(array($user, $project));
      return false;
    }

    public static function getPendingInvites($user) {
      $stmt = self::$db->prepare('SELECT DISTINCT project
                                  FROM Invite
                                  WHERE user == ? AND pending == 1;');
      if($stmt)
        if($stmt->execute(array($user)))
          return $stmt->fetchAll();
      return false;
    }

    public static function userContributesToProject($user, $project) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM Contributes
                                  WHERE user == ? AND project == ?;');
      if($stmt)
        if($stmt->execute(array($user, $project)))
          return $stmt->fetchAll() != false;
      return false;
    }

    public static function userHasNoPendingInvite($user, $project) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM Invite
                                  WHERE user == ? AND project == ? AND pending == 1;');
      if($stmt)
        if($stmt->execute(array($user, $project)))
          return $stmt->fetchAll() == false;
      return false;
    }

    public static function answerInvite($user, $project, $answer) {
      $stmt = self::$db->prepare('UPDATE Invite
                                  SET pending = 0, accepted = ?
                                  WHERE user == ? AND project == ?;');
      if($stmt) {
        if($stmt->execute(array($answer, $user, $project)))
          if($answer)
            return self::addUserToProject($user, $project);
          else return true;
      }
      return false;
    }

    public static function isProjectManager($user, $project) {
      $stmt = self::$db->prepare('SELECT *
                                  FROM Project
                                  WHERE title == ? AND project_manager == ?;');
      if($stmt)
        if($stmt->execute(array($project, $user)))
          return $stmt->fetch() != false;
      return false;
    }
  }

  DataBase::init();
?>
