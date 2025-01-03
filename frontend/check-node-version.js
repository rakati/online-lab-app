const semver = require("semver");
const { engines } = require("./package.json");

// Extract the required Node version from package.json
const requiredNodeVersion = engines?.node;

if (!requiredNodeVersion) {
  console.error("No Node.js version specified in package.json 'engines' field.");
  process.exit(1);
}

// Check if the current Node.js version satisfies the requirement
if (!semver.satisfies(process.version, requiredNodeVersion)) {
  console.error(`\nError: Current Node.js version ${process.version} does not satisfy the required version: ${requiredNodeVersion}.\n`);
  console.error("Please install the correct Node.js version.");
  process.exit(1);
}

console.log(`Node.js version ${process.version} satisfies the required version: ${requiredNodeVersion}.`);
