# backend

## DevDesk Backend
   - A Rest API for a ticketing system for problems that lambda students face during instruction and while completing projects
   - This back end will feature basic sign up and log in capabilities, the ability for students to create tickets detailing their problems
     and the ability for helpers to selects tickets to handle and either mark them complete or reassign them to another helper.

   - the link for the backend is https://dev2desk.herokuapp.com/

 ##Currently working Endpoints
    - /api/register
        - requires a username, password and user role
        - currently returns a username and a hashed password (hashed password will be removed in the final version)
    - /api/login
        - requires a username and a password
        - returns the users information and a token that will give access to more endpoints
    - Coming soon
    