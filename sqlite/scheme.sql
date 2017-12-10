PRAGMA FOREIGN_KEYS = ON;

CREATE TABLE User (
  username STRING PRIMARY KEY,
  name STRING NOT NULL,
  password STRING NOT NULL,
  email STRING NOT NULL UNIQUE,
  birth_date INTEGER,
  image STRING
);

CREATE TABLE Project (
  title STRING PRIMARY KEY,
  project_manager STRING REFERENCES User (username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Contributes (
  user STRING REFERENCES User (username) ON DELETE CASCADE ON UPDATE CASCADE,
  project STRING REFERENCES Project (title) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (user, project)
);

CREATE TABLE TodoList (
  list_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title STRING,
  category STRING,
  color STRING,
  project STRING REFERENCES Project (title) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(title, project)
);

CREATE TABLE ListItem (
  item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  task STRING,
  is_completed BOOLEAN DEFAULT(0),
  due_date INTEGER,
  todo_list INTEGER REFERENCES TodoList (list_id) ON DELETE CASCADE ON UPDATE CASCADE,
  user STRING REFERENCES User (username) ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE(task, todo_list)
);

CREATE TABLE Invite (
  invite_id INTEGER PRIMARY KEY AUTOINCREMENT,
  pending BOOLEAN DEFAULT(1),
  accepted BOOLEAN,
  user STRING REFERENCES User (username) ON DELETE CASCADE ON UPDATE CASCADE,
  project STRING REFERENCES Project (title) ON DELETE CASCADE ON UPDATE CASCADE
);
