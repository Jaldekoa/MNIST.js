const $canvas = document.querySelector('canvas');
const $deleteBtn = document.querySelector('.delete');
const $predictBtn = document.querySelector('.predict');
const ctx = $canvas.getContext('2d');

ctx.lineWidth = 10;
ctx.strokeStyle = "black";

let isDrawing = false;
let [lastX, lastY] = [0, 0];
let [startX, startY] = [0, 0];

$canvas.addEventListener('mousedown', startDrawing);
$canvas.addEventListener('mousemove', draw);
$canvas.addEventListener('mouseup', stopDrawing);
$canvas.addEventListener('mouseleave', stopDrawing);
$deleteBtn.addEventListener('click', clearCanvas);

function startDrawing(event) {
    const { offsetX, offsetY } = event;

    isDrawing = true;
    [startX, startY] = [offsetX, offsetY];
    [lastX, lastY] = [offsetX, offsetY];
};

function draw(event) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    [lastX, lastY] = [offsetX, offsetY];
};

function stopDrawing(event) {
    isDrawing = false;
};

function clearCanvas(event) {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
};