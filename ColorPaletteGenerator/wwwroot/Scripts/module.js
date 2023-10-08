console.log("Hello"); // Test

import namedColors from 'color-name-list';
let someColor = namedColors.find(color => color.hex === '#ffffff');
console.log(someColor.name);