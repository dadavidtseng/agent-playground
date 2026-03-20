module.exports = {
  multipass: true,
  js2svg: { indent: 2 },
  plugins: [
    { name: 'preset-default' },
    { name: 'cleanupAttrs' },
    { name: 'removeDoctype' },
    { name: 'removeComments' },
    { name: 'removeMetadata' },
    { name: 'removeTitle', active: false }, // keep <title> for accessibility
    { name: 'removeDesc', active: false },  // keep <desc>
    { name: 'removeUselessDefs' },
    { name: 'convertStyleToAttrs' },
    { name: 'convertColors' },
    { name: 'removeUnknownsAndDefaults' },
    { name: 'collapseGroups' },
  ]
};