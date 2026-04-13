/**
 * component: menu-button
 * description: V2.2 Bulletproof Interaction - Works with both Tap and Fuse Cursor.
 */
if (typeof AFRAME !== 'undefined') {
    AFRAME.registerComponent('menu-button', {
        schema: {
            target: {type: 'selector'}
        },
        init: function () {
            var data = this.data;
            var el = this.el;

            // Handle selection (shared logic)
            function doSelect() {
                // Button Feedback
                el.setAttribute('material', 'color', '#2e7d32');
                setTimeout(function () {
                    el.setAttribute('material', 'color', '#4CAF50');
                }, 400);

                // Hide prompt
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

                // Show selected food item
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
            }

            // Bind events for both Cursor (Fuse) and direct Mouse/Touch
            el.addEventListener('click', doSelect);
            el.addEventListener('touchstart', function(e) {
                e.preventDefault();
                doSelect();
            });
        }
    });
}
