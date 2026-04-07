AFRAME.registerComponent('menu-button', {
    schema: {
        target: {type: 'selector'}
    },
    init: function () {
        var data = this.data;
        var el = this.el;

        // When the button is clicked
        el.addEventListener('click', function () {
            // Hide the prompt text
            var prompt = document.getElementById('prompt-text');
            if (prompt) {
                prompt.setAttribute('visible', 'false');
            }

            // Hide all other items inside the showcase
            var showcase = document.getElementById('food-showcase');
            var items = showcase.querySelectorAll('[id^="item-"]');
            items.forEach(function(item) {
                item.setAttribute('visible', 'false');
            });

            // Show the target item
            if (data.target) {
                data.target.setAttribute('visible', 'true');
            }
        });

        // Hover visual feedback (color changes)
        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', '#45a049');
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', '#4CAF50');
        });
    }
});
