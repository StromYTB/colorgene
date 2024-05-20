document.addEventListener('DOMContentLoaded', () => {
    const colorDisplay = document.getElementById('color-display');
    const colorCode = document.getElementById('color-code');
    const generateColorBtn = document.getElementById('generate-color-btn');
    const saveColorBtn = document.getElementById('save-color-btn');
    const favoriteColorsContainer = document.getElementById('favorite-colors');

    const MAX_FAVORITES = 10;
    let favoriteColors = JSON.parse(localStorage.getItem('favoriteColors')) || [];

    const updateFavoritesDisplay = () => {
        favoriteColorsContainer.innerHTML = '';
        favoriteColors.forEach((color, index) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'favorite-color';
            const colorSpan = document.createElement('span');
            colorSpan.textContent = color;
            colorDiv.style.backgroundColor = color;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Odstranit';
            deleteBtn.onclick = () => {
                favoriteColors.splice(index, 1);
                localStorage.setItem('favoriteColors', JSON.stringify(favoriteColors));
                updateFavoritesDisplay();
            };

            colorDiv.appendChild(colorSpan);
            colorDiv.appendChild(deleteBtn);
            favoriteColorsContainer.appendChild(colorDiv);
        });
    };

    const generateRandomColor = () => {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        colorDisplay.style.backgroundColor = randomColor;
        colorCode.textContent = randomColor;
    };

    generateColorBtn.addEventListener('click', generateRandomColor);

    saveColorBtn.addEventListener('click', () => {
        const currentColor = colorCode.textContent;
        if (favoriteColors.length >= MAX_FAVORITES) {
            alert('Limit oblíbených barev je 10.');
            return;
        }
        if (!favoriteColors.includes(currentColor)) {
            favoriteColors.push(currentColor);
            localStorage.setItem('favoriteColors', JSON.stringify(favoriteColors));
            updateFavoritesDisplay();
        } else {
            alert('Tuto barvu už máte v oblíbených!');
        }
    });

    generateRandomColor();
    updateFavoritesDisplay();
});