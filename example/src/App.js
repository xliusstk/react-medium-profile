import React, { Component } from "react";

import MediumProfile from "react-medium-profile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "dee.aye.en"
    };
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px"
        }}
      >
        <h2 style={{ marginBottom: "60px" }}>{"<MediumProfile />"}</h2>
        <MediumProfile username={this.state.username} />
        <h1 style={{ margin: 0, paddingTop: "15px" }}>👆</h1>
        <h5
          style={{
            textAlign: "center",
            margin: 0,
            paddingTop: "5px",
            marginBottom: "20px"
          }}
          onClick={() => this.setState({ username: "treyhuffine" })}
        >
          Click the button to fetch my Medium profile
        </h5>
        <div
          style={{
            borderTop: "0.2px solid lightgray",
            borderBottom: "0.2px solid lightgray",
            width: "100%"
          }}
        >
          <h4>props</h4>
          <div style={{ marginLeft: "15px" }}>
            <h4>
              username: string <span style={{ color: "gray" }}>required</span>
            </h4>
            <h4>
              size: number <span style={{ color: "gray" }}>optional</span>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
