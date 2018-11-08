import React, { Component } from "react";
import axios from "axios";

class PhotoUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      isUploaded: false,
      url: null
    };
  }

  submitFile = () => {
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post("http://54.193.84.204:3001/PhotoUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        this.setState({ isUploaded: true, url: response.data.Location });
        this.props.onSubmit(response.data.Location);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.file === null && this.state.file !== null) {
      this.submitFile();
    }
  }
  render() {
    return (
      <form
        className={`photo-form${this.state.isUploaded ? " active" : ""}`}
        style={{
          backgroundImage: this.state.isUploaded
            ? `url(${this.state.url})`
            : "none"
        }}
      >
        <input
          label="upload file"
          type="file"
          onChange={this.handleFileUpload}
        />
      </form>
    );
  }
}

export default PhotoUpload;
