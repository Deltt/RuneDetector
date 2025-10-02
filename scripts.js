document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startOverlay = document.getElementById("start-overlay");
  const scene = document.getElementById("ar-scene");

  startButton.addEventListener("click", () => {
    // Hide overlay
    startOverlay.style.display = "none";
    scene.style.display = "block";

    // Wait until AR.js is ready
    const checkAR = setInterval(() => {
      const arSource = scene.components["arjs"]?.arSource;
      if (arSource && arSource.ready) {
        clearInterval(checkAR);
        console.log("✅ AR.js camera initialized.");

        // Optional: start tracking
        const marker = document.querySelector("a-marker");
        const model = document.getElementById("model");

        // Log marker events
        marker.addEventListener("markerFound", () => console.log("🔎 Marker detected!"));
        marker.addEventListener("markerLost", () => console.log("❌ Marker lost."));

        // Log model loaded
        model.addEventListener("model-loaded", () => console.log("✅ 3D model loaded!"));
      }
    }, 100);
  });
});
