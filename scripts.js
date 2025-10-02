const startCameraBtn = document.getElementById('startCameraBtn');
const cameraPreview = document.getElementById('cameraPreview');
const statusText = document.getElementById('status');

async function startCamera() {
    statusText.textContent = 'Requesting camera permission...';
    startCameraBtn.disabled = true;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        cameraPreview.srcObject = stream;
        cameraPreview.style.display = 'block'; // show video
        startCameraBtn.style.display = 'none'; // hide button
        statusText.textContent = '';
    } catch (err) {
        console.error('Error accessing camera:', err);
        statusText.textContent = 'Camera access denied or unavailable';
        startCameraBtn.disabled = false;
    }
}

startCameraBtn.addEventListener('click', startCamera);
