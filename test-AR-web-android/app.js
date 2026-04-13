/**
 * component: menu-button
 * description: Handles the interactive menu buttons for selecting food items.
 * targets: 3D entities with class .clickable
 */
AFRAME.registerComponent('menu-button', {
    schema: {
        target: {type: 'selector'}
    },
    init: function () {
        var data = this.data;
        var el = this.el;

        // Visual states
        const COLORS = {
            DEFAULT: '#4CAF50',
            HOVER: '#66bb6a',
            ACTIVE: '#2e7d32'
        };

        // When the button is clicked (works for mouse and touch)
        el.addEventListener('click', function () {
            // Provide immediate visual feedback
            el.setAttribute('material', 'color', COLORS.ACTIVE);
            setTimeout(() => {
                el.setAttribute('material', 'color', COLORS.HOVER);
            }, 200);

            // Hide the prompt text if it exists
            var prompt = document.getElementById('prompt-text');
            if (prompt) {
                prompt.setAttribute('visible', 'false');
            }

            // Hide all other items inside the showcase
            var showcase = document.getElementById('food-showcase');
            if (showcase) {
                var items = showcase.querySelectorAll('[id^="item-"]');
                items.forEach(function(item) {
                    item.setAttribute('visible', 'false');
                });
            }

            // Show and animate the target item
            if (data.target) {
                data.target.setAttribute('visible', 'true');
                // Reset rotation to ensure animation feels fresh
                data.target.setAttribute('rotation', '0 0 0');
                
                // Add a subtle "pop" scale animation when appearing
                data.target.setAttribute('scale', '0.1 0.1 0.1');
                data.target.removeAttribute('animation__scale'); // Clean up previous
                data.target.setAttribute('animation__scale', {
                    property: 'scale',
                    to: '1 1 1',
                    dur: 500,
                    easing: 'easeOutBack'
                });
            }
        });

        // Hover visual feedback (Desktop/Mouse)
        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', COLORS.HOVER);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', COLORS.DEFAULT);
        });
    }
});

// Hide the custom loader once the A-Frame scene is fully initialized
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    if (scene) {
        scene.addEventListener('loaded', () => {
            const loader = document.getElementById('custom-loader');
            if (loader) {
                // Delay slightly for smooth transition
                setTimeout(() => {
                    loader.classList.add('hidden');
                }, 500);
            }
        });
    }
});
