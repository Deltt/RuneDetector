const feedback = document.getElementById('feedback');
const marker = document.getElementById('marker');

marker.addEventListener('markerFound', () => {
    feedback.textContent = 'Marker detected!';
});

marker.addEventListener('markerLost', () => {
    feedback.textContent = 'Point camera at marker';
});
