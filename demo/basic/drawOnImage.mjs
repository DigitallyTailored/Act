export default {
    values: v => ({
        imageUrl: '',
        lineWidth: 5,
        lineColor: 'black',
    }),

    style: v => `
        canvas {
            border: 1px solid #ccc;
            cursor: crosshair;
        }
        .controls {
            display: flex;
            margin-bottom: 10px;
        }
        .controls input {
            margin-right: 5px;
        }
    `,

    view: v => `
        <div>
            <div class="controls">
                <input type="color" value="${v.lineColor}" class="color-picker">
                <input type="number" value="${v.lineWidth}" class="line-width" min="1">
                <button class="save-button">Save</button>
            </div>
            <img src="${v.imageUrl}" style="display:none;">
            <canvas></canvas>
        </div>
    `,

    script: v => {
        const img = v.act.find('img');
        img.crossOrigin = 'anonymous'; // Add this line
        const canvas = v.act.find('canvas');
        const ctx = canvas.getContext('2d');
        const colorPicker = v.act.find('.color-picker');
        const lineWidthInput = v.act.find('.line-width');
        const saveButton = v.act.find('.save-button');

        let drawing = false;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };

        const startDrawing = (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        const draw = (e) => {
            if (!drawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineWidth = v.lineWidth;
            ctx.strokeStyle = v.lineColor;
            ctx.stroke();
        };

        const stopDrawing = () => {
            drawing = false;
        };

        const updateLineColor = (e) => {
            v.lineColor = e.target.value;
        };

        const updateLineWidth = (e) => {
            v.lineWidth = parseInt(e.target.value, 10);
        };

        const saveImage = () => {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'drawn_image.png';
            link.click();
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        colorPicker.addEventListener('input', updateLineColor);
        lineWidthInput.addEventListener('input', updateLineWidth);
        saveButton.addEventListener('click', saveImage);
    }
};