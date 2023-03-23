const execSync = require('child_process').execSync;

let command = 'npx nx print-affected --type=app --select=projects';

let base = process.argv[2];
if (!base) {
  base = `main~1`;
}

if (base) {
  command = `${command} --base=${base}`;
}

let head = process.argv[3];
if (head) {
  command = `${command} --head=${head}`;
}

const affectedApps = execSync(command).toString().trim().split(', ');

if (affectedApps[0] === '') affectedApps.shift();

const output = affectedApps.length > 0 ? affectedApps.join(',') : '';

console.log(output);
