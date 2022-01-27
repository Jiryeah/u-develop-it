-- This will drop/delete the tables every time your run the 
-- schema.sql file ensuring that you start with a clean slate.
-- Candidates table must be dropped before the parties table due 
-- to the foreign key constraint that requires the parties table to exist.
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;  
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;

-- Because the Constraint relies on the parties table, the parties table
-- MUST be defined first before the candidates table.
CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);


-- A foreign key is a field in table that references the primary key of another table.
-- CONSTRAINT allows us to flag the party_id fild as an official foreign key and 
-- tells SQL which table & field it references
CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

-- DEFAULT denotes that the current timestamp will be shown instead of 'null' since we didn't add 'not null'
CREATE TABLE voters (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- 'uc_voter' signifies that the values entered into the voter_id must be unique
-- 'fk_voter' & 'fk_candidate' *FOREIGN KEYS* signifies that the key from the refernece key, if deleted, will delete the entire row.
CREATE TABLE votes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  voter_id INTEGER NOT NULL,
  candidate_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uc_voter UNIQUE (voter_id),
  CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
  CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);


-- AS keyword lets you define an alias for your data. Can be useful
-- when joining tables that might have overlapping field names.

-- source/db/schema.sql to execute this script in db