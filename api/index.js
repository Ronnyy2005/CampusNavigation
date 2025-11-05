import app from '../app.js';
export default app;

// api/index.js
const app = require('../app');
module.exports = app; // Express is a (req,res) handler, so this works on Vercel