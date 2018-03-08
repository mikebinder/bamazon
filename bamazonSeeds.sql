DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price DECIMAL (10,2),
  quantity INT (100),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Black Track Suit", "Menswear", 75.23, 39);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Nike Decades", "Footwear", 27.45, 39);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Applesauce", "Grocery", 4.00, 20);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Pudding", "Grocery", 2.50, 20);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Vodka", "Grocery", 20.00, 4);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Purple Table Cloth", "Housewares", 14.75, 25);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Solo Cups", "Housewares", 4.50, 45);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Deluxe Carry On", "Luggage", 40.08, 12);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Ten VHS Tapes", "Electronics", 9.99, 6);


