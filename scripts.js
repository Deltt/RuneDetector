// Example: hook into model load or marker events
document.addEventListener("DOMContentLoaded", () => {
  const model = document.getElementById("model");

  model.addEventListener("model-loaded", () => {
    console.log("✅ 3D model loaded successfully!");
  });

  // Detect when marker is visible
  document.querySelector("a-marker").addEventListener("markerFound", () => {
    console.log("🔎 Marker found!");
  });

  document.querySelector("a-marker").addEventListener("markerLost", () => {
    console.log("❌ Marker lost!");
  });
});
