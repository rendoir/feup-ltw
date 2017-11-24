PRAGMA FOREIGN_KEYS = ON;

CREATE TABLE User (
  username STRING PRIMARY KEY,
  password STRING NOT NULL
);

CREATE TABLE Project (
  title STRING PRIMARY KEY
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
  project STRING REFERENCES Project (title)
);

CREATE TABLE ListItem (
  item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  task STRING,
  is_completed BOOLEAN DEFAULT(0),
  due_date INTEGER,
  color STRING,
  todo_list INTEGER REFERENCES TodoList (list_id),
  user STRING REFERENCES User (username)
);
