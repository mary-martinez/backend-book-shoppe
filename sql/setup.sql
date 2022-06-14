-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists authors;
DROP table if exists books;

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE,
  pob VARCHAR
);

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO authors (
  name,
  dob,
  pob
)
VALUES
('Drew Hayes', '1969-07-20', 'Bellingham, WA'),
('Sarah J Maas', '1986-03-05', 'Manahattan, New York')
;

INSERT INTO books (
  title,
  released
)
VALUES
('Dead Assessments', 2018),
('Forging Hephaestus', 2017),
('A Court of Thorns and Roses', 2015)
;