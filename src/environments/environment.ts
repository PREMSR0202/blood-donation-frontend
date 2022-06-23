// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api: 'http://blooddonationapp-env.eba-bjdtpx52.us-east-1.elasticbeanstalk.com/',
  api : 'http://localhost:8080/',
  gapi: 'AIzaSyDCYx_gzFFPyt0dGPSNNHfsUPhsx78GiMo',
  cognito: {
    userPoolId: 'us-east-1_Hcw97y3OW',
    userPoolWebClientId: '5konrl9mos6vtcftf3aa0iralu'
  },
  region: 'us-east-1',
  accessKeyId: 'AKIA5A455FMMVTBCQX2R',
  secretAccessKey: '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',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
