// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/simple-cms$1.0.0/src/components/photo-manager/index.marko", function() {
      return module.exports;
    }),
    marko_component = require("./component"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f;

function render(input, out, __component, component, state) {
  var data = input;

  var photoLabel = state.photos.length === 1 ? "photo" : "photos"

  out.w("<div" +
    marko_attr("id", __component.elId("_r0")) +
    "><label>" +
    marko_escapeXml(state.photos.length) +
    " " +
    marko_escapeXml(photoLabel) +
    "</label></div><div class=\"photos\"" +
    marko_attr("id", __component.elId("_r1")) +
    ">");

  marko_forEach(state.photos, function(uuid) {
    out.w("<div class=\"photo\"><div class=\"overlay\">#" +
      marko_escapeXml(uuid));

    if (state.selected.indexOf(uuid) >= 0) {
      out.w("<input type=\"checkbox\" checked" +
        marko_attr("data-marko", {
          onchange: __component.d("onPhotoChange", [
              uuid
            ])
        }, false) +
        ">");
    } else {
      out.w("<input type=\"checkbox\"" +
        marko_attr("data-marko", {
          onchange: __component.d("onPhotoChange", [
              uuid
            ])
        }, false) +
        ">");
    }

    out.w("</div><img" +
      marko_attr("src", (`api/photo/${uuid}/thumbnail`)) +
      "></div>");
  });

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    type: marko_componentType,
    roots: [
      "_r0",
      "_r1"
    ]
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.css",
      {
          type: "require",
          path: "./"
        }
    ]
  };
