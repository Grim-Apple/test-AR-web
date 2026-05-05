document.addEventListener("DOMContentLoaded", async () => {
    const selector = document.getElementById("model-selector");
    const viewer = document.getElementById("ar-viewer");
    const loader = document.getElementById("loader");

    // Show loading spinner
    const showLoader = () => { loader.style.display = "flex"; };
    const hideLoader = () => { loader.style.display = "none"; };

    try {
        // Fetch the list of models dynamically
        const response = await fetch("module/models.json");
        const models = await response.json();

        // Clear loading text in select
        selector.innerHTML = "";

        if (models.length === 0) {
            selector.innerHTML = "<option>No models available</option>";
            hideLoader();
            return;
        }

        // Populate the dropdown
        models.forEach((model, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = model.name;
            selector.appendChild(option);
        });

        // Function to load the selected model
        const loadModel = (index) => {
            showLoader();
            const selected = models[index];
            viewer.src = selected.glb; // For Web, Android
            
            if (selected.usdz) {
                viewer.setAttribute("ios-src", selected.usdz); // For iOS Quick Look
            } else {
                viewer.removeAttribute("ios-src");
            }
        };

        // Hide loader when the model finishes loading
        viewer.addEventListener('load', () => {
            hideLoader();
        });

        // Load the first model by default
        loadModel(0);

        // Listen for user selection changes
        selector.addEventListener("change", (e) => {
            loadModel(e.target.value);
        });

    } catch (error) {
        console.error("Error loading models:", error);
        selector.innerHTML = "<option>Error loading models</option>";
        hideLoader();
    }
});
