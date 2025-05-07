export const environment = {
    production: false,
    redirectUri: "http://localhost:4200/authcallback",
    postLogoutRedirectUri: "http://localhost:4200/#/login",
    apiKey: ''
  };
// export const environment = {
//     production: false,
//     redirectUri: (window as any).env?.redirectUri || 'http://localhost:4200',
//     postLogoutRedirectUri: (window as any).env?.postLogoutRedirectUri || 'http://localhost:4200/login'
//   };
// export const environment = {
//     production: window.location.hostname !== "localhost",
//     clientId: "17af1879-bbe9-4a73-8284-1f007a330453",
//     authority: "https://login.microsoftonline.com/d0ae250e-943b-431f-be00-cc1a2f3f59d9",
//     redirectUri: window.location.hostname === "localhost" 
//       ? "http://localhost:4200" 
//       : "https://sampleielc.azurewebsites.net",
//     postLogoutRedirectUri: window.location.hostname === "localhost" 
//       ? "http://localhost:4200/login" 
//       : "https://sampleielc.azurewebsites.net/login"
//   };
  