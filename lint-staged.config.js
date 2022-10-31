const path = require('path');

const joinFileNamse = (fileNames, delimiter = ' ') =>
  fileNames.map((f) => path.relative(process.cwd(), f)).join(delimiter);

const clientEslintCommand = (fileNames) =>
  `yarn eslint ${joinFileNamse(fileNames)} -c client/.eslintrc.js --fix --max-warnings 0`;

const serverEslintCommand = (fileNames) =>
  `yarn eslint ${joinFileNamse(fileNames)} -c server/.eslintrc.js --fix --max-warnings 0`;

const prettierCommand = (fileNames) => `
  yarn prettier ${joinFileNamse(fileNames)} --write
`;

module.exports = {
  './**/*.{json,js,jsx,ts,tsx}': [prettierCommand],
  'client/src/**/*.{js,jsx,ts,tsx}': [clientEslintCommand],
  'server/src/**/*.{js,ts}': [serverEslintCommand],
};
