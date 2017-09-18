// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/simple-cms$1.0.0/src/components/photo-gallery/index.marko", function() {
      return module.exports;
    }),
    marko_component = require("./component"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_renderComponent = require("marko/src/components/taglib/helpers/renderComponent"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    photo_manager_template = marko_loadTemplate(require.resolve("../photo-manager")),
    marko_loadTag = marko_helpers.t,
    photo_manager_tag = marko_loadTag(photo_manager_template),
    app_overlay_template = marko_loadTemplate(require.resolve("../app-overlay")),
    app_overlay_tag = marko_loadTag(app_overlay_template);

function render(input, out, __component, component, state) {
  var data = input;

  var galleryLabel = state.galleries.length === 1 ? "gallery" : "galleries"

  out.w("<div" +
    marko_attr("id", __component.elId("_r0")) +
    "><label>" +
    marko_escapeXml(state.galleries.length) +
    " " +
    marko_escapeXml(galleryLabel) +
    "</label></div><div class=\"galleries\"" +
    marko_attr("id", __component.elId("_r1")) +
    ">");

  marko_forEach(state.galleries, function(gallery) {
    out.w("<section class=\"gallery\"><div class=\"header\"><h2>#" +
      marko_escapeXml(gallery.name) +
      "</h2><button class=\"edit\"" +
      marko_attr("data-marko", {
        onclick: __component.d("updateGallery", [
            gallery.name
          ])
      }, false) +
      ">&#9874;</button></div><div class=\"photos\">");

    marko_forEach(gallery.photos, function(uuid) {
      out.w("<a" +
        marko_attr("href", (`/api/photo/${uuid}`)) +
        "><img" +
        marko_attr("src", (`api/photo/${uuid}/thumbnail`)) +
        "></a>");
    });

    out.w("</div></section>");
  });

  out.w("</div>");

  var showOverlay = state.active !== ""

  marko_renderComponent(app_overlay_tag, {
      visible: showOverlay,
      renderBody: function renderBody(out) {
        photo_manager_tag({
            selected: state.hidden.selected
          }, out);
      }
    }, out, [
    __component,
    "add-photo-modal",
    [
      [
        "ok",
        "updateGalleryCommit"
      ],
      [
        "cancel",
        "updateGalleryCancel"
      ]
    ]
  ]);
}

marko_template._ = marko_renderer(render, {
    type: marko_componentType,
    roots: [
      "_r0",
      "_r1",
      "add-photo-modal"
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
    ],
    tags: [
      "../photo-manager",
      "../app-overlay"
    ]
  };
