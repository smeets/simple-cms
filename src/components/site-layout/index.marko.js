// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    lasso_head_tag = marko_loadTag(require("lasso/taglib/head-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_header_template = marko_loadTemplate(require.resolve("../site-header")),
    site_header_tag = marko_loadTag(site_header_template),
    site_footer_template = marko_loadTemplate(require.resolve("../site-footer")),
    site_footer_tag = marko_loadTag(site_footer_template),
    lasso_body_tag = marko_loadTag(require("lasso/taglib/body-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!DOCTYPE html><html><head lang=\"en-US\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><title>");

  include_tag({
      _target: input.title
    }, out);

  out.w("</title>");

  lasso_head_tag({}, out);

  out.w("</head><body>");

  component_globals_tag({}, out);

  site_header_tag({
      title: {
          renderBody: function renderBody(out) {
            include_tag({
                _target: input.title
              }, out);
          }
        },
      [hasRenderBodyKey]: true
    }, out);

  out.w("<div class=\"content\">");

  include_tag({
      _target: input.content
    }, out);

  out.w("</div>");

  site_footer_tag({}, out);

  lasso_body_tag({}, out);

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    tags: [
      "marko/src/taglibs/core/include-tag",
      "lasso/taglib/head-tag",
      "marko/src/components/taglib/component-globals-tag",
      "../site-header",
      "../site-footer",
      "lasso/taglib/body-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
