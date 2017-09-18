// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag"));

function render(input, out) {
  var data = input;

  out.w("<header><h1>");

  include_tag({
      _target: input.title
    }, out);

  out.w("</h1><nav class=\"menu\"><a href=\"/\">home</a><a href=\"/photo\">photo</a><a href=\"/gallery\">gallery</a></nav></header>");
}

marko_template._ = render;

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    tags: [
      "marko/src/taglibs/core/include-tag"
    ]
  };
