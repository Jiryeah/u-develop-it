//* Initializing mysql from npm 
const mysql = require(`mysql2`);


//* Connect to MySql database
const db = mysql.createConnection(
  {
    host: `localhost`,
    // Your MySQL username,
    user: `root`,
    // Your MySQl password
    password: `Fs_goma5`,
    database: `election`
  },
  console.log(`Connected to the election database.`)
);


//*exporting it so it can be used by the rest of the files 
module.exports = db;