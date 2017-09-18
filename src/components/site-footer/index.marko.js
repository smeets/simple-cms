// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename);

function render(input, out) {
  var data = input;

  out.w("<footer></footer>");
}

marko_template._ = render;

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "footer {\r\n\t  padding: 2em;\r\n\t  //border-top: 2px solid #ccc;\r\n\t  //background: #fff;\r\n\t  text-align: center;\r\n\t}",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        }
    ]
  };
