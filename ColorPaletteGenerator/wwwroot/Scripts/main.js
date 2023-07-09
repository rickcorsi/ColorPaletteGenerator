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
    var t = document.getElementById("selectedColorText");
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

    var container = document.getElementById('favorites');
    var original = document.getElementById('selectedColor');

    clone = original.cloneNode(true);
    clone.id = "clonedDiv_" + objs;
    clone.textContent = document.getElementById('selectedColorText').textContent;
    var hex = document.getElementById('selectedColorText').textContent;
    checkBrightness(hex);
    const base = 127.5;
    if (checkBrightness(hex) < base) {
        clone.style.color = "white";
    }
    else {
        clone.style.color = "black";
    }
    container.appendChild(clone);
    objs++;
    console.log("clone.id: " + clone.id);
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