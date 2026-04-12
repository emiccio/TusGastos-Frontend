const fs = require('fs');
const path = require('path');

const srcApp = path.join(__dirname, 'src', 'app');
const srcComponents = path.join(__dirname, 'src', 'components');

const dirs = [
  path.join(srcApp, '(app)'),
  path.join(srcApp, '(auth)'),
  path.join(srcApp, '(marketing)'),
  path.join(srcComponents, 'landing')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
    console.log('Created', d);
  }
});

const moves = [
  { from: path.join(srcApp, 'dashboard'), to: path.join(srcApp, '(app)', 'dashboard') },
  { from: path.join(srcApp, 'transactions'), to: path.join(srcApp, '(app)', 'transactions') },
  { from: path.join(srcApp, 'categories'), to: path.join(srcApp, '(app)', 'categories') },
  { from: path.join(srcApp, 'login'), to: path.join(srcApp, '(auth)', 'login') },
];

moves.forEach(m => {
  if (fs.existsSync(m.from)) {
    fs.renameSync(m.from, m.to);
    console.log('Moved', m.from, 'to', m.to);
  }
});
