// Babel configuration to enable JEST to work with private JavaScript class members
// Workaround from: https://github.com/facebook/jest/issues/9022
// Run in the command line: npm i @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
// to install the correct packages

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ]
};