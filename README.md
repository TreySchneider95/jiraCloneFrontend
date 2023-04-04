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

## Backend Routes:
    - (GET) /tickets/all
        - Gets all tickets
    - (GET) /tickets/one-ticket/:id
        - Gets single ticket by id
    - (GET) /users/all
        - Gets all users for admin
    - (POST) /tickets/create-one
        - Creates ticket
    - (POST) /users/login
        - login for user
    - (POST) /users/register
        - registers user
    - (PUT) /tickets/update-one/:id
        - updates ticket by id
    - (PUT) /users/update-one/:id
        - updates user info by id
    - (DELETE) /tickets/delete-one/:id
        - deletes ticket by id