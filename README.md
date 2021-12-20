
# Chat application - final project

This webtech project is a chat application that we called "BeTalky". It has been implemented using React.js, JavaScript...

The user can securely create and manage channels, post/edit/delete their messages, invite friends, change their avatar or keep the default gravatar one, modify settings and so on.

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/adaltas/ece-webtech-2021-fall.git webtech
  cd webtech/courses/webtech/project
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignores the `dex` folder.
* Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Optional, fill the database with initial data
  bin/init
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

## Author

* Laure Audouy : laure.audouy@edu.ece.fr
* Thomas Poulain : thomas.poulain@edu.ece.fr

*Group 3 - SI Inter*

## Tasks

Project management

* Naming convention   
  *place your graduation and comments*
* Project structure   
  *place your graduation and comments*
* Code quality   
  *place your graduation and comments*
* Design, UX   
  *place your graduation and comments*
* Git and DevOps   
  *place your graduation and comments*

Application development

* Welcome screens   
  *laure: en cours*
* New channel creation   
  *place your graduation and comments*
* Channel membership and access   
  *place your graduation and comments*
* Ressource access control   
  *place your graduation and comments*
* Invite users to channels   
  *place your graduation and comments*
* Message modification   
  To modify a message, we had to modify List.js and Channel.js in the front-end and the update functions for messages in app.js and db.js in the back-end. We identified the author thanks to database (message.author) and allowed the removal if the author was the same as the user logged in(oauth.email). Then, we displayed an update button next to the message to allow the user to update it. When the user enters the new message, we call an async function that updates it in the front-end but also in the database.
  
  Mark: 2/2
  
* Message removal   
  To remove a message, the principle is the same as the one used to modify a message. In the code, we compare the author of any message in a specific channel and compare it with the user logged in. We displayed delete button to delete a specific message if the user decided to click on it. An async function is then called to update the front-end and the back-end. 
  
  Mark: 2/2
  
* Account settings   
  
  
* Gravatar integration   
  For this task, we were allowed to use an existing react component. We chose this one: https://github.com/KyleAMathews/react-gravatar. To integrate it, we ran the following command in the "front-end" directory of our project:
  ```
  #adds react-gravatar in the dependencies of our package.json file
  npm install react-gravatar
  ```
  In the code, the component was used in "header.js" line 61 to display the user's gravatar image or a default one if the connected user's email is not linked to a gravatar profile. 
  
* Avatar selection   
  For this task, we had to change Login.js, Header.js, Context.js in the front-end and app.js and db.js in the back-end. We decided to upload four different avatars and to offer the possibility for the user to choose either of them or his gravatar (which is put by default as his avatar displayed) in the settings. We decided to put one button for each avatar in the selection. When we click on one of them, the number of the choice is stored in the database and the front-end is uploaded immediately. With this, we can display the good avatar when a user logs in thanks to his attribute choice. We recognize the good user as we put a setCurrentUser function in Context.js. 
  
  Mark: 4/4
  
* Personal custom avatar   
  For this task, we decided to follow a video to understand how we can integrate drag and drop to our selection. This video is the following: 
  ```
  https://www.youtube.com/watch?v=eftyBaoDkNA
  ```
   We managed to do it and to select only images thanks to the accept function. We had to run the following command in the front-end to be able to define a dropzone in our selection:
  ```
  #adds react-gravatar in the dependencies of our package.json file
  npm install react-gravatar
  ```
  We were thank able to load an image but the format received was not usable. We had to convert it to base64 to make it usable, to display it in the front-end and to store it in the back-end. We used the code on the following website to help us to the conversion: 
  ```
  https://www.youtube.com/watch?v=eftyBaoDkNA
  ```
  This format was usable and we were able to display the image in the header. But we had an issue to store it in the database. The base64 argument was too long so we had to run the following command to be able to store it in the database:
  ```
  #adds react-gravatar in the dependencies of our package.json file
  npm install body-parser
  ```
  We created a variable in our back-end to make it possible to store very long requests. Then, we could store our uploaded image in the back-end as well as in the front-end.
 
 Mark: 5/6
 
## Bonus

*place your graduation and comments*
