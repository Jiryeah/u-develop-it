--* This will drop/delete the tables every time your run the 
--* schema.sql file ensuring that you start with a clean slate.
--* Candidates table must be dropped before the parties table due 
--* to the foreign key constraint that requires the parties table to exist.
DROP TABLE IF EXISTS candidates;  
DROP TABLE IF EXISTS parties;

CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);


--* Because the Constraint relies on the parties table, the parties table
--* MUST be defined first before the candidates table.
CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

--* source/db/schema.sql to execute this script.
--* A foreign key is a field in table that references the primary key of another table.
--* CONSTRAINT allows us to flag the party_id fild as an official foreign key and 
--* tells SQL which table & field it references