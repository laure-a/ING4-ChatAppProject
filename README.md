
# Chat application - final project

This webtech project is a chat application that we called "BeeTalky" because we want our users to get talky. It has been implemented using React.js. It has a logo that was designed by Thomas Dieu, Ceo of GraphDieu.fr.
The user can securely create and manage channels, post/edit/delete their messages, invite friends to their channels, change their avatar or keep the default gravatar one, modify settings and so on.

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/thomaspoulain0611/WebTechnologies.git
  cd WebTechnologies
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
* Inside `./dex-config/config.yaml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server:
  ```
  cd dex
  # run this command if you copy pase the .yaml file into your local dex directory
  bin/dex serve dex-config/config.yaml
  # run this command line if you want to use the .yaml provided with this project directly
  bin/dex serve ../dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Do not run bin/init as it fills the database with incorrect data
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
  Camel case was used for naming variables, folders name start by a lower case while React components and files names. Tried to use clear but not too long names for functions and variables.
  
  Mark: 2/2
  
* Project structure   
  For this, we followed the structure that was given to us at the beginning, by keeping information files at the root of the project: .gitignore, instructions and readme. Also, files have been set into different folders: back-end, front-end and dex-config containing the .yaml file used for configuring dex. Locally, we had a dex folder but it was ignored by git as it is supposed to remain local.
  
```
front-end/
 src/
 public/
 package.json
 README.md
 ...
back-end/
  test/
  bin/
  lib/
  package.json
  README.md
  ...
dex-config/
  config.yaml
README.md
instructions.md
```
  Mark: 4/4
  
* Code quality   
  Conventions of two spaces, removal of unnecessary empty lines (no more than one to seperate functions or others). Code indented on atom, console.log used while debugging removed.
  
  Mark: 2.5/4
  
* Design, UX   
  Used commonly used icons for buttons which makes it easier for the user to navigate as they are familiar with them. Light colors, space and minimalist design. Material UI components saw their designs be modified to match the app overall style. Text fields for adding users to channels only offer available options to the user and autocomplete is available. Possibility to make several changes in settings at the same time so it is more convenient.
  
  Mark: 4/4
  
* Git and DevOps   
  Git develop branches have been used to organize and keep the main branch clean. Almost one branch was created for each task (we created one branch per feature, sometimes mixing two for convenience). Respected the naming convention for commits using tags like style, feat, fix, etc. When creating a branch, it was based on the main as it was our "clean" and functionning branch. When one feature was finished, we would merge it into the main. They are still available (kept for grading matters). When two words to name a branch, used _ . Some branches were rebased if code/features added at a later stage were needed. Some pull requests were made before merging so the other student could check and help with conflicts. 
  
  Mark: 3/4
  

Application development

* Welcome screens   
  We designed welcoming pages for Login.js where the user land first and the app itself, once running.
  Login page: call-to-action with the login button and an informative message introducing the web app have been added and styled. There is a background image to make it all look better visually, based on what we saw on the Buttercup page.
  The app itself: channels are located in a drawer component that disappears when the screen gets too small. Then, a button appears. We changed its location to make it fit better in the header. Items in the drawer have also been reorganized to fit our organization. The header presents our logo, name and user information. This is a day theme with a lot of white and colors. We also designed the look of buttons when being hoovered.
  
  Mark: 4/4
  
* New channel creation   
  The user can create a channel: choosing a name (required) and adding one or multiple members if they like. It is persistent in the database.
  Button: to create a channel, click on the "+" button located next to channels: fill in the fields (name is required) and click on "send" to create the channel.
  It triggers a dialog window with text fields. The member fields does not allow to add a user that does not exist or is already present (owner for example). A message is displayed at the bottom left of the screen to confirm the channel has been created.
  
  Mark: 6/6
  
* Channel membership and access 
  When sending a request to the back one, each function header contain the user access token and their email to check their identity. It is associated to the channel when one is created: the user is then a user of the channel, but also the owner. If a user does not exist in the database when logging in, they are automatically created, persisted and a currentUser is set for control purposes in the front-end. It is saved via the cookies, like oauth and is part of the context. This allows us to access it from anywhere in the code, and persist its data on the front-end without reloading the database.
  
  Mark: 3.5/4
  
* Ressource access control   
  A user can only access the channels they have created or the ones they have been invited to. After logging in, when the web app loads the channels, it searches for the ones where this user is registered as a user. They are then displayed in the "channels" drawer and the user can send messages in them and add new users.
  
  Mark: 3/4
  
* Invite users to channels   
  There are two possibilities to add users to channels: when the channel is created or after that, by clicking on the button locaed next to the channel name, at the top of the list of messages sent. Either way, the user can choose to add one or multiple users at the same time, but is only allowed to add users that are ot yet members of this channel or that exist in the database (have already logged in at least once).
  
  Mark: 6/6
  
* Message modification   
  To modify a message, we had to modify List.js and Channel.js in the front-end and the update functions for messages in app.js and db.js in the back-end. We identified the author thanks to database (message.author) and allowed the removal if the author was the same as the user logged in(oauth.email). Then, we displayed an update button next to the message to allow the user to update it. When the user enters the new message, we call an async function that updates it in the front-end but also in the database.
  
  Mark: 2/2
  
* Message removal   
  To remove a message, the principle is the same as the one used to modify a message. In the code, we compare the author of any message in a specific channel and compare it with the user logged in. We displayed delete button to delete a specific message if the user decided to click on it. An async function is then called to update the front-end and the back-end. 
  
  Mark: 2/2
  
* Account settings   
  Account settings can be accessed by clicking on the button icon with a gear on it.
  For this part, we decided to use MUI components that we had not used before (such as buttons, iconbuttons or textfields). Therefore, we decided to display a switch for the user to choose between a day mode and a night mode (not implemented). There is also a button group with radio buttons to select the language of the app (only one can be selected) and a slider to chose the font size. Default values are assigned to a user when it is being created: english for the language, day mode and a font size of 18. These values can be changed by the user and are persisted in the database when clicking on "save". These have not been implemented but the states of the components are all persistent in the database. It is also possible to change the avatar but you need to use another button, on the left. We did not have enough time in the end, but to do so, we could use the palette color (MUI) to create a night mode. Indeed, we can set the colors and their equivalent for each mode and, by using their labels instead of the colors instead in the css or sx parts of the components description, their colors can be automatically adjusted when switching modes: dayMode ? lightColor : darkColor
  For the fontsize, we could have defined a global one and used labels to change the messages fontsize at the like of the user. The language could have been used as autocomplete/grammar suggestions properties in the textfields + the labels displayed for the button toolpits, introductions, help messages, etc.
  
  Mark: 4/4
  
* Gravatar integration   
  For this task, we were allowed to use an existing react component. We chose this one: https://github.com/KyleAMathews/react-gravatar. To integrate it, we ran the following command in the "front-end" directory of our project:
  ```
  #adds react-gravatar in the dependencies of our package.json file
  npm install react-gravatar
  ```
  The gravatar is the default avatar that is displayed next to the email address of the user in the feader. It either usees the user's gravatar image or a default one if the connected user's email is not linked to a gravatar profile. 
  The parameters have all been override to display a rounded image and a little monster as the default gravatar image. NB: users have different default images but keep the same one after the first login. They can later choose a different avatar by clicking on the corresponding button.
  
  Mark: 2/2
  
* Avatar selection   
  For this task, we had to change Login.js, Header.js, Context.js in the front-end and app.js and db.js in the back-end. We decided to upload four different avatars and to offer the possibility for the user to choose either of them or his gravatar (which is put by default as his avatar displayed) next to the settings. We decided to put one button for each avatar in the selection. When we click on one of them, the number of the choice is stored in the database and the front-end is uploaded immediately. With this, we can display the good avatar when a user logs in thanks to his attribute choice. We recognize the good user as we put a setCurrentUser function in Context.js. 
  
  Mark: 4/4
  
* Personal custom avatar   
  For this task, we decided to follow a video to understand how we can integrate drag and drop to our selection. This video is the following: https://www.youtube.com/watch?v=eftyBaoDkNA. We managed to do it and to select only images thanks to the accept function. We had to run the following command in the front-end to be able to define a dropzone in our selection:
  ```
  #adds react-gravatar in the dependencies of our package.json file
  npm install react-gravatar
  ```
  We were then able to load an image but the format received was not usable. We had to convert it to base64 to make it usable, to display it in the front-end and to store it in the back-end. We used the code on the following website to help us to the conversion: https://www.codegrepper.com/code-examples/javascript/const+toBase64+%3D+file+%3D%3E+new+Promise%28%28resolve%2C+reject%29+%3D%3E+%7B+const+reader+%3D+new+FileReader%28%29+reader.readAsDataURL%28file%29+reader.onload+%3D+%28%29+%3D%3E+resolve%28reader.result%29+reader.onerror+%3D+error+%3D%3E+reject%28error%29+%7D%29
  
  This format was usable and we were able to display the image in the header. But we had an issue to store it in the database. The base64 argument was too long so we had to run the following command to be able to store it in the database:
  ```
  #adds react-gravatar in the dependencies of our package.json file
  npm install body-parser
  ```
  We created a variable in our back-end to make it possible to store very long requests. Then, we could store our uploaded image in the back-end as well as in the front-end.
 
  Mark: 5/6
 
## Bonus

- Alert message to notify the user that the channel has successfully been created is displayed at the bottom left of the screen during a few seconds or less if the user closes it manually. 
- Textfields have been improved: one was overrided for the message typing section (form) and the ones for adding users offer a lot of information to the user : good UX. 
- For test purposes, another user was added to the dex config file: login: student@example.com password: password
