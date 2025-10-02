document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startOverlay = document.getElementById("start-overlay");
  const scene = document.getElementById("ar-scene");

startButton.addEventListener("click", () => {
  startOverlay.style.display = "none";
  scene.style.display = "block";

  // Let AR.js handle camera initialization
  const arScene = scene;
  if (arScene.components['arjs'] && arScene.components['arjs'].arSource) {
    arScene.components['arjs'].arSource.init(() => {
      console.log("✅ AR.js camera initialized.");
    });
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

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  alert("Camera API not supported by this browser.");
}