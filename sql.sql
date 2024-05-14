DROP TABLE Users;
CREATE TABLE Users (
name VARCHAR(30) NOT NULL,
surname VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL PRIMARY KEY,
password VARCHAR(255) NOT NULL,
admin BOOL NOT NULL);

INSERT INTO Users
VALUES ("carlo", "carlo", "carlo@gmail.com", "$2y$10$hPPuku1gfzl3jLvpuxqAp.5jo4bPK2K7Au2wD4cu0wGpuWp3A/emG", 1);

DROP TABLE Articles;
CREATE TABLE Articles (
title VARCHAR(200) NOT NULL PRIMARY KEY,
text VARCHAR(5000) NOT NULL,
image VARCHAR(255) NOT NULL,
date DATETIME NOT NULL
);

INSERT INTO Articles (title, text, image, date) VALUES
('New Mayor Elected', 'John Smith wins election by landslide vote.','mayor.jpg', '2022-01-01 00:00:00'),
('Local Business Expands', 'New store location opens downtown, creates 20 jobs.','storefront.jpg', '2022-01-05 00:00:00'),
('Winter Storm Hits', 'Heavy snowfall causes road closures, power outages.','snowstorm.jpg', '2022-01-10 00:00:00'),
('New Restaurant Opens', 'Bistro 123 serves up gourmet cuisine in trendy setting.', 'bistro.jpg', '2022-01-15 00:00:00'),
('Police Investigate Robbery', 'Suspects sought in connection with downtown jewelry heist.', 'policecar.jpg', '2022-01-18 00:00:00'),
('School Budget Approved', 'Board votes to increase funding for new programs.','school.jpg', '2022-01-20 00:00:00'),
('Community Rallies Around', 'Fundraiser supports local family affected by fire.', 'fundraiser.jpg', '2022-01-22 00:00:00'),
('New Development Planned', 'City council approves proposal for new apartment complex.', 'development.jpg', '2022-01-25 00:00:00'),
('Sports Team Wins Championship', 'Local high school team takes home state title.', 'trophy.jpg', '2022-01-28 00:00:00'),
('Environmental Concerns Raised', 'Residents speak out against proposed landfill expansion.', 'landfill.jpg', '2022-01-30 00:00:00');
