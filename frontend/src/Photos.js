import React, { Component } from "react";
<<<<<<< HEAD
import Dropzone from "react-dropzone";
import axios from "axios";

class Photos extends Component {
  handleOnDrop = (files, rejectedFiles) => {
    let file = new FormData();
    file.append("selectedFile", files[0]);
    console.log(files);
    axios.post("http://localhost:3001/AddPhoto", file).then(result => {
      console.log("Result is", result);
    });
  };
=======
import PhotoUpload from "./PhotoUpload";
import axios from "axios";

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }
  componentWillUnmount() {
    this.props.onChange(this.state.photos);
  }
>>>>>>> 04bbdbe7cc85a8328771eabb4d3e9bebedde2c0b
  render() {
    console.log(this.state.photos);
    return (
      <div className="layout">
        <div className="panel panel-default">
<<<<<<< HEAD
          {/* {this.props.nextButton()} */}
=======
          {this.props.nextButton()}
>>>>>>> 04bbdbe7cc85a8328771eabb4d3e9bebedde2c0b
          <h2>Add up to 50 photos of your property</h2>
          <hr />
          <div>
            <PhotoUpload
              onSubmit={value => {
                let photos = this.state.photos;
                photos.push(value);
                this.setState({ photos });
              }}
            />
            <PhotoUpload
              onSubmit={value => {
                let photos = this.state.photos;
                photos.push(value);
                this.setState({ photos });
              }}
            />
            Showcase your property’s best features (no pets or people, please).
            Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file
            size, 6 photos minimum.
          </div>
        </div>
      </div>
    );
  }
}

export default Photos;
