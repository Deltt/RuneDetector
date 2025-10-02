// Global variables
let arScene;
let marker;
let modelEntity;
let cameraPermissionGranted = false;

// Update status text
function updateStatus(text) {
    const statusText = document.getElementById('status-text');
    if (statusText) {
        statusText.textContent = text;
    }
}

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Request camera permissions
async function requestCameraPermission() {
    try {
        updateStatus('Requesting camera access...');
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        
        // Stop the stream immediately - we just needed permission
        stream.getTracks().forEach(track => track.stop());
        
        cameraPermissionGranted = true;
        return true;
    } catch (err) {
        console.error('Camera permission denied:', err);
        alert('Camera access is required for AR functionality. Please grant camera permissions and reload the page.');
        return false;
    }
}

// Initialize AR experience
async function initAR() {
    const loadingScreen = document.getElementById('loading-screen');
    const permissionScreen = document.getElementById('permission-screen');
    const arContainer = document.getElementById('ar-container');
    
    // For mobile devices, show permission request first
    if (isMobileDevice()) {
        loadingScreen.style.display = 'none';
        permissionScreen.style.display = 'flex';
        
        document.getElementById('grant-permission').addEventListener('click', async () => {
            const granted = await requestCameraPermission();
            
            if (granted) {
                permissionScreen.style.display = 'none';
                loadingScreen.style.display = 'flex';
                updateStatus('Starting AR...');
                
                setTimeout(() => {
                    startARScene();
                }, 500);
            }
        });
    } else {
        // For desktop, request permission directly
        const granted = await requestCameraPermission();
        
        if (granted) {
            updateStatus('Starting AR...');
            setTimeout(() => {
                startARScene();
            }, 500);
        }
    }
}

// Start the AR scene
function startARScene() {
    const loadingScreen = document.getElementById('loading-screen');
    const arContainer = document.getElementById('ar-container');
    
    arContainer.style.display = 'block';
    
    // Get AR scene elements
    arScene = document.querySelector('a-scene');
    marker = document.getElementById('marker');
    modelEntity = document.getElementById('model-entity');
    
    // Wait for scene to load
    if (arScene.hasLoaded) {
        onSceneLoaded();
    } else {
        arScene.addEventListener('loaded', onSceneLoaded);
    }
}

// Handle scene loaded
function onSceneLoaded() {
    const loadingScreen = document.getElementById('loading-screen');
    
    console.log('AR Scene loaded successfully');
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);
    
    // Set up marker event listeners
    if (marker) {
        marker.addEventListener('markerFound', onMarkerFound);
        marker.addEventListener('markerLost', onMarkerLost);
    }
    
    // Adjust model properties if needed
    if (modelEntity) {
        // You can adjust scale, position, rotation here
        console.log('Model entity ready');
    }
}

// Marker found event
function onMarkerFound() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusMessage = document.getElementById('status-message');
    
    console.log('Marker detected!');
    
    if (statusIndicator) {
        statusIndicator.classList.add('found');
    }
    
    if (statusMessage) {
        statusMessage.textContent = 'Marker detected!';
    }
}

// Marker lost event
function onMarkerLost() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusMessage = document.getElementById('status-message');
    
    console.log('Marker lost');
    
    if (statusIndicator) {
        statusIndicator.classList.remove('found');
    }
    
    if (statusMessage) {
        statusMessage.textContent = 'Searching for marker...';
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    console.log('Page loaded, initializing AR...');
    initAR();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Prevent page scaling on mobile
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});