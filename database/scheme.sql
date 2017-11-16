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
  title STRING,
  category STRING,
  color STRING,
  project STRING REFERENCES Project (title),
  PRIMARY KEY (project, title)
);

CREATE TABLE ListItem (
  task STRING,
  is_completed BOOLEAN DEFAULT(0),
  due_date INTEGER,
  color STRING,
  todo_list STRING REFERENCES TodoList (title),
  project STRING REFERENCES Project (title),
  user STRING REFERENCES User (username),
  PRIMARY KEY (task, project, todo_list)
);
