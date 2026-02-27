// SVGO configuration: conservative defaults that preserve title, desc, and viewBox.
module.exports = {
  multipass: false,
  js2svg: { pretty: false },
  plugins: [
    { name: 'preset-default', params: {
      overrides: {
        // disable plugins that would remove title/desc or viewBox
        removeViewBox: false,
        removeTitle: false,
        removeDesc: false,
        // keep groups and IDs to preserve semantics
        collapseGroups: false,
        convertShapeToPath: false
      }
    }},
    // keep defs and metadata
    { name: 'removeMetadata', active: false },
    { name: 'removeUnknownsAndDefaults', params: { keepDataAttrs: true } }
  ]
};
