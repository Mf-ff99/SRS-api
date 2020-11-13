# LearnSpanish! 

## Summary
Bootstrapped with create-react-app and completed using JavaScript, vanilla CSS, JSX and ReactJS.

 Front-end Live Deployment: https://srs-client.vercel.app/
 Back-end Live Deployment: https://srs-server-api.herokuapp.com/
 
  LearnSpanish! is a language learning application designed for teaching beginner Spanish learners a handful of Spanish words and phrases. LearnSpanish! features a Spaced-Repetition algorithm on the back-end to help users stay caught up on their studies without forgetting any new words they have learned. The application features 10 spanish words and is built to allow for the application to be expanded upon. 

  In this project, the hardest part was building out the Express server on the back-end to accomadate the SRS system. Two endpoints handle the Language requests to determine the user's current score and return the next word for the user to study. 
  
## Endpoints 

### Authorization

## POST /api/token
 Posts to this endpoint with the proper credentials logs in the user and returns a JWT Token for authorization
 
## POST /api/user
  Posting to the /api/user endpoint registers a user within the database and populates a new user's table with the appropriate language and word-set to start learning

## GET /api/language/head
 Fetch calls to this endpoint initialize the SRS system and ensure that the next word to learn is prepared for the user

## POST /api/language/guess
 POST requests to this endpoint send the user's word guess to the server and check it against the translation. Depending on the user's answer, the word is either moved to the top of the word 'deck' or moved further along toward the bottom.

## Screenshots

### Login Page

![image](https://user-images.githubusercontent.com/66629254/99112345-837c3700-25bb-11eb-8887-6853bad23990.png)

### Sign-up Page

![image](https://user-images.githubusercontent.com/66629254/99112386-95f67080-25bb-11eb-90bc-59f2c81ca8ad.png)

### Dashboard 

![image](https://user-images.githubusercontent.com/66629254/99112434-aad30400-25bb-11eb-8565-03912a2bb171.png)

### Practice page

![image](https://user-images.githubusercontent.com/66629254/99112465-b4f50280-25bb-11eb-8164-cc006c272496.png)

### Next word page

![image](https://user-images.githubusercontent.com/66629254/99112507-bfaf9780-25bb-11eb-84eb-470ea1c889fa.png)


## Tech-stack and Testing

React.js, JavaScript, vanilla css, PostgreSQL, SQL, Node.js, Mocha, Chai

Front end testing: This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Back end testing: Moch and Chai, and Supertest were used to test each endpoint and knex-services, each endpoint has at least one test for the 'happy path', and one test for the 'unhappy path'

## The Back-end
 ### SRS API
 The back-end is written with Express.js and utilizes a RESTful state to satisfy CRUD requests.
   
   
## Other odds and ends

 If you wish to see what the application can do on your own machine, or simply tinker around with the code, follow the directions below.
 
 * clone the repo to an empty folder
 * then run the following commands in your console to install dependecies and start the server with Nodemon
 ```
 npm i
 ```
 ```
 npm run dev
```





