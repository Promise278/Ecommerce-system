const chalk = require("chalk");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync("users.json")) {
  fs.writeFileSync("users.json", "");
}

if (!fs.existsSync("products.json")) {
  fs.writeFileSync("products.json", "");
}

function showMenu() {
  console.log(chalk.blue("\n= WELCOME TO E-COMMERCE APP ="));
  console.log("1. Admin Register");
  console.log("2. User Register");
  console.log("3. User Login");
  console.log(chalk.red("0: Exit\n"));
  rl.question(chalk.magenta("Select an option: "), (option) => {
    switch (option) {
      case "1":
        adminLogin();
        break;
      case "2":
        register();
        break;
      case "3":
        loginuser();
        break;
      case "0":
        console.log("Thanks for using our app");
        rl.close();
        break;
      default:
        console.log(chalk.magenta("Invalid Option"));
        showMenu();
    }
  });
}

function adminLogin() {
  console.log("\n= Admin Registeration =");
  rl.question("Enter your FullName: ", (name) => {
    rl.question("Enter your password: ", (password) => {
        if (!name || !password) {
        console.log(chalk.red("No empty fields or spaces allowed."));
        return register();
      }
       let users = [];
        if ( fs.existsSync("users.json") && fs.readFileSync("users.json", "utf8").trim() !== "") {``
            users = JSON.parse(fs.readFileSync("users.json", "utf8"));
        }
       const newUser = { name, password, role: "admin" };
      users.push(newUser);
      saveUsers(users);
      console.log(chalk.green("Admin Registered Successfully"));
      Admin();
    });
  });
}

function saveUsers(users) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

function register() {
  console.log("\n= User Registeration =");
  rl.question("Enter your FullName: ", (name) => {
    rl.question("Enter your password: ", (password) => {
      if (!name || !password || /\s/.test(name) || /\s/.test(password)) {
        console.log(chalk.red("No empty fields or spaces allowed."));
        return register();
      }
      let users = [];
      if (
        fs.existsSync("users.json") &&
        fs.readFileSync("users.json", "utf8").trim() !== ""
      ) {
        users = JSON.parse(fs.readFileSync("users.json", "utf8"));
      }
      const newUser = { name, password, role: "user" };
      users.push(newUser);
      saveUsers(users);
      console.log(chalk.green("User Registered Successfully"));
      loginuser();
    });
  });
}

function loginuser() {
  console.log("\n= User Login =");
  rl.question("Enter your FullName: ", (name) => {
    rl.question("Enter your password: ", (password) => {
      let users = [];
      if (
        fs.existsSync("users.json") &&
        fs.readFileSync("users.json", "utf8").trim() !== ""
      ) {
        users = JSON.parse(fs.readFileSync("users.json", "utf8"));
      }
      const user = users.find(
        (u) => u.name === name && u.password === password
      );
      if (!user) {
        console.log(chalk.red("Invalid credentials. Try again."));
        return loginuser();
      }
      console.log(chalk.green(`Welcome back, ${name}!`));
      registerMenu();
    });
  });
}

function seeproducts() {
  console.log(chalk.yellow("\n=== PRODUCT LIST ==="));
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(chalk.red("Error reading products file."));
      showMenu();
      return;
    }
    let products = [];
    if (data) {
      try {
        products = JSON.parse(data);
      } catch (e) {
        console.log(chalk.red("Error parsing products data."));
      }
    }
    products.forEach((product) => {
      console.table({
        ID: product.id,
        Name: product.title,
        Price: `$${product.price}`,
      });
    });
    showMenu();
  });
}

function Admin() {
  console.log(chalk.hex("#FF69B4")("\n=== ADMIN MENU ==="));
  console.log("1. Login");
  console.log("2. Add Product");
  console.log("3. See All Products");
  console.log("4. Edit Product");
  console.log("5. See All Orders");
  console.log("6. Process Order");
  console.log(chalk.red("0: Exit\n"));
  rl.question("Select an option: ", (option) => {
    switch (option) {
      case "1":
        adminLogin();
        break;
      case "2":
        addProducts();
        break;
      case "3":
        seeAllProducts();
        break;
      case "4":
        editproducts();
        break;
      case "5":
        seeOrders();
        break;
      case "6":
        processOrders();
        break;
      case "0":
        console.log("Thanks for using our app");
        showMenu();
        break;
      default:
        console.log(chalk.magenta("Invalid Option"));
        showMenu();
    }
  });
}

function registerMenu() {
  console.log(chalk.hex("#FF69B4")("\n=== USER MENU ==="));
  console.log("1. See All Products");
  console.log("2. See Single Product");
  console.log("3. Buy Product");
  console.log("4. See Products Bought");
  console.log("5. Search for Order");
  console.log(chalk.red("0: Exit\n"));
  rl.question("Select an option: ", (option) => {
    switch (option) {
      case "1":
        seeproductsmenu();
        break;
      case "2":
        singleaproducts();
        break;
      case "3":
        buyproducts();
        break;
      case "4":
        productbought();
        break;
      case "5":
        searchorder();
        break;
      case "0":
        console.log("Thanks for using our app");
        showMenu();
        break;
      default:
        console.log(chalk.magenta("Invalid Option"));
        showMenu();
    }
  });
}

function seeproductsmenu() {
  console.log(chalk.yellow("\n=== PRODUCT LIST ==="));
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(chalk.red("Error reading products file."));
      showMenu();
      return;
    }
    let products = [];
    if (data) {
      try {
        products = JSON.parse(data);
      } catch (e) {
        console.log(chalk.red("Error parsing products data."));
      }
    }
    products.forEach((product) => {
      console.table({
        ID: product.id,
        Name: product.title,
        Price: `$${product.price}`,
      });
    });
    registerMenu();
  });
}

function searchorder() {
  console.log(chalk.yellow("\n=== SEARCH ORDER ==="));

  if (!fs.existsSync("orders.json") || fs.readFileSync("orders.json", "utf8").trim() === "") {
    console.log(chalk.red("No orders found."));
    return registerMenu();
  }

  let orders = [];
  try {
    orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));
  } catch (e) {
    console.log(chalk.red("Error parsing orders data."));
    return registerMenu();
  }

  rl.question("Enter Product Name or ID to search: ", (query) => {
    const foundOrders = orders.filter(
      (order) =>
        order.id.toString() === query.toString() || 
        order.name.toLowerCase().includes(query.toLowerCase())
    );

    if (foundOrders.length === 0) {
      console.log(chalk.red("No order found with that ID or Name."));
    } else {
      console.log(chalk.green(`\nFound ${foundOrders.length} matching order(s):`));
      foundOrders.forEach((order, index) => {
        console.table({
          OrderNo: index + 1,
          ID: order.id,
          Name: order.title,
          Price: `$${order.price}`,
          Date: order.date,
        });
      });
    }

    registerMenu();
  });
}

function processOrders () {
 console.log(chalk.yellow("\n=== PROCESS ORDER ==="));

if (!fs.existsSync("orders.json") || fs.readFileSync("orders.json", "utf8").trim() === "") {
    console.log(chalk.red("No orders found."));
    return Admin();
  }

  let orders = [];
  try {
    orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));
  } catch (e) {
    console.log(chalk.red("Error parsing orders data."));
    return Admin();
  }

  if (orders.length === 0) {
    console.log(chalk.red("No orders available."));
    return Admin();
  }

  console.log(chalk.green("\nAll User Orders:"));
  orders.forEach((order, index) => {
    console.table({
      OrderNo: index + 1,
      ProductID: order.id,
      ProductName: order.name,
      Price: `$${order.price}`,
      Date: order.date,
    });
  });
  Admin();
};   

function editproducts() {
  console.log(chalk.yellow("\n=== EDIT PRODUCT ==="));

  if (!fs.existsSync("products.json") || fs.readFileSync("products.json", "utf8").trim() === "") {
    console.log(chalk.red("No products found."));
    return Admin();
  }

  let products = [];
  try {
    products = JSON.parse(fs.readFileSync("products.json", "utf8"));
  } catch (e) {
    console.log(chalk.red("Error parsing products data."));
    return Admin();
  }

  rl.question("Enter Product ID to edit: ", (id) => {
    const productIndex = products.findIndex((p) => p.id === Number(id));

    if (productIndex === -1) {
      console.log(chalk.red("No product found with that ID."));
      return Admin();
    }

    const product = products[productIndex];
    console.log(chalk.green("\nCurrent Product Details:"));
    console.table({
      ID: product.id,
      Name: product.title,
      Price: `$${product.price}`,
    });

    rl.question(`Enter new name "${product.name}"): `, (newName) => {
      rl.question(`Enter new price "${product.price}"): `, (newPrice) => {
        products[productIndex].name = newName.trim() !== "" ? newName : product.name;
        products[productIndex].price = newPrice.trim() !== "" ? Number(newPrice) : product.price;

        fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

        console.log(chalk.green("Product updated successfully!"));
        Admin();
      });
    });
  });
}



function singleaproducts() {
  console.log("\n=== SINGLE PRODUCT ===");

  rl.question("Enter Product ID: ", (id) => {
    fs.readFile("products.json", "utf8", (err, data) => {
      if (err) {
        console.log(chalk.red("Error reading products file."));
        return registerMenu();
      }
      let products = [];
      if (data) {
        try {
          products = JSON.parse(data);
        } catch (e) {
          console.log(chalk.red("Error parsing products data."));
          return registerMenu();
        }
      }
      const product = products.find((p) => p.id == id);
      if (product) {
        console.log(chalk.green("\nProduct Found:"));
        console.table({
          ID: product.id,
          Name: product.title,
          Price: `$${product.price}`,
        });
      } else {
        console.log(chalk.red("No product found with that ID."));
      }

      registerMenu();
    });
  });
}

function buyproducts() {
  console.log("\n=== BUY PRODUCTS ===");
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(chalk.red("Error reading products file."));
      return registerMenu();
    }
    let products = [];
    if (data) {
      try {
        products = JSON.parse(data);
      } catch (e) {
        console.log(chalk.red("Error parsing products data."));
        return registerMenu();
      }
    }
    rl.question("Enter Product Name to Buy: ", (title) => {
       const product = products.find(
         (p) => p.title && p.title.toLowerCase() === title.toLowerCase()
       );

      if (!product) {
        console.log(chalk.red("No product found with that name."));
        return registerMenu();
      }
      console.log(chalk.green("\nProduct Found:"));
      console.table({
        ID: product.id,
        Name: product.title,
        Price: `$${product.price}`,
      });
      console.log(
        chalk.green(`\nYou bought "${product.title}" for $${product.price}`)
      );
      let orders = [];
      if ( fs.existsSync("orders.json") && fs.readFileSync("orders.json", "utf8").trim() !== "") {
        orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));
      }
      orders.push({
        id: product.id,
        name: product.title,
        price: product.price,
        date: new Date().toISOString(),
      });
      fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));
      registerMenu();
    });
  });
}

function productbought() {
    console.log(chalk.yellow("\n=== PRODUCTS BOUGHT ==="));
     if (!fs.existsSync("orders.json") || fs.readFileSync("orders.json", "utf8").trim() === "") {
    console.log(chalk.red("No orders found."));
    return registerMenu();
  }

  let orders = [];
  try {
    orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));
  } catch (e) {
    console.log(chalk.red("Error parsing orders data."));
    return registerMenu();
  }

  if (orders.length === 0) {
    console.log(chalk.red("You haven’t buy any products yet."));
  } else {
    orders.forEach(order => {
      console.table({
        ID: order.id,
        Name: order.name,
        Price: `$${order.price}`,
        Date: order.date
      });
    });
  }
   registerMenu(); 
}


function seeAllProducts () {
    console.log(chalk.yellow("\n=== PRODUCT LIST ==="));
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(chalk.red("Error reading products file."));
      showMenu();
      return;
    }
    let products = [];
    if (data) {
      try {
        products = JSON.parse(data);
      } catch (e) {
        console.log(chalk.red("Error parsing products data."));
      }
    }
    products.forEach((product) => {
      console.table({
        ID: product.id,
        Name: product.title,
        Price: `$${product.price}`,
      });
    });
    Admin();
  });
}

function saveProducts(products) {
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
}

function addProducts() {
    console.log(chalk.yellow("\n=== ADD PRODUCTS ==="));
    rl.question("Enter Product Name: ", (name) => {
        rl.question("Enter Product Id: ", (id) => {
            rl.question("Enter Product Price: ", (price) => {
                if (!name || !id || !price) {
                    console.log(chalk.red("Inputs most not be empty"))
                }
                let products = [];
                if (fs.existsSync("products.json") && fs.readFileSync("products.json", "utf8").trim() !== "") {
                    products = JSON.parse(fs.readFileSync("products.json", "utf8"));
                }
                const newProducts = { id: Number(id), name, price, };
                products.push(newProducts);
                saveProducts(products);
                console.log(chalk.green("Product Added Successfully"))
                Admin()
            })
        })
    })
}

function seeOrders() {
    console.log(chalk.yellow("\n=== ALL USER ORDERS ==="));

  if (!fs.existsSync("orders.json") || fs.readFileSync("orders.json", "utf8").trim() === "") {
    console.log(chalk.red("No orders found."));
    return Admin();
  }
  try {
    const orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));

    if (orders.length === 0) {
      console.log(chalk.red("No orders available."));
      return Admin();
    }
    orders.forEach((order, index) => {
      console.table({
        OrderNo: index + 1,
        ID: order.id,
        Name: order.title,
        Price: `$${order.price}`,
        Date: order.date,
      });
    });

  } catch (e) {
    console.log(chalk.red("Error parsing orders file."));
  }

  Admin()
}

seeproducts();
