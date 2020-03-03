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
    
# Endpoints for BASE_URL: https://dev2desk.herokuapp.com/

## Onboarding

### Register a student

type: POST

url: /api/auth/register

requires:
```
{
   username: "Some Name",
   password: "Some password",
   userType: 0 // for student
}
```
success returns:
```
{
   id: 1, // as example, will return a number
   username: "Some Name",
   userType: 0 // for student
}
```
error returns: 
```
{
   errorMessage: "Some error message"
}
```


### Register a helper

type: POST

url: /api/auth/register

requires:
```
{
   username: "Some Name",
   password: "Some password",
   userType: 1 // for helper
}
```
returns:
```
{
   id: 2, // as example, will return a number
   username: "Some Name",
   userType: 1 // for helper
}
```
error returns: 
```
{
   errorMessage: "Some error message"
}
```

### Login
   
type: POST

url: /api/auth/login

requires:
```
{
   username: "Some Name",
   password: "Some password"
}
```
returns:
```
{
   token: "$P$984478476IagS59wHZvyQMArzfx58u.", // example hash
   userType: 0 // if a student or 1 if a helper
}
```
error returns: 
```
{
   errorMessage: "Some error message"
}
```

## User

### Edit a user

type: PUT
   
url: /api/auth/:id

requires:
```
{
   username: "Some Name",
   password: "Some password",
   userType: 0 // 0 for student, 1 for helper
}
```
returns:
```
{
   id: 1,
   username: "Some Name",
   userType: 0
}
```
error returns: 
```
{
   errorMessage: "The user could not be updated"
}
```

### Delete a user

type: DELETE

url: /api/auth/:id

returns:
```
{
   message: "User was deleted.
}
```
error returns: 
```
{
   errorMessage: "User could not be deleted."
}
```

## General Ticket Behavior

### Get all tickets in system

type: GET

url: /api/tickets/

returns:
```
[
   {
      id: 1,
      title: "Some title",
      description: "Some description",
      tried: "What I've tried",
      category: "Some Category",
      status: "Un-assigned"
   },
   {
      id: 2,
      title: "Some title",
      description: "Some description",
      tried: "What I've tried",
      category: "Some Category",
      status: "Un-assigned"
   }
]
```
error returns:
```
{
   errorMessage: "There was an error getting all tickets."
}
```

### Get a ticket by id

type: GET

url: /api/tickets/:id

returns:
```
{
   id: 1,
   title: "Some title",
   description: "Some description",
   tried: "What I've tried",
   category: "Some Category",
   status: "Un-assigned"
}
```
error returns: 
```
{
   errorMessage: "There was an error getting the ticket."
}
```

## Student behavior

### Create a ticket

type: POST

url: /api/tickets/students/:studentId

requires:
```
{
   title: "Some title",
   description: "Some description",
   tried: "What I've tried",
   category: "Some Category"
}
```
returns:
```
{
   studentId: 3,
   ticket: {
      id: 1,
      title: "Some title",
      description: "Some description",
      tried: "What I've tried",
      category: "Some Category",
      status: "Un-assigned"
   }
}
```
error returns: 
```
{
   errorMessage: "Their was an error creating the ticket."
}
```

### Get all tickets for a student

type: GET

url: /api/tickets/students/:studentId

returns:
```
[
   {
      studentId: 3,
      ticket: {
         id: 1,
         title: "Some title",
         description: "Some description",
         tried: "What I've tried",
         category: "Some Category",
         status: "Un-assigned"
      }
   },
   {
      studentId: 3,
      ticket: {
         id: 2,
         title: "Some other title",
         description: "Some other description",
         tried: "What I've tried other",
         category: "Some Other Category",
         status: "Un-assigned"
      }
   }
]
```
error returns: 
```
{
   errorMessage: "Their was an error getting all the tickets."
}
```

### Update a ticket

type: PUT

url: /api/tickets/:id/students/

requires:
```
{
   title: "Some title",
   description: "Some description",
   tried: "What I've tried",
   category: "Some Category"
}
```
returns:
```
{
   id: 1,
   title: "Some title",
   description: "Some description",
   tried: "What I've tried",
   category: "Some Category",
   status: "Un-assigned"
}
```
error returns: 
```
{
   errorMessage: "Their was an error updating the ticket."
}
```

### Delete a ticket

type: DELETE

url: /api/tickets/:id/students/

returns:
```
{
   message: "Ticket was deleted from the system."
}
```
error returns: 
```
{
   errorMessage: "Their was an error deleting the ticket."
}
```

## Helper Behavior

### Get all tickets for helper

type: GET

url: /api/tickets/helpers/:helperId

returns:
```
[
   {
      studentId: 3,
      helperId: 4,
      ticket: {
         id: 7,
         title: 'Some title',
         description: 'Some description',
         tried: 'Some tried',
         category: 'Some category',
         status: 'Some status'
      }
   },
   {
      studentId: 8,
      helperId: 4,
      ticket: {
         id: 12,
         title: 'Some other title',
         description: 'Some other description',
         tried: 'Some other tried',
         category: 'Some other category',
         status: 'Some other status'
      }
   }
]
```
error returns: 
```
{
   errorMessage: "There was an error getting all helper's tickets."
}
```

### Assign/Un-assign helper to ticket

type: PUT

url: /api/tickets/:id/helpers/:helperId

requires:
```
{
   status: "Pending" // assigns to helper, while "Resolved" or "Un-assigned" removes from helper
}
```
returns:
```
{
   message: 'Ticket was updated and linked appropriately.'
}
```
error returns: 
```
{
   errorMessage: 'There was an error updating and linking the ticket.'
}
```


## Other

### Get all categories

type: GET

url: /api/categories/

returns: 
```
[
   'Git',
   'Express',
   'React',
   'HTML',
   'CSS',
   'General Javascript',
   'General Computer',
   'Other'
]
```