# Event Management

## Description

This project is an event management application that allows users to create events and view them in a table format. It incorporates various technologies such as AWS S3 for file storage, Nginx for web server configuration, SSL certificates for secure communication, CI/CD pipelines implemented using GitHub Actions, RDS MySQL for database management, an EC2 instance for hosting the application, and a tech stack including Node.js, Express.js, TypeScript, MySQL, React, and Material-UI for the frontend.

## Features

1. **Event Creation**: Users can create new events, specifying details such as event name, date/time, duration, agenda, location, and guest list.

2. **Event Management**: Ability to view, existing events.

3. **Event Filtering**: Users can filter events based on status (completed, ongoing, upcoming) and duration.

4. **Guest Management**: Support for adding and managing guest details, including email addresses.

5. **Reminder Settings**: Option to set reminders for events, allowing users to choose how much time before the event they want to be reminded.

6. **Notification Preferences**: Ability to choose notification methods (email, Slack) for event reminders.

7. **File Uploads**: Support for uploading attachments (e.g., presentations, documents) when creating events.

8. **Responsive Design**: Application interface is designed to be responsive and accessible on various devices.

9. **Security**: Implementation of SSL certificates for secure communication and data encryption.

10. **CI/CD Pipeline**: Automated deployment using GitHub Actions for continuous integration and deployment.

11. **Database Management**: Utilization of RDS MySQL for storing and managing event data.

## Technologies Used

1. **Frontend**:

    - React
    - TypeScript
    - Material-UI

2. **Backend**:

    - Node.js
    - Express.js
    - TypeScript

3. **Database**:

    - MySQL (RDS)

4. **Infrastructure**:

    - AWS S3 (for file storage)
    - EC2 (for hosting)
    - Nginx (for web server)
    - SSL Certificate (for secure communication)

5. **Development**:
    - GitHub Actions (for CI/CD)
    - Git (for version control)

## Setup Instructions

1. Clone the repository.
2. Install dependencies and Start developement server:

```bash
   cd frontend
   npm install
   npm run dev

----------------------

  cd backend
  npm install
  npm run dev

```

## Directory Structure

-   `frontend/`: Frontend code.
-   `backend/`: Backend code.
-   `.github/workflows/deploy.yml`: GitHub Actions workflow for deployment.
