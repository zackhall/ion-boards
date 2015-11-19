# ion-boards
This is an example first project created for the Ionic Seattle meetup

## setup 
To run locally:
- run `npm install -g ionic cordova gulp` if you don't have these packages installed globally
- run `git clone <url>`
- run `cd ion-boards`
- run `npm install`
- Go to Firebase.com and create a new blank/free application. Use the URL to replace the constant in `/www/js/services.js`
- run `ionic serve --lab`

## tags
This project is setup with many tags. Each tag represents an incremental step in building the project. To checkout the project at a specific point, use the following:
- `git checkout tags/<tagname>` where tagname is in [v1, v2, v3, v4, v5]

To get back to latest, run:
- `git checkout master`
