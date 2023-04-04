# Jira Clone Final Project

Jira Clone:
This jira clone will help you create and manage tasks to streamline production on your next project. 

## Non user functionality:
    - Create Profile:
        - register as a new user
    - Login

## User functionality:
    - Login/Logout
    - Create tickets:
        - Add description of issue
        - Assign to a user
        - Pick a priority level
    - Update a tickets status:
        - Statuses:
            - Pending (When first created)
            - In progress (When user assigned says they are working on it)
            - Done (When user assigned says they are done)
    - Add update notes to tickets:
        - User assigned can add notes to the ticket for updates or status of progress on the issue
    - View All tickets
    - View personal information:
        - Page that displays users registered information (email, name, phone number)
    - Edit personal information:
        - Be able to chane registered information (email, name, phone number)

## Admin functionality:
    - Everything a User can do
    - Delete tickets
    - Change who ticket is assigned to
    - View all Users

## Pages:
    - Login page
    - Register page
    - Home page (where you view all tickets)
    - Ticket page (view more details about specific ticket also where you can edit ticket and delete ticket)
    - Ticket form page (Create new ticket)
    - Profile page (view user registered information)
    - Manage user page (View all users)

## Packages:
    - axios: ^1.3.4
    - bootstrap: ^5.2.3
    - dotenv: ^16.0.3
    - react: ^18.2.0
    - react-bootstrap: ^2.7.2
    - react-dom: ^18.2.0
    - react-router-dom: ^6.9.0
    - react-scripts: 5.0.1
    - web-vitals: ^2.1.4