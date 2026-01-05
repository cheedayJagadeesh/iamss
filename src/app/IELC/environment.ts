// export const environment = {
//     production: false,
//     redirectUri: "http://localhost:4200/authcallback",
//     postLogoutRedirectUri: "http://localhost:4200/#/login"
//   };

export const environment = {
  production: false,
  urls: {
    test: {
      redirectUri: 'http://localhost:4200/authcallback',
      postLogoutRedirectUri: 'http://localhost:4200/#/login'
    },
    'test-dns': {
      redirectUri: 'http://localhost:4200/authcallback',
      postLogoutRedirectUri: 'http://localhost:4200/#/login'
    },
    stage: {
      redirectUri: 'http://localhost:4200/authcallback',
      postLogoutRedirectUri: 'http://localhost:4200/#/login'
    },
    prod: {
      redirectUri: 'http://localhost:4200/authcallback',
      postLogoutRedirectUri: 'http://localhost:4200/#/login'
    },
    "prod-dns": {
      redirectUri: 'http://localhost:4200/authcallback',
      postLogoutRedirectUri: 'http://localhost:4200/#/login'
    }
  },
  // adminViolationEmails: [
  //   'jagadeesh.c@inteqsolutions.com',
  // ]
};



