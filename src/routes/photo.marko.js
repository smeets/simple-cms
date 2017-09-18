// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    photo_manager_template = marko_loadTemplate(require.resolve("../components/photo-manager")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    photo_manager_tag = marko_loadTag(photo_manager_template),
    site_layout_template = marko_loadTemplate(require.resolve("../components/site-layout")),
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("photo");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<button>+ upload photo</button>");

            photo_manager_tag({
                selected: []
              }, out);
          }
        },
      [hasRenderBodyKey]: true
    }, out);
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "../components/photo-manager",
      "../components/site-layout"
    ]
  };
