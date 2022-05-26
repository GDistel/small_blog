# Smallblog

Improvements to be made:
- implement slugs
- more precise form validation
- linting
- more and better tests
- WYSIWYG editor
- Authentication

# How to start the app

Assuming docker is installed:  

Shell 1: `docker-compose up`  
Shell 2: `cd backend && npm run dev`  
Shell 3: `cd frontend && npm start`  

Note: there is an `/admin` path to create, edit, delete posts

# Run tests

Backend: `cd backend && npm test`  
Frontend: `cd frontend && npm run cypress:open`  
(assumes an instance on the app running on localhost:4200, as started with `npm start`)  

Note: the testing of the frontend uses cypress and actually does an e2e testing using the API and does write
to the database.
