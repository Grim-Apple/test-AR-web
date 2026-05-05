document.addEventListener("DOMContentLoaded", async () => {
    const menuContainer = document.getElementById("menu-items");
    const categoryFilters = document.getElementById("category-filters");
    const viewer = document.getElementById("ar-viewer");
    const loader = document.getElementById("loader");

    let allModels = [];
    let currentCategory = "Pizza";

    // Show loading spinner
    const showLoader = () => { loader.style.display = "flex"; };
    const hideLoader = () => { loader.style.display = "none"; };

    // Map categories to icons
    const categoryIcons = {
        "Pizza": "🍕",
        "Pasta": "🍝",
        "Pastries": "🥐"
    };

    const renderModels = (category) => {
        menuContainer.innerHTML = "";
        
        const filteredModels = allModels.filter(m => m.category === category);

        filteredModels.forEach((model) => {
            const item = document.createElement("div");
            item.className = "menu-item";
            if (viewer.src.includes(model.glb)) {
                item.classList.add("selected");
            }

            item.innerHTML = `
                <div class="item-icon">${categoryIcons[model.category] || "🍽️"}</div>
                <div class="item-name">${model.name}</div>
                <div class="item-category">${model.category}</div>
            `;

            item.addEventListener("click", () => {
                // Update selection UI
                document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("selected"));
                item.classList.add("selected");
                
                loadModel(model);
            });

            menuContainer.appendChild(item);
        });
    };

    const loadModel = (model) => {
        showLoader();
        viewer.src = model.glb;
        
        if (model.usdz) {
            viewer.setAttribute("ios-src", model.usdz);
        } else {
            viewer.removeAttribute("ios-src");
        }
    };

    // Hide loader when the model finishes loading
    viewer.addEventListener('load', () => {
        hideLoader();
    });

    try {
        const response = await fetch("module/models.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch models.json (Status: ${response.status})`);
        }
        allModels = await response.json();

        if (!allModels || allModels.length === 0) {
            menuContainer.innerHTML = "<p style='color: white; padding: 20px;'>No models found in database</p>";
            hideLoader();
            return;
        }

        // Render initial view (Pizza)
        renderModels("Pizza");

        // Load the first Pizza model by default
        const defaultModel = allModels.find(m => m.category === "Pizza");
        if (defaultModel) {
            loadModel(defaultModel);
        }

        // Setup category filter listeners
        categoryFilters.addEventListener("click", (e) => {
            const btn = e.target.closest(".category-btn");
            if (!btn) return;

            // Update active button UI
            document.querySelectorAll(".category-btn").forEach(el => el.classList.remove("active"));
            btn.classList.add("active");

            currentCategory = btn.getAttribute("data-category");
            renderModels(currentCategory);
        });

    } catch (error) {
        console.error("Error loading models:", error);
        menuContainer.innerHTML = `<p style='color: white; padding: 20px;'>Error: ${error.message}<br><small>Please check if module/models.json exists and is valid JSON.</small></p>`;
        hideLoader();
    }
});
