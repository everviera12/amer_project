CREATE TABLE users (
    id SERIAL PRIMARY KEY,            
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL,  
    slug VARCHAR(255) UNIQUE,         
    contact VARCHAR(255),              
    created_at TIMESTAMP DEFAULT NOW(), 
    password VARCHAR(255) NOT NULL,     
    role VARCHAR(50) NOT NULL           
);
INSERT INTO users (first_name, last_name, slug, contact, password, role) 
VALUES 
('John', 'Doe', 'john-doe', 'john.doe@example.com', 'hashedpassword1', 'admin'),
('Jane', 'Smith', 'jane-smith', '123-456-7890', 'hashedpassword2', 'user');

