# Smallblog

Improvements: implement slugs, pagination, more precise form validation, linting, better tests

# How to start the app

Assuming docker is installed:  

Shell 1: `docker-compose up`  
Shell 2: `cd backend && npm run dev`  
Shell 3: `cd frontend && npm start`  

# Run tests

Backend: `cd backend && npm test`  
Frontend: `cd frontend && npm run cypress:open`  
(assumes an instance on the app running on localhost:4200, as started with `npm start`)  

Note: the testing of the frontend uses cypress and actually does an e2e testing using the API and writting
to the database. So, it would be best to start with a clean postgress instance in docker.
