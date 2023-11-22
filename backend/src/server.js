const express = require('express');
const sql = require('mssql/msnodesqlv8');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,PUT,POST,DELETE',
}));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const config = { 
  server: 'DESKTOP-7C3479M\\SQLEXPRESS',
  database: 'taskmanager',
  options: {
    trustedConnection: true, 
    encrypt: false,
  },
};

sql.connect(config).then(() => {
  console.log('Connected to SQL Server');
}).catch(err => {
  console.error('.Error connecting to SQL Server:', err);
});


app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
