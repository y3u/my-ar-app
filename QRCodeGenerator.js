export class QRCodeGenerator {
    render(container) {
        container.innerHTML = `
            <h2>QR Code Generator</h2>
            <button id="generateQR">Generate QR Code</button>
            <div id="qrcode"></div>
        `;

        this.addEventListeners(container);
    }

    addEventListeners(container) {
        container.querySelector('#generateQR').addEventListener('click', () => {
            const url = window.location.href;
            const qrContainer = container.querySelector('#qrcode');
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, url);
        });
    }
}
