PRAGMA FOREIGN_KEYS = ON;

CREATE TABLE User (
  username STRING PRIMARY KEY,
  password STRING NOT NULL,
  email STRING NOT NULL UNIQUE,
  birth_date INTEGER
);

CREATE TABLE Project (
  title STRING PRIMARY KEY,
  project_manager STRING REFERENCES User (username)
);

CREATE TABLE Contributes (
  user STRING REFERENCES User (username),
  project STRING REFERENCES Project (title),
  PRIMARY KEY (user, project)
);

CREATE TABLE TodoList (
  list_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title STRING,
  category STRING,
  color STRING,
  project STRING REFERENCES Project (title),
  UNIQUE(title, project)
);

CREATE TABLE ListItem (
  item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  task STRING,
  is_completed BOOLEAN DEFAULT(0),
  due_date INTEGER,
  todo_list INTEGER REFERENCES TodoList (list_id),
  user STRING REFERENCES User (username),
  UNIQUE(task, todo_list)
);

CREATE TABLE Invites (
  invite_id INTEGER PRIMARY KEY AUTOINCREMENT,
  pending BOOLEAN DEFAULT(1),
  accepted BOOLEAN,
  user STRING REFERENCES User (username),
  project STRING REFERENCES Project (title)
);
