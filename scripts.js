const feedback = document.getElementById('feedback');
const marker = document.getElementById('marker');

marker.addEventListener('markerFound', () => {
    feedback.textContent = 'Marker detected!';
    feedback.style.color = 'green';
});

marker.addEventListener('markerLost', () => {
    feedback.textContent = 'Point camera at marker';
    feedback.style.color = '#fff';
});
