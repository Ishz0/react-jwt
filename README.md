Deploy this app on heroku:
  1. Sign up for an account on Heroku
  2. Download Heroku CLI using, - npm i -g heroku
  3. login to Heroku, - heroku login
  4. Create an app on Heroku CLI, - heroku create -a <app-name>
  5. On your root folder path type, - git init
  6. Register app on heroku by, - heroku git:remote -a <app-name>
  7. Add React buildpacks, - heroku buildpacks:set mars/create-react-app
  8. Push your code to remote repository, - git commit -am "my commit" and then git push heroku main
  9. Open app, - heroku open
  10. Update deployment by simply commiting changes in remote repository, - git commit -am "added changes" and then $ git push heroku main
  
Few Improments:
  1. we can add search show functionality so that user can search the title and directly find that show instead of scrolling.
  2. Design the react-app and apply theme and make the site attractive to the users
  3. we can give the suggestions to the users when they start typing the streaming app name.
  
