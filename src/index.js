import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

export default class MediumProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: undefined,
      items: undefined
    };
  }
  static propTypes = {
    username: PropTypes.string
  };
  componentDidMount() {
    fetch(
      `https://medium-profile-fetch.herokuapp.com/profile/@${this.props.username}`
    )
      .then(result => result.json())
      .then(data => this.setState({ items: data.items }));
  }
  render() {
    return <div>{this.state.items && <p>{this.state.items.length}</p>}</div>;
  }
}
