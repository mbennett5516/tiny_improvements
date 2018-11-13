# Tiny Improvements - MongoDB and Mongoose

### Overview

For this assignment, you will build out Tiny Improvements, an application that allows users to send compliments or "Kudos" to other users that are then displayed on the page for all to see. 

You will use a MongoDB database to store all Kudos and User data which will then be output onto the DOM. Be sure to deploy your application using Heroku and mLaB so that others can use your application and send Kudos! 

A guide to deploying your application on Heroku can be found [here](../HerokuGuide.md) and a video guide to deploying a MongoDB database using mLaB [here](https://youtu.be/xyWcHBsJbts).

### Before You Begin

* Check out [this demo version of the site](https://arcane-falls-88518.herokuapp.com/). Use this as a model for how we expect your assignment to operate. Feel free to apply your own style!

### Submission on BCS

* Please submit both the deployed Heroku link to your homework AND the link to the Github Repository!

### Instructions

1. Always start by pseudocoding and flowcharting logic! As an example, outline step-by-step what the user is able to do upon visiting the website. 

  * When the user first visits the website, they are presented with all of the Kudos previously sent.
  * Each Kudos displayed should have the name of the sender, name of the receiver, the title of the Kudo, and the body of the Kudo.
  * When the user clicks the `Give Kudo` button, the user will be given the option to select the sender and receiver as well as enter the title and body of a new Kudo.

* Continue adding to the above list or come up with your own from scratch!

2. You should have two models, one for all Users and one for all Kudos. The Kudos model should take in the `ObjectId` for Users so that we know from whom the Kudos are coming from and to whom the Kudos are meant for.

3. Be sure to create your own starter data (Users and Kudos) so that you can test as you build out the application.

4. Your `apiRoutes.js` file should contain three routes.

  * A GET route that retrieves all Kudos from the database.
  * A GET route that retrieves all Users from the database.
  * A POST route to handle creating new Kudos.

5. You should have two models, one for all Users and one for all Kudos. The Kudos model should take in the `ObjectId` for Users so that we know from whom the Kudos are coming from and to whom the Kudos are meant for.

6. When the user creates a new Kudos, it should be stored in a MongoDB database. The page should then re-render all of the stored kudos onto the page.

- - - 

### Reminder: Submission on BCS

* Please submit both the deployed Heroku link to your homework AND the link to the Github Repository!

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**
