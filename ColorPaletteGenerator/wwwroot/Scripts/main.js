function hideInfo() {
    var divsToHide = document.getElementsByClassName("paletteinfo");
    for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.height = "0px"; 
    }
}
function openColorSelect(c) {
    console.log(c);
    var s = document.getElementById("selectedColor");
    //var l = document.getElementById("selectedColorSmall");
    s.style.backgroundColor = c;
    //l.style.backgroundColor = c;
    var t = document.getElementById("selectedColorTextHEX");
    t.innerHTML = c;

    var str = c;
    var firstTwoChars = str.slice(1, 2);
    console.log(firstTwoChars);
    t.style.color = "black";
    for (var i = 0; i < 9; i++) {
        if (firstTwoChars == i) {
            t.style.color = "white";
        }
    }
    cloneDiv();
//    cloneDivSmall();
}
var objs = 1;
function cloneDiv() {
    const objects = document.querySelectorAll("#inputArea > div");
    const originalDiv = document.getElementById('selectedColor');
    const deleteButton = document.getElementById('selectedColorDelete');
    const expandButton = document.getElementById('selectedColorExpand');
    const copyButton = document.getElementById('selectedColorCopy');
    const pickButton = document.getElementById('selectedColorPick');

    const cloneDiv = originalDiv.cloneNode(true);
    const cloneButtonDelete = deleteButton.cloneNode(true);
    const cloneButtonExpand = expandButton.cloneNode(true);
    const cloneButtonCopy = copyButton.cloneNode(true);
    const cloneButtonPick = pickButton.cloneNode(true);

    const uniqueId = "clonedDiv_" + objs;

    cloneDiv.id = uniqueId;
    cloneButtonDelete.id = "clonedDelete_" + objs;
    cloneButtonExpand.id = "clonedExpand_" + objs;
    cloneButtonCopy.id = "clonedCopy_" + objs;
    cloneButtonPick.id = "clonedPick_" + objs;

    cloneDiv.textContent = document.getElementById('selectedColorTextHEX').textContent;
    var hexValue = document.getElementById('selectedColorTextHEX').textContent;
    var rgbValue = hexToRgb(hexValue); // Calculate RGB from HEX
    var hslValue = hexToHsl(hexValue); // Calculate RGB from HEX
    console.log("hslValue: " + hslValue);
    // Set the text content to display both HEX and RGB values
    cloneDiv.innerHTML = `${hexValue} <br>${rgbValue} <br>${hslValue}`;

    var hex = document.getElementById('selectedColorTextHEX').textContent;
    checkBrightness(hex);
    const base = 127.5;
    if (checkBrightness(hex) < base) {
        cloneDiv.style.color = "white";
    }
    else {
        cloneDiv.style.color = "black";
    }

    cloneButtonDelete.addEventListener('click', function () {
        const divToDelete = document.getElementById(uniqueId);
        if (divToDelete) {
            divToDelete.remove();
            console.log("Object Unfavorited");
        }
    });
    cloneButtonExpand.addEventListener('click', function () {
        const divToExpand = document.getElementById(uniqueId);
        const x = document.getElementById("fullColor");
        const b = document.getElementById("selectedColorExpandClose");
        const d = document.getElementById("selectedColorExpandDownload");
        const c = document.getElementById("classPick");
        const f = document.getElementById("favsText");
        const h = document.getElementById("fullColorHEX");
        x.style.backgroundColor = divToExpand.style.backgroundColor;
        x.style.height = "80%";
        b.style.display = "block";
        d.style.display = "block";
        c.style.right = "600%";
        f.style.marginTop = "700px";
        h.innerHTML = `${hexValue} <br>${rgbValue} <br>${hslValue}`;
        hex = divToExpand.textContent;
        console.log("hex: " + hex);
        checkBrightness(hex);
        const base = 127.5;
        if (checkBrightness(hex) < base) {
            b.style.color = "white";
            d.style.color = "white";
            h.style.color = "white";
            f.style.color = "white";
        }
        else {
            b.style.color = "black";
            d.style.color = "black";
            h.style.color = "black";
            f.style.color = "black";
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.style.backgroundColor = divToExpand.style.backgroundColor;
    });
    cloneButtonCopy.addEventListener('click', function () {
        const tempInput = document.createElement("input");
        const a = document.getElementById("alert");
        const c = document.getElementById("alertContain");
        tempInput.value = hexValue;
        document.body.appendChild(tempInput);

        tempInput.select();

        document.execCommand("copy");

        document.body.removeChild(tempInput);

        c.style.left = "15px";
        cloneButtonCopy.style.paddingTop = "10px";
        c.style.backgroundColor = hexValue;
        a.textContent = `Copied! ${hexValue}`;
        checkBrightness(hexValue);
        const base = 127.5;
        if (checkBrightness(hexValue) < base) {
            a.style.color = "white";
        }
        else {
            a.style.color = "black";
        }
        setTimeout(function () {
            // Code to execute after the pause (2 seconds)
            // Continue with your code here
            c.style.left = "-100%";
            cloneButtonCopy.style.paddingTop = "0px";
        }, 2000); // 2000 milliseconds (2 seconds)
    });
    cloneButtonPick.addEventListener('click', function () {
        const mudpick = document.getElementById('mudpick'); // Get the MudColorPicker element by ID
        mudpick.value = '#FF0000'; // Change the color value to your desired value
        console.log("Hello");
    });
    const container = document.getElementById('favorites');
    container.appendChild(cloneDiv);
    cloneDiv.appendChild(cloneButtonExpand);
    cloneDiv.appendChild(cloneButtonDelete);
    cloneDiv.appendChild(cloneButtonCopy);
    cloneDiv.appendChild(cloneButtonPick);
    objs++;
}
function cloneDivSmall() {
    console.log("Small Div Cloned");
    const objects = document.querySelectorAll("#inputArea > div");
    const originalDiv = document.getElementById('selectedColorSmall');

    const cloneDiv = originalDiv.cloneNode(true);

    const uniqueId = "clonedDivSmall_" + objs;

    cloneDiv.id = uniqueId;

    const container = document.getElementById('favoritesSmall');
    container.appendChild(cloneDiv);
    objs++;
}
function checkBrightness(color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    console.log("brightness: " + brightness);
    return brightness;
}
function hexToRgb(hex) {
    // Remove the hash (#) character if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal value to RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `RGB(${r}, ${g}, ${b})`;
}
function hexToHsl(hex) {
    // Remove the hash (#) character if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal value to RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Convert RGB to HSL
    const rNormalized = r / 255;
    const gNormalized = g / 255;
    const bNormalized = b / 255;

    const max = Math.max(rNormalized, gNormalized, bNormalized);
    const min = Math.min(rNormalized, gNormalized, bNormalized);

    let h, s, l;

    const delta = max - min;

    if (delta === 0) {
        h = 0;
    } else if (max === rNormalized) {
        h = ((gNormalized - bNormalized) / delta) % 6;
    } else if (max === gNormalized) {
        h = (bNormalized - rNormalized) / delta + 2;
    } else {
        h = (rNormalized - gNormalized) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
        h += 360;
    }

    l = (max + min) / 2;

    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `HSL(${h}, ${s}%, ${l}%)`;
}
function toggleFavoritesView() {
    const btn = document.getElementById("toggleButton");
    if (btn.className == 'toggleFavView') {
        btn.className = "toggleFavView-active";
    }
    else {
        btn.className = "toggleFavView";
    }
    console.log("Button Toggled");
}
function closePreview() {
    const x = document.getElementById("fullColor");
    const b = document.getElementById("selectedColorExpandClose");
    const d = document.getElementById("selectedColorExpandDownload");
    const c = document.getElementById("classPick");
    const f = document.getElementById("favsText");
    const h = document.getElementById("fullColorHEX");
    x.style.backgroundColor = "#ffffff";
    x.style.height = "0px";
    b.style.display = "none";
    d.style.display = "none";
    c.style.right = "0%";
    f.style.marginTop = "15px";
    f.style.color = "black";
    h.textContent = '';
    document.body.style.backgroundColor = "#ffffff";
}
function downloadPreview() {

    // Get a reference to the <body> element
    const bodyElement = document.body;

    const maxHeight = 800; // Set your desired maximum height in pixels
    const maxWidth = 1400; // Set your desired maximum height in pixels
    const elementsToIgnore = document.querySelectorAll('#selectedColorExpandDownload'); // Replace with your selectors

    html2canvas(bodyElement, {
        width: maxWidth,
        height: maxHeight,
        ignoreElements: elementsToIgnore,
    }).then(canvas => {
        const dataURL = canvas.toDataURL('image/png');

        // Create a download link for the image
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'colorbackground.png'; // Specify the desired filename

        // Trigger a click event on the download link to prompt the user to download the image
        downloadLink.click();    });
}
function toggleHide() {
    const hideme = document.getElementById('fullColorHEX');
    let tempcolor = "white";
    const back = document.body.style.backgroundColor;

    console.log("Back:" + back)

    const base = 127.5;
    if (checkBrightness(back) < base) {
        tempcolor = "white";
    }
    else {
        tempcolor = "black";
    }

    if (hideme.style.color == "transparent") {
        hideme.style.color = tempcolor;
    }
    else {
        hideme.style.color = "transparent";
    }
}