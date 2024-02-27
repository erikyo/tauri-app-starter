-- Create Todo database
CREATE DATABASE IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  task_content VARCHAR(255) NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO todo (task_name, task_content) VALUES
('Task 1', 'Description for Task 1'),
('Task 2', 'Description for Task 2'),
('Task 3', 'Description for Task 3'),
('Task 4', 'Description for Task 4'),
('Task 5', 'Description for Task 5');
