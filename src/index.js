import React, { Component } from "react";
import PropTypes from "prop-types";
import MediumLogo from "./medium.png";
import Modal, { closeStyle } from "simple-react-modal";
import FadeIn from "react-fade-in";

export default class MediumProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: undefined,
      image: undefined,
      items: undefined,
      error: false,
      show: false
    };
    this.open = this.open.bind(this);
  }
  static defaultProps = {
    username: "dee.aye.en",
    size: 100
  };
  static propTypes = {
    username: PropTypes.string,
    size: PropTypes.number
  };
  open() {
    this.setState({ show: true, loading: true });
    fetch(
      `https://medium-profile-fetch.herokuapp.com/profile/@${this.props.username}`
    )
      .then(result => result.json())
      .then(data => {
        if (data.status === "ok") {
          this.setState({
            items: data.items,
            title: data.feed.title,
            image: data.feed.image,
            loading: false
          });
        } else {
          this.setState({
            items: [],
            image: MediumLogo,
            error: true,
            loading: false
          });
        }
      });
  }
  render() {
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
        <img
          onClick={() => this.open()}
          style={{ width: "100%", height: "100%" }}
          src={MediumLogo}
        />
        <Modal
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          containerStyle={{
            border: "2px solid black",
            padding: "15px",
            width: "70vw",
            cursor: "auto",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
          closeOnOuterClick={true}
          show={this.state.show}
          onClose={() => this.setState({ show: false })}
        >
          <a
            style={{ ...closeStyle, color: "white", backgroundColor: "black" }}
            onClick={() => this.setState({ show: false })}
          >
            X
          </a>
          {!this.state.loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
            >
              <img
                src={this.state.image}
                width="80px"
                style={{
                  borderRadius: 40,
                  marginTop: "5px",
                  marginBottom: "15px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                }}
              />
              <div
                style={{
                  borderBottom: "1px solid lightgray",
                  marginBottom: "10px",
                  paddingBottom: "20px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {!this.state.error ? (
                  <h5
                    style={{
                      margin: 0,
                      padding: 0,
                      fontWeight: "lighter"
                    }}
                  >
                    Latest activity by{" "}
                    <a
                      style={{ fontWeight: "bolder", color: "black" }}
                      href={`https://medium.com/@${this.props.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {this.state.items.length > 0
                        ? this.state.items[0].author
                        : this.props.username}
                    </a>{" "}
                    on
                  </h5>
                ) : (
                  <h5
                    style={{
                      margin: 0,
                      padding: 0,
                      fontWeight: "lighter"
                    }}
                  >
                    User not found
                  </h5>
                )}
                <img
                  style={{ marginLeft: "5px" }}
                  src={MediumLogo}
                  width="20px"
                />
              </div>
              <FadeIn>
                {this.state.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px"
                      //width: "90%"
                    }}
                  >
                    <img
                      style={{
                        //border: "1px solid black",
                        marginRight: "20px",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                      }}
                      src={
                        item.content[2] !== "p" ? item.thumbnail : MediumLogo
                      }
                      width="80px"
                    />
                    <div
                      style={{
                        margin: 0,
                        padding: 0,
                        color: "gray",
                        fontWeight: "lighter"
                      }}
                    >
                      <a
                        style={{ color: "gray" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.link}
                      >
                        {item.title}
                      </a>
                    </div>
                  </div>
                ))}
              </FadeIn>
            </div>
          ) : (
            <div>
              <FadeIn>
                <h3
                  style={{
                    margin: 0,
                    padding: 0,
                    textAlign: "center",
                    color: "lightgray",
                    margin: "100px"
                  }}
                >
                  Fetching {this.props.username.toUpperCase()}...
                </h3>
              </FadeIn>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}
