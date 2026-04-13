/**
 * component: menu-button
 * description: V2.0 Interactive Menu logic for selecting food items.
 */
if (typeof AFRAME !== 'undefined') {
    AFRAME.registerComponent('menu-button', {
        schema: {
            target: {type: 'selector'}
        },
        init: function () {
            var data = this.data;
            var el = this.el;

            // Visual states for buttons
            var COLORS = {
                DEFAULT: '#4CAF50',
                ACTIVE: '#2e7d32'
            };

            el.addEventListener('click', function () {
                // Button Visual Feedback
                el.setAttribute('material', 'color', COLORS.ACTIVE);
                setTimeout(function () {
                    el.setAttribute('material', 'color', COLORS.DEFAULT);
                }, 200);

                // Hide the intro prompt
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

                // Show selected item with "pop" animation
                if (data.target) {
                    data.target.setAttribute('visible', 'true');
                    data.target.setAttribute('scale', '0.1 0.1 0.1');
                    data.target.setAttribute('animation__scale', {
                        property: 'scale',
                        to: '1 1 1',
                        dur: 500,
                        easing: 'easeOutBack'
                    });
                }
            });
        }
    });
}
