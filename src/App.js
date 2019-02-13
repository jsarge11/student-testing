import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    url: ''
  }
  getSignedRequest = (e) => {
    let file = e.target.files[0];

    axios.get('/sign-s3', {
      params: {
        'file-name': file.name,
        'file-type': file.type
      }
    }).then( (response) => {
      const { signedRequest, url } = response.data 
      this.uploadFile(signedRequest, file, url)

    }).catch( err => {
      console.log(err)
    })
  }

  uploadFile = (signedRequest, file, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
    axios
    .put(signedRequest, file, options)
    .then(response => {
      this.setState({ isUploading: false, url });
      // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
    })
    .catch(err => {
      this.setState({
        isUploading: false,
      });
      if (err.response.status === 403) {
        alert(
          `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
            err.stack
          }`
        );
      } else {
        alert(`ERROR: ${err.status}\n ${err.stack}`);
      }
    });
};
  
  
  render() {
    return (
      <div className="App">
       <input type="file" onChange={this.getSignedRequest}/>
       <img src={this.state.url} alt="uploaded" />
      </div>
    );
  }
}

export default App;
