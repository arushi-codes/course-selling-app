// Replace your server.js with this:
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {  // ← ADD '0.0.0.0' here
  console.log(`Server running on port ${PORT}`);
});