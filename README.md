# Woofipedia

This is a small project integrating the [MediaWiki Action API](https://www.mediawiki.org/wiki/API:Main_page) and [Dog API](https://dog.ceo/dog-api/) with React.

The project is currently deployed at http://woofipedia.surge.sh.
<br>
<br>
<hr>
<br>


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Known Issues

- On some pages, the extract is missing certain text elements, generally the pronounciation guide, if it is wrapped in a "noexcerpt" span tag on the Wikipedia page. However, there's not a lot that can be done about that using the API. 

    [Example: The Mexican Hairless Dog](https://en.wikipedia.org/wiki/Mexican_Hairless_Dog): See the pronounciation in parantheses after Xoloitzcuintli - in the app it will show up as just "()".

- The "Mix" breed has returned a non dog related page before (linked to the [Soundtrack of "Guardians of the Galaxy"](https://en.wikipedia.org/wiki/Guardians_of_the_Galaxy_Vol._2_(soundtrack))).

