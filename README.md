# Growku E-menu

Growku E-menu is a progressive web application designed to facilitate the creation of electronic menus for internal use within restaurants.
This app is optimized for compatibility with iPad (6th generation).

The app is seamlessly integrated with a third-party API to retrieve product categories and information. Presently, it is linked with Wordpress to access this data.

This project was initialized using [Create React App](https://github.com/facebook/create-react-app).

## Deployment
We utilize [Netlify](https://www.netlify.com) for deploying the main branch to our production environment.
You can access the deployed application [here](https://growku-e-menu.netlify.app), which serves as our production link.

When a pull request is generated, a preview of the branch's deployment is automatically generated on Netlify for testing purposes.
Upon merging the pull request, the changes are seamlessly deployed to our production environment.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

