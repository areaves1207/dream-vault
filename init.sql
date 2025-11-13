CREATE DATABASE IF NOT EXISTS dreamvault;

USE dreamvault;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(id, email, hashed_password) VALUES (-2,"test@email.com", "unhashed_password");

CREATE TABLE IF NOT EXISTS dreams(
    dream_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO dreams(user_id, title, description, date) VALUES (-2, "TESTING 1", "DESCRIPTION 1", "2001-01-01");
INSERT INTO dreams(user_id, title, description, date) VALUES (-2, "TESTING 2", "DESCRIPTION 2", "2002-02-02");
INSERT INTO dreams(user_id, title, description, date) VALUES (-2, "TESTING 3", "DESCRIPTION 3", "2003-02-02");
