const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, and paly

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        //catch erroe here
        console.log('Woopes the error is here:', error)
    }
}

button.addEventListener('click', async() => {
    // button disaable
    button.disabled = true;
    // start Picture in Picture 
    await videoElement.requestPictureInPicture();

    //button able
    button.disabled = false;
});

//on load 
selectMediaStream();