//These first lines establish dependencies.
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');

//Create localhost mySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,


  user: "root",


  password: "",
  database: "bamazon"
});
//This is a function that creates a table of all the products. It is global so it can be used in more than one of the manager options.
function makeTable() {
  connection.query('SELECT * FROM Products', function (err, res) {
    if (err) throw err;
    var productsArr = [];
    for (var i = 0; i < res.length; i++) {
      productsArr.push([res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].quantity]);
    }
    console.table(['ID', 'Product', 'Department', 'Price', 'Quantity Remaining'], productsArr);
  })
}


//So after initializing the file in node manager must add another word which serves as password.
if (process.argv[2] === "password") {
  console.log("PASSWORD ACCEPTED. WELCOME!");
  console.log("***************************")
  options();


  //This is the initial manager options prompt.
  function options() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
          name: "options"
        }
      ])
      .then(function (inquirerResponse) {
        //If the manager wants to view the products they are simply shown a current table.

        if (inquirerResponse.options === "View Products for Sale") {

          makeTable();
        }
        //displays all items in the products table where quantities are below 5.
        else if (inquirerResponse.options === "View Low Inventory") {

          connection.query('SELECT * FROM Products where quantity < 5', function (err, res) {
            if (err) throw err;
            var productsArr = [];
            for (var i = 0; i < res.length; i++) {
              productsArr.push([res[i].id, res[i].product_name, res[i].quantity]);
            }
            console.log("The following items have limited quantity.")
            console.log("Perhaps you should make an order.")
            console.log("*******************************************")
            console.table(['ID', 'Product', 'Quantity Remaining'], productsArr);
            
          })
        }
        // Places a new product with all the properties into the table.
        else if (inquirerResponse.options === "Add New Product") {
          inquirer
            .prompt([
              {
                name: "product",
                type: "input",
                message: "What is the product you would like to add?"
              },
              {
                name: "department_Name",
                type: "input",
                message: "Which department would you like to place your product in?"
              },
              {
                name: "quantity",
                type: "input",
                message: "How many would you like to order?",
                validate: function (value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              },
              {
                name: "price",
                type: "input",
                message: "Where should the item be priced?",
                validate: function (value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }
            ])

            .then(function (answer) {

              connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: answer.product,
                  department_name: answer.department_Name,
                  price: answer.price,
                  quantity: answer.quantity
                },
                function (err) {
                  if (err) throw err;
                  console.log("Item was added to inventory!");
                  
                }
              );
            });
        }

        else if (inquirerResponse.options === "Add to Inventory") {

          inquirer
            .prompt([
              {
                name: "product",
                type: "input",
                message: "What is the ID of the product you'd like to buy more of?",
                validate: function (value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              },
              {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
                validate: function (value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }

            ])

            .then(function (answer) {


            }
            );

        }
      });
  }

}
//does not allow access if password is wrong.
else {
  console.log("WRONG PASSWORD. TRY AGAIN")
  console.log("*************************")
}