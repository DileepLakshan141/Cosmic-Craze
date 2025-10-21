# "Cosmic Craze" NASA API Application

## Overview

The "Cosmic Craze" NASA API Application offers an immersive journey into space exploration, providing users with a set of special features. From the inspiring Astronomy Picture of the Day (APOD) to personalized experiences like discovering past APODs featured on a user's birthday, the app offers a window into the wonders of the universe. Users can stay informed about space weather phenomena such as coronal mass ejections and solar flares, ensuring they never miss a celestial event. Additionally, the app allows users to delve into the Martian landscape with access to Mars rover photos, enabling exploration based on specific rovers, cameras, and dates. For those curious about the history and achievements of space missions, the app provides comprehensive rover mission manifests, detailing launch dates, landing dates, operational statuses, and the number of photos captured by each rover. With its diverse range of features, "Cosmic Craze" offers a captivating and educational experience for space enthusiasts of all ages. This application is fully responsive. To get the best user experience we recommend to use a desktop or laptop.

## Features

##### - Astrnomic Picture Of Day (APOD)

##### - Space Weather Alerts (SWA)

##### - Mars Rover Photos (MRP)

##### - Rover Mission Manifests (RMM)

##### - NASA Image Library (NIL)

## Deployed Version

> In the deployed version, we've temporarily disabled user session management, allowing access to all features without sign in or sign up. You can click on `Get Start` , `Explore` or `Sign In` for navigate to the main dashboard and switch between features using the menu icon top left corner in the deployed version. However, in the repository and local environment, full user management capabilities are available, including sign-in, sign-up and sign-out. This decision was made to ensure seamless accessibility for all users.

- ##### "Cosmic Craze" NASA API Application live version :- https://cosmic-craze-frontend.onrender.com

## Technologies Used

- React.js for the frontend
- Node.js and Express.js for the backend (User Session Management)
- MongoDB as the database
- Axios for HTTP requests
- Redux for state management (Preserve User State During the session)
- React Router for navigation
- React Testing Library and Jest for testing

## Setup Instructions

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository to your local machine

   ```
   git clone <repository-url>
   ```

### Setup Backend

1. Go to the backend directory.

   ```
   cd backend
   ```

2. Install dependencies for backend.

   ```
   npm install
   ```

3. Replace the value for `MONGO_DB_URI` in the backend `.env` file with your mongo db URI. This is optional I have already included a db URI if you want you can use that. this include already created dummy user account. (email: james@gmail.com , password: james123)

4. Replace the values for `ACCESS_SECRET_KEY` and `REFRESH_SECRET_KEY` in the backend `.env` file with some secret keys which will be used for issue and decode jwt tokens.(Optional)

### Setup Frontend

1. Go to the frontend directory.

   ```
   cd backend
   ```

2. Install dependencies for frontend.
   ```
   npm install
   ```
3. Replace the value for `REACT_APP_NASA_API_KEY` in the frontend `.env` file with your mongo db URI. This is optional I have already included a db URI if you want you can use that. this include already created dummy user account.

### Testing the frontend

1. Make sure that you are in the `frontend` diectory.

2. Run the following command to execute the test suits. Test will cover all the dynamic components which interact with the NASA API. There are 5 test suites. It may take some time. (If it indicates no tests to run, press `a` to run all the tests.)

   ```
   npm test
   ```

### Running the Application

1. Start the backend server: (Assume that you are in root directory)

   ```
   cd backend
   npm start
   ```

   or

   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server: (Assume that you are in root directory)
   ```
   cd frontend
   npm start
   ```

## API Endpoints and How to use them.

all of these are `GET` requests. Can execute using a normal web browser.

##### Get the astronomic picture of the day.

- `https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}` : Retrieve the Astronomy Picture of the Day. Replace the `{NASA_API_KEY}` with your NASA API key.

##### Get the astronomic picture of the day for a specific date.

- `https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}&date={requestedDate}` : Retrieve the Astronomy Picture for a past date. Replace the `{NASA_API_KEY}` with your NASA API key and `{requestedDate}` with the date you wantd date format is `YYYY-MM-DD` eg `2024-01-05`.

##### Get the space weather alerts.

- `https://api.nasa.gov/DONKI/notifications?&type=all&api_key=${NASA_API_KEY}` : Retrieve the space weather alerts for last 30 days. Replace `{NASA_API_KEY}` with your NASA API key.

##### Get mars rover photos

- `https://api.nasa.gov/mars-photos/api/v1/rovers/{rover_name}/photos?earth_date=${earth_date}&camera=${camera}&api_key={NASA_API_KEY}`: Retrieve photos captured from NASA rovers at the planet mars. Replace `{NASA_API_KEY}` with your NASA API key. Replace `{rover_name}` with the name of rover etc:- 'curiosity'. Replace `{camera}` with the camera name of the rover. Replace `{earth_date}` with the date you want to get the picture of. (Make sure date is between landed date and last active day of the rover.)

##### Get rover mission manifests.

- `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}` : Retrieve the mission manifests of all rovers which landed on Mars. Replace `{NASA_API_KEY}` with your NASA API Key.

##### Browse through NASA media library.

- `https://images-api.nasa.gov/search?q={search_query}` : Retrieve the media from NASA media library related to specific search prompt. Replace `{search_query}` with any search prompt related to space exploration.

## User Journey & Usage

- Navigate to the homepage to explore the available features.
- You can create an account by clicking on `Get Start` button. It will take you to Sign Up page.
- If you already have an account click on the `Sign In` which is in nav bar for go to sign in page. If you are using a mobile phone or tablet you can click on `Get Start` button and click `Sign In` option bottom of the Sign Up form.
- Once you login successfully using your credentials you will be navigated to the APOD page.
- You can open the menu by clicking on menu icon on top left side of your screen. You can use that menu to switch between features.
- If you want to log out. Simply click logout link in the menu.
- In this application, you can get the Space Weather Alerts like solar flares, coronal mass ejections, interplanetary shocks etc.
- Also it will give you the astronomic picture for the current date and past dates when the date is passed.(Max 1995, June)
- You can browse throught NASA image library using our application by simply do a search. results will be displayed.
- You can get photos captured by the rovers at MARS, you can search for images with selecting a date, rover and it's respective camera to get the photos that taken by that rover camera on that day.
- Also, you can see the mission manifests of the rovers sent to the mars by the NASA like mission status, launch date, landed date etc.

## Final Report & Challenges

- I have utilized five endpoints from NASA API to provide five features in this application.
- Application is fully responsive that suits for various devices like mobile phones, tablets, laptops and desktops.
- Selected API endpoints provide significant features to the application which user are motivated to use the app regularly. As an example we can say astronomic picture of the day, in that feature we gave the ability to get the APOD featured on their birthday (only after 1995 June). Also space weather alerts helps space enthusiasts to keep in track with what happening on the space throughout last 30 days from current date. Mars rover photos is another feature we added to make users get a service that no one offering. They have the freedom to select a rover, a camera from that rover and the date that pictures are captured. Make sure that entered date is in between the landed date and last active date of that rover. you can see those dates because we display those dates in the interface. So, you can select a date within valid date period without an issue. As an example select the rover `curiosity` and it's camera `RHAZ` which stands for "Rear Hazard Avoidance Camera" and select the `date` as `06th December of 2013`. Then check what are the pictures that taken from that rover with that camera on that day. You will be amazed.
- It was very challenging to identify what are the features that user might be interested in that can be provided using the NASA API. I have managed to solve that issue successfully by doing some research for identify which endpoints to choose from and I selected five endpoints that provide data for space enthusiast users might be interested in.

## Credits

- [NASA API](https://api.nasa.gov/)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
