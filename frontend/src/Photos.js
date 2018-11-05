import React, { Component } from "react";
import PhotoUpload from "./PhotoUpload";

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
  render() {
    return (
      <div className="photo-upload">
        <div>
          {this.props.nextButton()}
          <h2>Add up to 5 photos of your property</h2>
          <hr />
          <div class="upload-container">
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
            <PhotoUpload
              onSubmit={value => {
                let photos = this.state.photos;
                photos.push(value);
                this.setState({ photos });
              }}
            />
            <p>
              Showcase your property’s best features (no pets or people,
              please). Requirements: JPEG, at least 1920 x 1080 pixels, less
              than 20MB file size, 6 photos minimum.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Photos;
