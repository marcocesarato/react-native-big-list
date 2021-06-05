module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: [
    "@react-native-community",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "standard",
    "prettier",
  ],
  plugins: ["jest", "react-hooks", "prettier", "simple-import-sort", "import"],
  rules: {
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          [
            // Packages. `react` related packages come first.
            "^react$",
            "^prop-types$",
            "^react-native$",
            "^react-native",
            // Others libs
            "^[A-Za-z0-9]",
            "^",
          ],
          // Relative imports
          [
            // Side effect imports.
            "^\\u0000",
            // Parent imports. Put `..` last.
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            // Other relative imports. Put same-folder imports and `.` last.
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
          ],
        ],
      },
    ],
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "react-native/no-raw-text": 0,
    "react-native/no-inline-styles": 0,
    "react/prop-types": 0,
  },
};
