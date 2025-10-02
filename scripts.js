document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startOverlay = document.getElementById("start-overlay");
  const scene = document.getElementById("ar-scene");

  startButton.addEventListener("click", () => {
    // Hide overlay
    startOverlay.style.display = "none";

    // AR.js handles the camera automatically
    const arScene = scene;

    // Wait for AR.js to be ready
    const checkAR = setInterval(() => {
      const arSource = arScene.components["arjs"]?.arSource;
      if (arSource && arSource.ready) {
        clearInterval(checkAR);
        console.log("✅ AR.js camera initialized.");

        // Marker and model events
        const marker = document.querySelector("a-marker");
        const model = document.getElementById("model");

        marker.addEventListener("markerFound", () => console.log("🔎 Marker detected!"));
        marker.addEventListener("markerLost", () => console.log("❌ Marker lost."));
        model.addEventListener("model-loaded", () => console.log("✅ 3D model loaded!"));
      }
    }, 100);
  });
});
