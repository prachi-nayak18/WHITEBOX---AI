const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/chat', require('./routes/chat.routes'));

app.get('/', (req, res) => {
  res.json({ status: '✅ Whitebox AI Running', port: PORT });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});