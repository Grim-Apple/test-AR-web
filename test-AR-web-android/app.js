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

            // Visual states for the green buttons
            var COLORS = {
                DEFAULT: '#4CAF50',
                HOVER: '#66bb6a',
                ACTIVE: '#2e7d32'
            };

            // Touch and Click handling
            el.addEventListener('click', function () {
                // Immediate button feedback
                el.setAttribute('material', 'color', COLORS.ACTIVE);
                setTimeout(function () {
                    el.setAttribute('material', 'color', COLORS.HOVER);
                }, 200);

                // Hide the "Select item" prompt
                var prompt = document.getElementById('prompt-text');
                if (prompt) prompt.setAttribute('visible', 'false');

                // Hide all other showcase items
                var showcase = document.getElementById('food-showcase');
                if (showcase) {
                    var items = showcase.querySelectorAll('[id^="item-"]');
                    for (var i = 0; i < items.length; i++) {
                        items[i].setAttribute('visible', 'false');
                    }
                }

                // Show selected food item and animate "pop in"
                if (data.target) {
                    data.target.setAttribute('visible', 'true');
                    data.target.setAttribute('scale', '0.1 0.1 0.1');
                    
                    // Native A-Frame animation call
                    data.target.setAttribute('animation__scale', {
                        property: 'scale',
                        to: '1 1 1',
                        dur: 500,
                        easing: 'easeOutBack'
                    });
                }
            });

            // Mobile-friendly hover effect
            el.addEventListener('mouseenter', function () {
                el.setAttribute('material', 'color', COLORS.HOVER);
            });
            el.addEventListener('mouseleave', function () {
                el.setAttribute('material', 'color', COLORS.DEFAULT);
            });
        }
    });
}
