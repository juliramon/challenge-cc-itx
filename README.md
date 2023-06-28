# Getting Started

Frontend repository for the code challenge for Cc x Itx

## Developer
Juli Ramon

## Demo
A functional demo of the SPA is available here: [https://challenge-cc-itx.vercel.app/](https://challenge-cc-itx.vercel.app/)

## Epics
– Index view (Podcasts)
- Podcast view (Podcast)
- Episode view (Episode)
- Heading (Layout)

## Routing

|Name         |Route     |
|-------------|-------------------------|
|Podcasts     |/             |
|Podcast      |/podcast/:id    |
|Episode      |/podcast/:id/episode/:episodeId         |

## Tech stack
- The SPA has been bootstrapped with Create React App. Next.js was considered to develop the project, but the author preferred to stick with CRA to work with React Router
- TailwindCSS has been used as CSS framework
- React hooks such as useState, useEffect and useQuery have been used to handle state, query and storage management

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

The app has been deployed with Vercel

