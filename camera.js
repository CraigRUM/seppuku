const camera = (<video autoPlay={true} id="videoElement"></video>);

const domContainer = document.querySelector('#camera_container');
ReactDOM.render(camera, domContainer);

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}