# backend

## DevDesk Backend
   - A Rest API for a ticketing system for problems that lambda students face during instruction and while completing projects
   - This back end will feature basic sign up and log in capabilities, the ability for students to create tickets detailing their problems
     and the ability for helpers to selects tickets to handle and either mark them complete or reassign them to another helper.

## Endpoints for BASE_URL: https://dev2desk.herokuapp.com/

### Register a student

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
   
   
