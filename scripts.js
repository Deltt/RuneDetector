document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("start-overlay");
  const button = document.getElementById("start-button");

  button.addEventListener("click", () => {
    // Hide overlay
    overlay.style.display = "none";

    // Wait until AR.js is ready
    const scene = document.getElementById("ar-scene");
    const checkAR = setInterval(() => {
      const arSource = scene.components["arjs"]?.arSource;
      if (arSource && arSource.ready) {
        clearInterval(checkAR);
        console.log("✅ AR.js camera ready");

        const marker = document.querySelector("a-marker");
        const model = document.querySelector("a-entity[gltf-model]");

        marker.addEventListener("markerFound", () => console.log("🔎 Marker detected!"));
        marker.addEventListener("markerLost", () => console.log("❌ Marker lost."));
        model.addEventListener("model-loaded", () => console.log("✅ Model loaded"));
      }
    }, 100);
  });
});
