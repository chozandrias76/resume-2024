const { exec } = require('child_process');
const chokidar = require('chokidar');

const watcher = chokidar.watch('rust/er-save-file-readers/src', {
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed. Rebuilding...`);
  exec('npm run build:wasm', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
    } else {
      console.log(stdout);
    }
  });
});
