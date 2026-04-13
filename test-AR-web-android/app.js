/**
 * component: menu-button
 * description: Handles the interactive menu buttons for selecting food items.
 * ES5 compatible version for maximum mobile support.
 */
if (typeof AFRAME !== 'undefined') {
    AFRAME.registerComponent('menu-button', {
        schema: {
            target: {type: 'selector'}
        },
        init: function () {
            var data = this.data;
            var el = this.el;

            // Visual states
            var COLORS = {
                DEFAULT: '#4CAF50',
                HOVER: '#66bb6a',
                ACTIVE: '#2e7d32'
            };

            // When the button is clicked (works for mouse and touch)
            el.addEventListener('click', function () {
                // Provide immediate visual feedback
                el.setAttribute('material', 'color', COLORS.ACTIVE);
                setTimeout(function () {
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
                    for (var i = 0; i < items.length; i++) {
                        items[i].setAttribute('visible', 'false');
                    }
                }

                // Show and animate the target item
                if (data.target) {
                    data.target.setAttribute('visible', 'true');
                    // Reset rotation
                    data.target.setAttribute('rotation', '0 0 0');
                    
                    // Add a subtle "pop" scale animation
                    data.target.setAttribute('scale', '0.1 0.1 0.1');
                    data.target.removeAttribute('animation__scale');
                    data.target.setAttribute('animation__scale', {
                        property: 'scale',
                        to: '1 1 1',
                        dur: 500,
                        easing: 'easeOutBack'
                    });
                }
            });

            // Hover feedback
            el.addEventListener('mouseenter', function () {
                el.setAttribute('material', 'color', COLORS.HOVER);
            });

            el.addEventListener('mouseleave', function () {
                el.setAttribute('material', 'color', COLORS.DEFAULT);
            });
        }
    });
}

/**
 * Loader hiding logic is now primarily handled by the inline script in index.html
 * to ensure it runs even if this script fails registration.
 * This block acts as a secondary backup.
 */
document.addEventListener('DOMContentLoaded', function() {
    var scene = document.querySelector('a-scene');
    if (scene) {
        scene.addEventListener('loaded', function() {
            var loader = document.getElementById('custom-loader');
            if (loader && !loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                setTimeout(function() { loader.style.display = 'none'; }, 600);
            }
        });
    }
});
