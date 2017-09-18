// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    photo_gallery_template = marko_loadTemplate(require.resolve("../components/photo-gallery")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    photo_gallery_tag = marko_loadTag(photo_gallery_template),
    site_layout_template = marko_loadTemplate(require.resolve("../components/site-layout")),
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("gallery");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            photo_gallery_tag({}, out);
          }
        },
      [hasRenderBodyKey]: true
    }, out);
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "../components/photo-gallery",
      "../components/site-layout"
    ]
  };
