const fs = require('fs'); // If you're working in Node.js, you'll need this for file operations
class ColorNameMapper {
    constructor(datasetPath) {
        // Load the XKCD color dataset from a JSON file
        const rawData = fs.readFileSync(datasetPath);
        this.colorMap = JSON.parse(rawData);
    }

    getClosestColorName(hexValue) {
        // Convert the input HEX value to lowercase for consistency
        hexValue = hexValue.toLowerCase();

        // Find the closest color name
        let closestColorName = null;
        let closestDistance = Number.MAX_VALUE;

        for (const colorHex in this.colorMap) {
            const colorName = this.colorMap[colorHex];
            const distance = this.calculateColorDistance(hexValue, colorHex);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestColorName = colorName;
            }
        }

        return closestColorName;
    }

    calculateColorDistance(hex1, hex2) {
        // Calculate the Euclidean distance between two HEX colors
        // You can use different color distance formulas depending on your needs
        // Here, we are using a simple Euclidean distance

        const r1 = parseInt(hex1.slice(1, 3), 16);
        const g1 = parseInt(hex1.slice(3, 5), 16);
        const b1 = parseInt(hex1.slice(5, 7), 16);

        const r2 = parseInt(hex2.slice(1, 3), 16);
        const g2 = parseInt(hex2.slice(3, 5), 16);
        const b2 = parseInt(hex2.slice(5, 7), 16);

        const dr = r1 - r2;
        const dg = g1 - g2;
        const db = b1 - b2;

        return Math.sqrt(dr * dr + dg * dg + db * db);
    }
}
export default ColorNameMapper;
