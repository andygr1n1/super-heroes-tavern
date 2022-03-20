// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SRV_NODE: 'http://localhost:6789/',
  // SRV_NODE: 'https://morning-brushlands-33324.herokuapp.com/',
  // SRV_NODE_UPLOAD_HERO_IMAGE:
  //   'https://morning-brushlands-33324.herokuapp.com/api/upload-hero-image',
  SRV_NODE_UPLOAD_HERO_IMAGE: 'http://localhost:6789//api/upload-hero-image',
  // SRV_HASURA: 'https://srv-hasura-superheroes.herokuapp.com/v1/graphql',
  // SRV_HASURA: 'https://srv-hasura-superheroes.herokuapp.com/v1/graphql',
  SRV_HASURA: 'http://localhost:8088/v1/graphql',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
