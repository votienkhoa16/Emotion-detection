<><button id="start-camera">Start Camera</button><video id="video" width="320" height="240" autoplay></video><button id="click-photo">Click Photo</button><canvas id="canvas" width="320" height="240"></canvas></>
let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image    
   	console.log(image_data_url);
	   
	   let file = null;
	   //dùng blob trong html dể lưu
	   let blob = document.querySelector("#canvas").toBlob(function(blob) {
				file = new File([blob], 'test.png', { type: 'image/jpeg' });
			}, 'image/jpeg');
});