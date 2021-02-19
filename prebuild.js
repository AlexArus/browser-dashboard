console.log();
console.log('PreBuild script start');

console.log('- update application version in manifest json');
{
  const fs = require('fs');
  const packageJson = JSON.parse(fs.readFileSync('package.json'));
  const manifestJsonPath = './public/manifest.json';
  const manifestJson = JSON.parse(fs.readFileSync(manifestJsonPath));
  manifestJson.version = packageJson.version;
  const updatedManifestJson = JSON.stringify(manifestJson, null, 2);
  fs.writeFileSync(manifestJsonPath, updatedManifestJson);
}

console.log('PreBuild script finish');
console.log();
