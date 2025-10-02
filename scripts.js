document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startOverlay = document.getElementById("start-overlay");
  const scene = document.getElementById("ar-scene");

  startButton.addEventListener("click", async () => {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      // If permission granted, hide overlay and show scene
      startOverlay.style.display = "none";
      scene.style.display = "block";

      // Set the video stream for AR.js
      const arSource = scene.components["arjs"].arSource;
      arSource.domElement.srcObject = stream;

    } catch (err) {
      alert("Camera access denied or unavailable. Please allow camera permissions.");
      console.error(err);
    }
  });

  // Optional: Log when model is loaded
  const model = document.getElementById("model");
  model.addEventListener("model-loaded", () => {
    console.log("✅ 3D model loaded!");
  });

  // Marker detection logging
  const marker = document.querySelector("a-marker");
  marker.addEventListener("markerFound", () => console.log("🔎 Marker detected!"));
  marker.addEventListener("markerLost", () => console.log("❌ Marker lost."));
});
