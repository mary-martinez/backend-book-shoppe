-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists books_authors;
DROP table if exists authors;
DROP table if exists books;

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob INT,
  pob VARCHAR
);

INSERT INTO authors (
  name,
  dob,
  pob
)
VALUES
('Drew Hayes', 1969, 'Bellingham, WA'),
('Sarah J Maas', 1986, 'Manahattan, New York')
;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO books (
  title,
  released
)
VALUES
('Dead Assessments', 2018),
('Forging Hephaestus', 2017),
('A Court of Thorns and Roses', 2015)
;

CREATE TABLE books_authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id BIGINT,
  author_id BIGINT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books_authors (
  book_id,
  author_id
)
VALUES
(1, 1),
(2, 1),
(3, 2);