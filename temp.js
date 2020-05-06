module.exports = function () {
  const isProduction = process.env.NODE_ENV === "production";
  console.log(process);
  console.log(process.env);

  const presets = ["@babel/preset-env", "@babel/preset-react"];

  const commonPlugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    //"transform-inline-environment-variables",
  ];

  const prodPlugins = [
    [
      "transform-react-remove-prop-types",
      {
        removeImport: true,
      },
    ],
  ];

  return {
    plugins: [...commonPlugins, ...(isProduction ? prodPlugins : [])],
    presets,
  };
};
