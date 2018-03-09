var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,


    user: "root",


    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("***********************************************")
    console.log("Welcome to our store. Please have a look around!");
    console.log("***********************************************")



    displayTable();
});


function displayTable() {


    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        var productsArr = [];
        for (var i = 0; i < res.length; i++) {
            productsArr.push([res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].quantity]);
        }
        console.table(['ID', 'Product', 'Department', 'Price', 'Quantity'], productsArr);

        inquirer
            .prompt([
                {
                    name: "selectId",
                    type: "input",
                    message: "What is the ID of the product you'd like to buy?",
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

                connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function (err, res) {
                    if (answer.quantity > res[0].quantity) {
                        console.log("************************************************");
                        console.log("Insufficient quantity. Please place a new order.");
                        console.log("************************************************");
                        displayTable();
                    }
                    else {
                        console.log("Thank you for your purchase! Your total is" + " " + "$" + answer.quantity * res[0].price + "!  Hopefully your items arrive before the Hale Bopp Comet!");
//connection.query("UPDATE products SET stock_quantity='" + (results[id].stock_quantity - answer.quantity) + "'WHERE item_id='" + answerID + "'", function (err, results2) {
                  //console.log("Congratulations you successfully completed your purchase.");
                        displayTable();

                    }


                })
            })

    })
}




