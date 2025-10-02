const startBtn = document.getElementById('startCameraBtn');
const status = document.getElementById('status');
const arScene = document.getElementById('arScene');
const marker = document.getElementById('arMarker');

startBtn.addEventListener('click', () => {
    arScene.style.display = 'block';
    status.textContent = 'Camera started';
    startBtn.style.display = 'none';
});

marker.addEventListener('markerFound', () => {
    status.textContent = 'Marker detected!';
    status.style.color = 'green';
});

marker.addEventListener('markerLost', () => {
    status.textContent = 'Marker lost';
    status.style.color = '#555';
});
