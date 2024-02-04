/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: false,
  tabWidth: 4,
  useTabs: true,
  semi: false,
  printWidth: 100
};

module.exports = config;
