DROP TABLE Users;
CREATE TABLE Users (
name VARCHAR(30) NOT NULL,
surname VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL PRIMARY KEY,
password VARCHAR(255) NOT NULL);

INSERT INTO Users
VALUES ("giancarlo", "petralini", "aljkladj@gmail.com", "1234");
