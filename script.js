// UI
const sketch = document.querySelector('#container');
const slider = document.querySelector("input[type=range]");
const modeSelector = document.querySelector("select");
const color = document.querySelector("input[type=color]");
const clearBtn = document.querySelector("button");
const gridText = document.querySelector("#gridSize");
let squares = [];

let mode = modeSelector.value; //Default mode

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Functions

// Detect the type of device used
const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};


const shader = (arr) => {
    for (let i = 0; i < arr.length; i++){
        arr[i] = parseInt(arr[i].match(/(\d+)/)[0]) * .9;
    }
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
};
const HEX = (e) => {
    if (e.type === 'mouseover' && !mouseDown) return
    if (mode == "Rainbow"){
        // Creates a random HEX for color
        let num = [];
        for (let i = 0; i < 3; i++) {
            num[i] = (Math.floor(Math.random()*256)).toString(16);
            num[i] = (num[i].length == 1)? "0" + num[i] : num[i];
        }
        e.target.style.backgroundColor = "#"+num.join("");
    } else if (mode == "Color") {
        e.target.style.backgroundColor = color.value;   
    } else if (mode == "Eraser") {
        e.target.style.backgroundColor = "#ffffff"
    } else if (mode == "Shader") {
        currentColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = shader(currentColor.split(","));
    }
}

const clear = (elements) => {
    elements.forEach((element) => {
        element.style.backgroundColor = "#ffffff";
    });
}

const setSize = (value) => {
    let gridSize = value**2;
    let squareSize = 100/Math.sqrt(gridSize);
    gridText.textContent = `${value} x ${value}`;
    for (let i = 0; i < gridSize; i++){
        squares[i] = document.createElement("div");
        squares[i].classList.add("square");
        squares[i].style.width = `${squareSize}%`
        squares[i].style.height = `${squareSize}%`
        squares[i].style.backgroundColor = "#ffffff"
        sketch.appendChild(squares[i]);
        squares[i].addEventListener("mouseover", HEX);
        squares[i].addEventListener("mousedown", HEX);
    }
}

// Event handling
setSize(slider.value);

slider.addEventListener("change", () => {
    if (squares.length !== 0) {
        squares.forEach((square) => {
            square.parentNode.removeChild(square);
        });
        squares = [];
    }
    setSize(slider.value);
});

clearBtn.addEventListener("click", () => {
    clear(squares);
});

modeSelector.addEventListener("change", () => {
    mode = modeSelector.value;
});