# Simple guide on how to upload pictures in React to S3

### Be sure to add your own ENV file with the appropriate keys. AND THEN .GITIGNORE THEM

This is a very basic working model of uploading files with S3. This guide assumes you have created your Amazon keys and have them stored in a .env file. Do not push this file to github. Do not push this file to github. 
This project has a backend express server with one endpoint, and a front end with one class component that renders an input. This component has two functions.
This endpoint, and functions - will be doing all the heavy lifting for us. I'll break things out line by line. Keep in mind everything here is already coded out for you to look at, this will just provide more detailed instruction on what each thing is doing. 

## Render Method
```jsx
render() {
    return (
      <div className="App">
       <input type="file" onChange={this.getSignedRequest}/>
       <img src={this.state.url}  alt="uploaded-picture"/>
      </div>
    );
  }
```

Here, just notice that the input type is set to `file` - and the `onChange` will trigger once the file has been uploaded. 

## 1) getSignedRequest Function

In this function, we are not actually uploading the file ( we're making a request to Amazon telling them that we're about to upload the file) - they in turn will give us a URL to upload the file to. But only if we give them proper credentials, so here we gooooooo! Comments will be included inside the actual code below.

```js  
getSignedRequest = (e) => {
    let file = e.target.files[0];
    // here, we are getting the entire file, and it's properties. just like e.target.value is returning us some text on a input text onChange, we'll get an array of files that were uploaded. Since we're only uploading one - we will just pull it by referencing e.target.files[0]
    
    axios.get('/sign-s3', { //this is our own endpoint we will set up, and this is just a fancy way to send params. as long as you get the filename and type through, you can do it however you like.
      params: {
        'file-name': file.name,
        'file-type': file.type
      }
    }).then( (response) => {
     // like i said earlier, we are grabbing a "signed request" and a url, from amazon that is allowing us to actually upload the file. The url is where the file WILL be stored - but it hasn't been yet. 
     //if we successfully get a response and enter the .then, then we will call the uploadFile function (described later ) with our 
     // 1) signedRequest, 2) file (taken from above), and 3) url where the image will go 
      const { signedRequest, url } = response.data 
      this.uploadFile(signedRequest, file, url)

    }).catch( err => {
     // just catches the error of something went wrong on the server end
      console.log(err)
    })
  }
```  

Now, lets write out the endpoint that will handle this request. You'll want to pull S3_BUCKET, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY (DO NOT HARDCODE THESE INTO YOUR ENDPOINT) from your .env file, and then create a basic boilerplate for express. Also, here we'll install `aws-sdk` which is what allows us to talk to Amazon. Import `aws-sdk` as `aws` in your backend before proceeding.

# 2) AWS Endpoint
```js
//just a simple get endpoint, make sure it matches what you have on your front end. We'll write out the function here instead of putting it inside of a controller. 
app.get('/sign-s3', (req, res) => {

 //set the config object that we're going to send - make sure your region matches the region code you specified when you created your bucket, and then put your access key and secret access key on the object as well

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  // we're using a function invoked from aws, grabbing our filename and filetype
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  // and using these as a s3Params object that we are going to send to amazon (that function is accessible on the new s3 object instance we created)
  // add your bucket name, add the key as the fileName, how long the request will be active for (in seconds), filetype, and ACL as 'public-read'
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
 // now that we have our params configured, lets call the getSignedURL function (also lives on the s3 instance) tell it to 'putObject', provide the params, and as soon as that's run, it will execute a callback function we provide it.
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    // We can build our own URL here, as this is the format of the URL. Send back data if nothing erred. This data is Amazons go ahead to post something. We'll create an object called returnData, and then send that back to the front end! 
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});
```
For more examples, and documentation of working with the `aws-sdk` package please read the startup docs [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html)

Remember, we just defined the endpoint that we hit inside of out `getSignedRequest` function. Now, we're going to build out the uploadFile function since Amazon has so kindly approved our request. To recap there are three steps, and we're build out two. 
> 1. Once the file is uploaded we gather our credentials, and send them to the backend. (Finished)
> 2. We hit our backend endpoint, which takes the credentials and runs them through Amazon for approval. (Finished)
> 3. We get our approval, and upload the file to our bucket. (Next Section)

Inside of this function we are getting our signedRequest, which is actually is a URL that we will make a PUT request for using axios - then we are making the request and the response lets us know our file has been uploaded
# 3) uploadFile Function

```js
uploadFile = (signedRequest, file, url) => {
   // here we're just setting the header, as defined in the docs, to tell amazon what type of file we're going to have
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
    //and we simply make our request.
    axios
    .put(signedRequest, file, options)
    .then(response => {
      this.setState({ url });
      // Here we can do anything with the URL, setting state isn't required - but you may want to put this URL in your database.
    })
    .catch(err => {
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
```

Please reach out with any feedback, or corrections.
