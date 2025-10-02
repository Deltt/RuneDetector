const status = document.getElementById('status');
const marker = document.getElementById('marker');

marker.addEventListener('markerFound', () => {
    status.textContent = 'Marker detected!';
});

marker.addEventListener('markerLost', () => {
    status.textContent = 'Point camera at marker';
});
