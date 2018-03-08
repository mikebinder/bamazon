DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price DECIMAL (2,2),
  quantity INT (100),
  PRIMARY KEY (id)
);

