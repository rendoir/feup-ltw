PRAGMA foreign_keys = on;

DELETE FROM User;
DELETE FROM Project;
DELETE FROM Contributes;
DELETE FROM TodoList;
DELETE FROM ListItem;


INSERT INTO User (username, password) values ('timon', 'hakunamatata');
INSERT INTO User (username, password) values ('frango', 'cabidela');
INSERT INTO User (username, password) values ('alternativa', 'dux');
INSERT INTO User (username, password) values ('rodas', 'afilhados');
INSERT INTO User (username, password) values ('sid', 'sonecamatinal');
INSERT INTO User (username, password) values ('leo', 'pcfuncional');
INSERT INTO User (username, password) values ('oco', 'escriba2000');


INSERT INTO Project (title) values ('project1');
INSERT INTO Project (title) values ('project2');
INSERT INTO Project (title) values ('project3');

INSERT INTO Contributes (username, title) values ('timon', 'project1');
INSERT INTO Contributes (username, title) values ('frango', 'project2');
INSERT INTO Contributes (username, title) values ('alternativa', 'project3');
