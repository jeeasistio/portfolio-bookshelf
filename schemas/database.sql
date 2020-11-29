CREATE TABLE people (
  person_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  role VARCHAR(9) NOT NULL CHECK (role = 'reader' OR role = 'librarian'),
  UNIQUE(email)
);

CREATE TABLE books (
  book_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  person_id UUID REFERENCES people (person_id)
);

CREATE TABLE requests (
  request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books (book_id) NOT NULL,
  person_id UUID REFERENCES people (person_id) NOT NULL,
  request_status VARCHAR(10) NOT NULL DEFAULT 'pending' CHECK (
    request_status = 'pending' OR 
    request_status = 'accepted' OR 
    request_status = 'rejected')
);