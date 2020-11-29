var shell = require('shelljs');

shell.cp('-R', 'src/www', 'dist/www');
shell.cp('-R', 'src/cert.pfx', 'dist/');
shell.cp('-R', '.env.prod', 'dist/.env');
shell.cp('-R', 'ormconfig.json', 'dist/');
shell.cp('-R', 'package.json', 'dist/');
