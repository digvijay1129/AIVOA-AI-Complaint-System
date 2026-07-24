CREATE DATABASE aivoa_complaints;
SHOW DATABASES;
USE aivoa_complaints;

CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_source VARCHAR(100),
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    product_name VARCHAR(255),
    product_strength VARCHAR(100),
    batch_number VARCHAR(100),
    manufacturing_date DATE,
    expiry_date DATE,
    affected_quantity INT,
    complaint_category VARCHAR(150),
    complaint_description TEXT,
    initial_severity VARCHAR(50),
    suggested_action TEXT,
    written_assessment TEXT,
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SHOW TABLES;
DESCRIBE complaints;