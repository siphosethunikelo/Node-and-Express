// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: "http://localhost:3000",
  users: "http://localhost:3000/users",
  firebaseConfig : {
    apiKey: "AIzaSyA2P2jrWAPu91w7OYUa-JHwrsKRHfC1Mzk",
    authDomain: "my-express-server-e5d55.firebaseapp.com",
    databaseURL: "https://my-express-server-e5d55-default-rtdb.firebaseio.com",
    projectId: "my-express-server-e5d55",
    storageBucket: "my-express-server-e5d55.appspot.com",
    messagingSenderId: "361667375411",
    appId: "1:361667375411:web:dcf6a2f4266d50388ece46",
    measurementId: "G-5RT5SJN6DG"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

