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
    console.log(firstTwoChars); // Co
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
    var original = document.getElementById('selectedColor'),

    clone = original.cloneNode(true); // true means clone all childNodes and all event handlers
    clone.id = "clonedDiv_" + objs;
    container.appendChild(clone);
    objs++;
    console.log("clone.id: " + clone.id);
}