import React, { Component } from "react";
import PropTypes from "prop-types";
import MediumLogo from "./medium.png";

import styles from "./styles.css";

export default class MediumProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: undefined,
      items: undefined
    };
  }
  static defaultProps = {
    username: "dee.aye.en",
    size: 100
  };
  static propTypes = {
    username: PropTypes.string,
    size: PropTypes.number
  };
  componentDidMount() {
    fetch(
      `https://medium-profile-fetch.herokuapp.com/profile/@${this.props.username}`
    )
      .then(result => result.json())
      .then(data => {
        console.log(data.feed);
        var filtered = data.items.filter(item => item.categories.length > 0);
        console.log(filtered[0]);
        this.setState({ items: filtered });
      });
  }
  render() {
    console.log(this.props);
    return (
      <div
        style={{
          width: `${this.props.size}px`,
          height: `${this.props.size}px`,
          cursor: "pointer",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }}
      >
        <img style={{ width: "100%", height: "100%" }} src={MediumLogo} />
      </div>
    );
  }
}
