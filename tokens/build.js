//const StyleDictionary = require('style-dictionary');
import StyleDictionary from "style-dictionary";

/*import tinycolor from 'tinycolor2';

StyleDictionary.registerTransform({
  name: 'shadow/scss',
  type: 'value',
  matcher: function(prop) {
    return prop.attributes.category === 'shadow';
  },
  transformer: function(prop) {
    // destructure shadow values from original token value
    const {
      x,
      y,
      blur,
      spread,
      color,
      alpha
    } = prop.original.value
    
    // convert hex code to rgba string
    const shadowColor = tinycolor(color)
    shadowColor.setAlpha(alpha)
    shadowColor.toRgbString()
    
    return `${x}px ${y}px ${blur}px ${spread}px ${shadowColor}`
  }
});*/

const myStyleDictionary = StyleDictionary.extend({
    source: ["**/*.tokens.json"],
    platforms: {
        scss: {
            //transforms: ["shadow/scss"],
            transformGroup: "scss",
            prefix: "sd",
            buildPath: "src/styles/",
            files: [
                {
                    destination: "tokens.scss",
                    format: "scss/variables",
                    options: {
                        outputReferences: true,
                    },
                },
            ],
        },
    },
});

myStyleDictionary.buildAllPlatforms();
