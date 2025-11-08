--mysql -u root -p < init.sql
CREATE DATABASE IF NOT EXISTS dreamvault;

USE dreamvault;
CREATE TABLE IF NOT EXISTS dreams(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title TEXT,
    description TEXT,
    date DATE
);

INSERT INTO dreams(title, description, date) VALUES ("TESTING 1", "DESCRIPTION 1", "2001-01-01");
INSERT INTO dreams(title, description, date) VALUES ("TESTING 2", "DESCRIPTION 2", "2002-02-02");
INSERT INTO dreams(title, description, date) VALUES ("TESTING 3", "DESCRIPTION 3", "2003-02-02");

CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email VARCHAR(255),
    password TEXT,
    created_at TIMESTAMP
);

INSERT INTO users(email, password) VALUES ("aidanemailtest@email.com", "unhashed_password_test");