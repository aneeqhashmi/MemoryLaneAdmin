// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyA_cqjChN2GPylkbnc9rZkkcaV9XGc1WWY",
    authDomain: "memorylane-dev.firebaseio.com",
    databaseURL: "https://memorylane-dev.firebaseio.com",
    storageBucket: "memorylane-dev.appspot.com",
    messagingSenderId: "108511672750"
  }
};
