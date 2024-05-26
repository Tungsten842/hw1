DROP DATABASE website;
CREATE DATABASE website;
USE website;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  admin BOOL NOT NULL
);

INSERT INTO Users (name,surname,email,password,admin)
VALUES ("carlo", "rovigo", "carlo@gmail.com", "$2y$10$SUhtBOcp//1TJDFHwWn7herAKG3CbKJO8a11xwTLVLwxTgB4SG0Cy", 1);

CREATE TABLE Articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  text TEXT(20000) NOT NULL,
  image varchar(255) NOT NULL,
  author VARCHAR(30) NOT NULL,
  date DATETIME NOT NULL
);

CREATE TABLE Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Articles_Categories (
  article_id INT,
  category_id INT,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES Articles(id),
  FOREIGN KEY (category_id) REFERENCES Categories(id)
);

CREATE TABLE Comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,

  user_id INT, 
  name VARCHAR(50),

  text VARCHAR(2000) NOT NULL,
  FOREIGN KEY (article_id) REFERENCES Articles(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
