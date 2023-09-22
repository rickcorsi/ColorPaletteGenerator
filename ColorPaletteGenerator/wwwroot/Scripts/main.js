function hideInfo() {
    var divsToHide = document.getElementsByClassName("paletteinfo");
    for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.height = "0px"; 
    }
}
function openColorSelect(c) {
    console.log(c);
    var s = document.getElementById("selectedColor");
    s.style.backgroundColor = c;
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
}
var objs = 1;
function cloneDiv() {
    const objects = document.querySelectorAll("#inputArea > div");
    console.log("Divs: " + objects.length);
    console.log("Objs: " + objs);
    const originalDiv = document.getElementById('selectedColor');
    const deleteButton = document.getElementById('selectedColorDelete');

    const cloneDiv = originalDiv.cloneNode(true);
    const cloneButton = deleteButton.cloneNode(true);

    const uniqueId = "clonedDiv_" + objs;

    cloneDiv.id = uniqueId;
    cloneButton.id = "clonedDelete_" + objs;

    cloneDiv.textContent = document.getElementById('selectedColorTextHEX').textContent;
    var hexValue = document.getElementById('selectedColorTextHEX').textContent;
    var rgbValue = hexToRgb(hexValue); // Calculate RGB from HEX

    // Set the text content to display both HEX and RGB values
    cloneDiv.textContent = `${hexValue}, ${rgbValue}`;


    var hex = document.getElementById('selectedColorTextHEX').textContent;
    checkBrightness(hex);
    const base = 127.5;
    if (checkBrightness(hex) < base) {
        cloneDiv.style.color = "white";
    }
    else {
        cloneDiv.style.color = "black";
    }

    cloneButton.addEventListener('click', function () {
        const divToDelete = document.getElementById(uniqueId);
        if (divToDelete) {
            divToDelete.remove();
            console.log("Object Unfavorited");
        }
    });
    const container = document.getElementById('favorites');
    container.appendChild(cloneDiv);
    cloneDiv.appendChild(cloneButton);
    objs++;
    console.log("clone.id: " + clone.id);
    console.log("cloneDelete.id: " + cloneDelete.id);
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