# continental-blog
This is assignment requested by Continental to create a blog, to add/edit/delete posts with images with authorization and toolbar
What is completed
--> Post List Page
--> New Post Page
--> Toolbar to navigate to pages
--> Backend Integration with Node.js
---> MongoDb database integration

What is pending and can be completed
--> Adding of authorization
this can be easily done using Auth Guard in Angular, where user Sign In and Sign Out can be managed by Database and Auth Guard can restrict access to the pages.
--> Adding menu option when user if logged in can delete himself

Planned to add this part of Authorization and Authentication, following is steps which can be done
--> Create a new Component User Sign Up and Sign In, allows existing user to sign in or sign up (using node js at backend to handle this part with db)
--> Upon successfull sign in, in the toolbar enable delete account option where user can choose to delete his/her account
--> if clicked on delete account, Node js at backend will delete the user and his/her details from backend and redirect user to sign in/sign up

Image support for Posts

Technical Stack used
Angular 12 for front end, Single Page Application
Node.js for backend to handle database transactions
MongoDB, NoSQL free Cluster for database
Express.js Framework to handle api calls
Mongoose, to handle MongoDb queries.
