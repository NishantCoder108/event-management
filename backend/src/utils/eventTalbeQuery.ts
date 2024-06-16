export const createEventTableQuery = `
  CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    datetime DATETIME NOT NULL,
    duration INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    agenda TEXT NOT NULL,
    guests JSON NOT NULL,
    reminder INT NOT NULL,
    notification VARCHAR(255) NOT NULL,
    attachment VARCHAR(255)
  );
`;
