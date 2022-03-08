module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --config ./.prettierrc -w ${filenames.join(' ')}`,
    'git update-index --again',
    // Run unit tests
    `vitest --run related ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --config ./.prettierrc --write ${filenames.join(' ')}`,
}
