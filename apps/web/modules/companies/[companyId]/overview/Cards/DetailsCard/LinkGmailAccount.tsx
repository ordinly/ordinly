import Script from "next/script";

import { Button } from "@components/Button";

var SCOPES = "https://www.googleapis.com/auth/gmail.modify";

var API_KEY = process.env.NEXT_PUBLIC_GMAIL_API_KEY;
var CLIENT_ID = process.env.NEXT_PUBLIC_GMAIL_CLIENT_ID;

const LinkGmailAccountButton = () => {
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  async function handleClientLoad() {
    //@ts-ignore
    await window.gapi.load("client:auth2", initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  async function initClient() {
    //@ts-ignore
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(function () {
        // Listen for sign-in state changes.
        //@ts-ignore
        window.gapi.auth2.getAuthInstance();
      });
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    //@ts-ignore
    window.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    //@ts-ignore
    window.gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={() => {
          handleClientLoad();
        }}
      />

      <Button text="Connect google account" onClick={handleAuthClick} />
    </>
  );
};

export default LinkGmailAccountButton;
