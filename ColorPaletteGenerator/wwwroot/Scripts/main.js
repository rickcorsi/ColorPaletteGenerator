async function getColorName(hexValue) {
    console.error('Getting Color Name... ');
    try {
        // Encode the hex value to ensure it's safe for the URL
        const encodedHex = encodeURIComponent(hexValue);

        // Make a GET request to the Color API
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${encodedHex}&format=json`);

        // Check if the response status is OK (200)
        if (response.status === 200) {
            // Parse the response JSON
            const data = await response.json();

            // Extract the color name from the response
            const colorName = data.name.value;

            return colorName;
        } else {
            console.error('Failed to retrieve color information.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching color information:', error);
        return null;
    }
}
function hideInfo() {
    var divsToHide = document.getElementsByClassName("paletteinfo");
    for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.height = "0px"; 
    }
}
function openColorSelect(c, j) {
    console.log(c);
    var s = document.getElementById("selectedColor");
    const b = document.getElementById("paletteFav_" + j);
    //var l = document.getElementById("selectedColorSmall");
    s.style.backgroundColor = c;
    //l.style.backgroundColor = c;
    var t = document.getElementById("selectedColorTextHEX");
    t.innerHTML = c;

    var str = c;
    var firstTwoChars = str.slice(1, 2);
    t.style.color = "black";
    for (var i = 0; i < 9; i++) {
        if (firstTwoChars == i) {
            t.style.color = "white";
        }
    }
    b.style.paddingTop = "10px";
    cloneDiv();
    setTimeout(function () {
        // Code to execute after the pause (2 seconds)
        // Continue with your code here
        b.style.paddingTop = "0px";
    }, 2000); // 2000 milliseconds (2 seconds)
//    cloneDivSmall();
}
var objs = 1;
function cloneDiv() {
    const objects = document.querySelectorAll("#inputArea > div");
    const originalDiv = document.getElementById('selectedColor');
    const deleteButton = document.getElementById('selectedColorDelete');
    const expandButton = document.getElementById('selectedColorExpand');
    const copyButton = document.getElementById('selectedColorCopy');

    const cloneDiv = originalDiv.cloneNode(true);
    const cloneButtonDelete = deleteButton.cloneNode(true);
    const cloneButtonExpand = expandButton.cloneNode(true);
    const cloneButtonCopy = copyButton.cloneNode(true);

    const uniqueId = "clonedDiv_" + objs;

    cloneDiv.id = uniqueId;
    cloneButtonDelete.id = "clonedDelete_" + objs;
    cloneButtonExpand.id = "clonedExpand_" + objs;
    cloneButtonCopy.id = "clonedCopy_" + objs;

    cloneDiv.textContent = document.getElementById('selectedColorTextHEX').textContent;
    var hexValue = document.getElementById('selectedColorTextHEX').textContent;
    var rgbValue = hexToRgb(hexValue); // Calculate RGB from HEX
    var hslValue = hexToHsl(hexValue); // Calculate RGB from HEX
    var nameValue = ""; // Initialize the global variable

    getColorName(hexValue)
     .then(name => { // Use a different variable name here
        nameValue = name; // Assign the value to the global variable
        console.log(`Color Name: ${nameValue}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });

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
        h.style.color = "transparent";
        x.style.backgroundColor = divToExpand.style.backgroundColor;
        x.style.height = "80%";
        b.style.display = "block";
        d.style.display = "block";
        c.style.right = "600%";
        f.style.marginTop = "700px";
        hex = hexValue;
        console.log("hex: " + hex);
        checkBrightness(hex);
        const base = 127.5;
        if (checkBrightness(hex) < base) {
            b.style.color = "white";
            d.style.color = "white";
            setTimeout(function () {
                h.innerHTML = `${nameValue} <br>${hexValue} <br>${rgbValue} <br>${hslValue}`;
                h.style.color = "white";
            }, 750);
            f.style.color = "white";
        }
        else {
            b.style.color = "black";
            d.style.color = "black";
            setTimeout(function () {
                h.innerHTML = `${nameValue} <br>${hexValue} <br>${rgbValue} <br>${hslValue}`;
                h.style.color = "black";
            }, 750);
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

    const container = document.getElementById('favorites');

    objs++;
    const alertText = document.getElementById("alert");
    const alertContainer = document.getElementById("alertContain");

    alertContainer.style.left = "15px";
    alertContainer.style.backgroundColor = hexValue;
    alertText.textContent = `Favorited! ${hexValue}`;
    checkBrightness(hexValue);
    if (checkBrightness(hexValue) < base) {
        alertText.style.color = "white";
    }
    else {
        alertText.style.color = "black";
    }
    setTimeout(function () {
        alertContainer.style.left = "-100%";
        cloneDiv.innerHTML = `${nameValue} <br>${hexValue} <br>${rgbValue} <br>${hslValue}`;
        container.appendChild(cloneDiv);
        cloneDiv.appendChild(cloneButtonExpand);
        cloneDiv.appendChild(cloneButtonDelete);
        cloneDiv.appendChild(cloneButtonCopy);
    }, 2000);
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
function rgbToHex(rgb) {
    const values = rgb.match(/\d+/g);
    const hexColor = '#' + values.map(val => parseInt(val).toString(16).padStart(2, '0')).join('');
    return hexColor;
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
    const fullColorElement = document.getElementById("fullColor");
    const selectedColorExpandCloseElement = document.getElementById("selectedColorExpandClose");
    const selectedColorExpandDownloadElement = document.getElementById("selectedColorExpandDownload");
    const classPickElement = document.getElementById("classPick");
    const favsTextElement = document.getElementById("favsText");
    const fullColorHEXElement = document.getElementById("fullColorHEX");

    fullColorElement.style.backgroundColor = "#ffffff";
    fullColorElement.style.height = "0px";
    selectedColorExpandCloseElement.style.display = "none";
    selectedColorExpandDownloadElement.style.display = "none";
    classPickElement.style.right = "0%";
    favsTextElement.style.marginTop = "15px";
    favsTextElement.style.color = "black";
    fullColorHEXElement.textContent = '';
    document.body.style.backgroundColor = "#ffffff";

}
function downloadPreview() {

    // Get a reference to the <body> element
    const bodyElement = document.body;
    const rgb = document.body.style.backgroundColor;
    const filename = rgbToHex(rgb);
    const maxHeight = 800; // Set your desired maximum height in pixels
    const maxWidth = 1400; // Set your desired maximum height in pixels
    const elementsToIgnore = document.querySelectorAll('#selectedColorExpandDownload'); // Replace with your selectors
    const downloadButton = document.getElementById("selectedColorExpandDownload");
    downloadButton.style.paddingTop = "10px";
    html2canvas(bodyElement, {
        width: maxWidth,
        height: maxHeight,
        ignoreElements: elementsToIgnore,
    }).then(canvas => {
        const dataURL = canvas.toDataURL('image/png');

        // Create a download link for the image
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = (filename + '.png'); // Specify the desired filename

        // Trigger a click event on the download link to prompt the user to download the image
        downloadLink.click();
    });
    setTimeout(function () {
        downloadButton.style.paddingTop = "0px";
    }, 2000);
}
function toggleHide() {
    const hideme = document.getElementById('fullColorHEX');
    let tempColor = "white";
    const bodyBackgroundColor = document.body.style.backgroundColor;
    const hexBackgroundColor = rgbToHex(bodyBackgroundColor);
    const base = 127.5;

    if (checkBrightness(hexBackgroundColor) < base) {
        tempColor = "white";
    }
    else {
        tempColor = "black";
    }

    if (hideme.style.color == "transparent") {
        hideme.style.color = tempColor;
    }
    else {
        hideme.style.color = "transparent";
    }
}
function copyColorSelect(hexValue, index) {
    console.log(hexValue);
    const tempInput = document.createElement("input");
    const alertElement = document.getElementById("alert");
    const paletteCopyElement = document.getElementById("paletteCopy_" + index);
    const alertContainElement = document.getElementById("alertContain");

    tempInput.value = hexValue;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alertContainElement.style.left = "15px";
    alertContainElement.style.backgroundColor = hexValue;
    paletteCopyElement.style.paddingTop = "10px";
    alertElement.textContent = `Copied! ${hexValue}`;

    checkBrightness(hexValue);
    const base = 127.5;

    if (checkBrightness(hexValue) < base) {
        alertElement.style.color = "white";
    } else {
        alertElement.style.color = "black";
    }

    setTimeout(function () {
        alertContainElement.style.left = "-100%";
        paletteCopyElement.style.paddingTop = "0px";
    }, 2000);
}
function testColorName() {
    const hexValue = '#0047AB';
    getColorName(hexValue)
        .then((colorName) => {
            if (colorName) {
                console.log(`The color name for ${hexValue} is ${colorName}`);
            } else {
                console.log('Color name not found.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function closeAll() {
    const clearButton = document.getElementById("clearFavs");
    const favoritesDiv = document.getElementById("favorites");

    clearButton.style.paddingTop = "10px";

    if (favoritesDiv.children.length === 0) {
        runAlert('No favorites to clear!', 2000);
        setTimeout(function () {
            clearButton.style.paddingTop = "0px";
        }, 2000);
        return; // Exit the function
    }
    runAlert('Favorites Cleared!', 2000);

    setTimeout(function () {
        while (favoritesDiv.firstChild) {
            favoritesDiv.removeChild(favoritesDiv.firstChild);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        clearButton.style.paddingTop = "0px";
    }, 500);

}
function saveFavorites() {
    const saveButton = document.getElementById("saveFavs");
    const favoritesDiv = document.getElementById('favorites');

    saveButton.style.paddingTop = "10px";

    if (favoritesDiv.children.length === 0) {
        runAlert('No favorites to save!', 2000);
        setTimeout(function () {
            saveButton.style.paddingTop = "0px";
        }, 2000);
        return; // Exit the function
    }

    const maxWidth = 400; // Set your desired maximum height in pixels

    html2canvas(favoritesDiv, {
        width: maxWidth,
    }).then(canvas => {
        const dataURL = canvas.toDataURL('image/png');

        // Create a download link for the image
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'palette.png'; // Specify the desired filename

        // Trigger a click event on the download link to prompt the user to download the image
        downloadLink.click();
    });

    runAlert('Palette Downloaded!', 2000);
    setTimeout(function () {
        saveButton.style.paddingTop = "0px";
    }, 2000);
}
function runAlert(message, duration) {
    const alertContainer = document.getElementById("alertContain");
    const alertText = document.getElementById("alert");
    const defaultPaletteColor = document.getElementById("paletteColorDefault");

    // Set container's initial position and background color
    alertContainer.style.left = "15px";
    alertContainer.style.backgroundColor = defaultPaletteColor.style.backgroundColor;

    // Set alert message text
    alertText.textContent = message;

    // Get and check the brightness of the background color
    const hexBackgroundColor = rgbToHex(alertContainer.style.backgroundColor);
    const baseBrightness = 127.5;

    if (checkBrightness(hexBackgroundColor) < baseBrightness) {
        alertText.style.color = "white";
    } else {
        alertText.style.color = "black";
    }

    // Hide the alert after the specified duration
    setTimeout(function () {
        alertContainer.style.left = "-100%";
        alertText.style.paddingTop = "0px";
    }, duration);
}