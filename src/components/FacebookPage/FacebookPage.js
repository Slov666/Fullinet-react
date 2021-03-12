import React, { Component } from "react";
import { FacebookProvider, Page } from "react-facebook";

export default class FacebookPage extends Component {
  render() {
    return (
      <FacebookProvider appId="460843501655997">
        <Page
          href="https://www.facebook.com/Fullinet-1409833259236644/"
          tabs="timeline"
          width="500"
        />
      </FacebookProvider>
    );
  }
}
