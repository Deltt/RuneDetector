const video = document.getElementById('camera');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }, // back camera
            audio: false
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing camera: ", err);
        alert("Camera access denied or not available.");
    }
}

window.addEventListener('load', () => {
    startCamera();
});

document.getElementById('start-btn').addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        document.getElementById('camera').srcObject = stream;
        document.getElementById('start-btn').style.display = 'none';
    } catch (err) {
        alert("Camera access denied or not available.");
        console.error(err);
    }
});
