  export const environment = {
  production: true,
  urls: {
    test: {
      redirectUri: "https://ielc.inteqportal.com/authcallback",
      postLogoutRedirectUri: "https://ielc.inteqportal.com/#/login"
    },
    prod: {
      redirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/authcallback",
      postLogoutRedirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/#/login"
    }
  }
};
