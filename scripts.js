const startCameraBtn = document.getElementById('startCameraBtn');
const cameraPreview = document.getElementById('cameraPreview');
const statusText = document.getElementById('status');

async function startCamera() {
    statusText.textContent = 'Requesting camera permission...';
    startCameraBtn.disabled = true;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        cameraPreview.srcObject = stream;
        statusText.textContent = 'Camera started';
    } catch (err) {
        console.error('Error accessing camera:', err);
        statusText.textContent = 'Camera access denied or unavailable';
        startCameraBtn.disabled = false;
    }
}

startCameraBtn.addEventListener('click', startCamera);

// --- Marker feedback ---
document.addEventListener('DOMContentLoaded', () => {
    const marker = document.querySelector('#arMarker');

    if (!marker) return;

    marker.addEventListener('markerFound', () => {
        statusText.textContent = 'Marker detected!';
        statusText.style.color = 'green';
    });

    marker.addEventListener('markerLost', () => {
        statusText.textContent = 'Marker lost';
        statusText.style.color = '#555';
    });
});
