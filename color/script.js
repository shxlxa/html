let baseHue = 0; // 基础色相值

// DOM 元素
const colorArea = document.getElementById('colorArea');
const colorSlider = document.getElementById('colorSlider');
const colorDisplay = document.getElementById('colorDisplay');
const hexInput = document.getElementById('hexInput');
const rInput = document.getElementById('rInput');
const gInput = document.getElementById('gInput');
const bInput = document.getElementById('bInput');
const colorPickerDot = document.getElementById('colorPickerDot');
const hueSlider = document.getElementById('hueSlider');

// 颜色转换函数
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// 更新函数
function updateColorDisplay(hex) {
    colorDisplay.style.backgroundColor = hex;
    hexInput.value = hexInput.value.startsWith('0x') ? '0x' + hex.slice(1) : hex;
    const rgb = hexToRgb(hex);
    rInput.value = rgb.r;
    gInput.value = rgb.g;
    bInput.value = rgb.b;
    document.getElementById('rgbValue').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function updateColorArea(hue) {
    colorArea.style.background = `
        linear-gradient(to right, 
            hsl(${hue}, 100%, 50%),
            rgba(255,255,255,0)),
        linear-gradient(to top, #000, rgba(0,0,0,0))
    `;
}

function updatePickerDot(x, y) {
    colorPickerDot.style.left = `${x}px`;
    colorPickerDot.style.top = `${y}px`;
}

function updateHueSlider(hue) {
    const position = (360 - hue) / 360 * colorSlider.offsetHeight;
    hueSlider.style.top = `${position}px`;
}

// 颜色计算函数
function calculateColor(x, y, width, height) {
    const saturation = (x / width) * 100;
    const brightness = 100 - (y / height) * 100;
    const hslColor = `hsl(${baseHue}, ${saturation}%, ${brightness}%)`;
    
    const temp = document.createElement('div');
    temp.style.color = hslColor;
    document.body.appendChild(temp);
    const rgbString = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    
    const [r, g, b] = rgbString.match(/\d+/g).map(Number);
    return rgbToHex(r, g, b);
}

// 事件处理函数
colorArea.addEventListener('mousedown', (e) => {
    const rect = colorArea.getBoundingClientRect();
    const handleColorSelection = (event) => {
        const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
        updatePickerDot(x, y);
        const hex = calculateColor(x, y, rect.width, rect.height);
        updateColorDisplay(hex);
    };

    handleColorSelection(e);

    const mouseMoveHandler = (event) => {
        handleColorSelection(event);
    };

    const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

colorSlider.addEventListener('mousedown', (e) => {
    const rect = colorSlider.getBoundingClientRect();
    
    const handleHueSelection = (event) => {
        const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
        baseHue = 360 - (y / rect.height * 360);
        updateHueSlider(baseHue);
        updateColorArea(baseHue);
    };

    handleHueSelection(e);

    const mouseMoveHandler = (event) => {
        handleHueSelection(event);
    };

    const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

// RGB 输入框事件监听
[rInput, gInput, bInput].forEach(input => {
    input.addEventListener('input', () => {
        const r = parseInt(rInput.value) || 0;
        const g = parseInt(gInput.value) || 0;
        const b = parseInt(bInput.value) || 0;
        const hex = rgbToHex(r, g, b);
        updateColorDisplay(hex);
    });
});

// HEX 输入框事件监听
hexInput.addEventListener('input', (e) => {
    let hex = e.target.value;
    
    if (hex.startsWith('0x')) {
        hex = '#' + hex.slice(2);
    }
    
    if (/^#[0-9A-Fa-f]{6}$/.test(hex) || /^0x[0-9A-Fa-f]{6}$/.test(e.target.value)) {
        updateColorDisplay(hex);
    }
});

// 初始化
updateColorDisplay('#995766');
updateHueSlider(baseHue);
updatePickerDot(100, 100); 