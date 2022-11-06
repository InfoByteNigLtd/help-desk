// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseAPIURL: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/',
  forumAPI: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/ForumTypes',
  conversationsAPI: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Conversations/GetConversations',
  commentAPI: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Comments',
  memberAPI: 'https://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Auth/Login',
  supportAPI: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Tickets/',
  supportAPI2: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Tickets',
  supportAPI3: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Conversations/PostConversation',
  suppourtAPI4: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/TicketCategories',
  annoucementAPI: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Posts/GetAnnouncements',
  signupAPI: 'https://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/GetMemberByComputerNo?id=',
  fullSignUpAPI: 'https://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Auth/Register',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
