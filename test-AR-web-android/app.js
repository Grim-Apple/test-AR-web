/**
 * component: menu-button
 * description: V2.1 Interaction Fix - Multi-event support (Click, Touch, Mouse)
 */
if (typeof AFRAME !== 'undefined') {
    AFRAME.registerComponent('menu-button', {
        schema: {
            target: {type: 'selector'}
        },
        init: function () {
            var data = this.data;
            var el = this.el;
            var debugBox = document.getElementById('event-debug');

            function updateDebug(msg) {
                if (debugBox) debugBox.innerHTML = "LAST EVENT: " + msg;
                console.log("BUTTON EVENT: " + msg);
            }

            // Function to handle the actual item swapping
            function handlePress() {
                updateDebug("BUTTON PRESSED");

                // Immediate Visual Feedback (Darker Green)
                el.setAttribute('material', 'color', '#2e7d32');
                setTimeout(function () {
                    el.setAttribute('material', 'color', '#4CAF50');
                }, 200);

                // Hide intro prompt
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

                // Show selected item with "pop" effect
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

            // LISTEN TO EVERY POSSIBLE INTERACTION
            el.addEventListener('click', function() { updateDebug("CLICK"); handlePress(); });
            el.addEventListener('touchstart', function(e) { 
                e.preventDefault(); // Stop double-firing
                updateDebug("TOUCHSTART"); 
                handlePress(); 
            });
            el.addEventListener('mousedown', function() { updateDebug("MOUSEDOWN"); handlePress(); });
        }
    });
}
