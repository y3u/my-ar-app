export class ScreenEditor {
    render(container) {
        container.innerHTML = `
            <h2>Screen Editor</h2>
            <input type="file" id="imageUpload" accept="image/*">
            <div id="imagePreview"></div>
        `;

        this.addEventListeners(container);
    }

    addEventListeners(container) {
        container.querySelector('#imageUpload').addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    container.querySelector('#imagePreview').innerHTML = '';
                    container.querySelector('#imagePreview').appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}
