document.addEventListener("DOMContentLoaded", async () => {
    const selector = document.getElementById("model-selector");
    const viewer = document.getElementById("ar-viewer");
    const loader = document.getElementById("loader");

    // Show loading spinner
    const showLoader = () => { loader.style.display = "flex"; };
    const hideLoader = () => { loader.style.display = "none"; };

    try {
        // Fetch the directory listing of the module folder
        const response = await fetch("module/");
        if (!response.ok) {
            throw new Error("Failed to fetch module directory. Ensure your server allows directory listing.");
        }
        const htmlText = await response.text();

        // Parse HTML to extract .glb files
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'));
        
        // Find .usdz files to pair them if they exist
        const usdzFiles = links
            .map(l => l.getAttribute('href'))
            .filter(href => href && href.toLowerCase().endsWith('.usdz'))
            .map(href => decodeURIComponent(href.split('/').pop()));

        const models = [];
        links.forEach(link => {
            let href = link.getAttribute('href');
            if (href && href.toLowerCase().endsWith('.glb')) {
                // Extract filename
                const parts = href.split('/');
                let filename = decodeURIComponent(parts[parts.length - 1]);
                
                // Format name
                let name = filename.replace(/\.glb$/i, '');
                
                // Check if matching usdz exists
                let usdzFilename = name + '.usdz';
                let hasUsdz = usdzFiles.includes(usdzFilename);
                
                models.push({
                    name: name,
                    glb: `module/${filename}`,
                    usdz: hasUsdz ? `module/${usdzFilename}` : null
                });
            }
        });

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
