module.exports = {
  extends: ["airbnb-base"],
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    jest: true
  },
  rules: {
    "arrow-body-style": "off",
    "consistent-return": "warn",
    "default-case": "warn",
    // webpack handles imports without filename extensions
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true
      }
    ],
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        "code": 100,
        "ignoreComments": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "no-multi-assign": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "operator-linebreak": "warn"
  }
};
