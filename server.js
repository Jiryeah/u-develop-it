//* Initializing express from npm i
const express = require(`express`);
//* Using MySql connection from the folder that exported it for global use.
const db = require(`./db/connection`);
//*Using the entire directory of apiRoutes will make the code default to using the 'index.js' file within said folder.
const apiRoutes = require(`./routes/apiRoutes`);

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* Use the apiRoutes will also adding the prefix of '/api' which allows us to remove it from the code within the routes
app.use(`/api`,apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start the server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log(`Database connected.`);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})


//* GET is for reading, POST for creating, PUT for updating, and DELETE for deleting endpoints.
