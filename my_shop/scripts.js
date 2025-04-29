document.addEventListener('DOMContentLoaded', () => {
    /*porte des etoiles*/
    const stars = document.querySelectorAll('.star-rating i');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            const starContainer = star.parentElement;
            starContainer.setAttribute('data-rating', rating);

            
            starContainer.querySelectorAll('i').forEach(s => {
               
                if (parseInt(s.getAttribute('data-value')) <= rating) {
                    s.classList.remove('bi-star');
                    s.classList.add('bi-star-fill');
                } else {
                    s.classList.remove('bi-star-fill');
                    s.classList.add('bi-star');
                }
            });
        });
    });

    /*le plus enervant*/

    const slider = document.getElementById("slider");
    const thumbMin = document.getElementById("thumbMin");
    const thumbMax = document.getElementById("thumbMax");
    const range = document.getElementById("range");

    const sliderWidth = slider.offsetWidth;
    const maxValue = 10000;

    let currentMin = 0;
    let currentMax = maxValue;


    function positionToValue(position) {
        return Math.round((position / sliderWidth) * maxValue);
    }

    function valueToPosition(value) {
        return (value / maxValue) * sliderWidth;
    }

    function updateSlider() {
        const minPosition = valueToPosition(currentMin);
        const maxPosition = valueToPosition(currentMax);

        thumbMin.style.left = `${minPosition}px`;
        thumbMax.style.left = `${maxPosition}px`;

        range.style.left = `${minPosition}px`;
        range.style.width = `${maxPosition - minPosition}px`;

        document.getElementById("priceMinLabel").textContent = `$${currentMin}`;
        document.getElementById("priceMaxLabel").textContent = `$${currentMax}+`;
    }

    function attachDrag(thumb, isMin) {
        thumb.addEventListener("mousedown", (e) => {
            e.preventDefault();
            const onMouseMove = (moveEvent) => {
                let newPosition = moveEvent.clientX - slider.getBoundingClientRect().left;

                newPosition = Math.max(0, Math.min(sliderWidth, newPosition));
                const newValue = positionToValue(newPosition);

                if (isMin) {
                    if (newValue < currentMax) currentMin = newValue;
                } else {
                    if (newValue > currentMin) currentMax = newValue;
                }

                updateSlider();
            };
            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    }

    attachDrag(thumbMin, true);
    attachDrag(thumbMax, false);
    updateSlider();

    /*pagination*/

    const paginationItems = document.querySelectorAll('.pagination .page-item');

    paginationItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            paginationItems.forEach((item) => {
                item.classList.remove('active');
            });

            item.classList.add('active');

            const pageNumber = item.textContent.trim();
            console.log(`Page sélectionnée : ${pageNumber}`);
        });
    });
});


