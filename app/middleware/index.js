const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');

module.exports = { authJwt, verifySignUp };

/*
const express = require("express");
const { v4: uuidV4 } = require("uuid"); //generates a randomized ID

const app = express();
app.use(express.json());

const customers = [];

//Middleware

function verifyAccount(req, res, next) {
  //next defines if the middleware allows the fucntion to move foward
  const { cpf } = req.headers;
  const customer = customers.find((c) => c.cpf == cpf);
  if (!customer) {
    return res.status(400).json({ error: "customer not found" });
  }
  req.customer = customer;
  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((accumulator, operation) => {
    //get the info from the values, and transform into 1 value
    if (operation.type === "credit") {
      return accumulator + operation.amount;
    } else {
      return accumulator - operation.amount;
    }
  }, 0);

  return balance;
}

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const customersAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customersAlreadyExist) {
    return res.status(400).json({
      error: "Customer already exists!",
    });
  }

  customers.push({
    cpf,
    name,
    id: uuidV4(),
    statement: [],
  });
  return res.status(201).json(customers);
});
//app.use(verifyAccount); //everething below is veryfied.

app.get("/statement", verifyAccount, (req, res) => {
  //implemnte the middleware as an argument => app.get("/statement", verifyAccount, (req, res) => {...

  const { customer } = req;
  return res.json(customer.statement);
});

app.post("/deposit", verifyAccount, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOp = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOp);
  return res.status(201).send();
});
app.get("/statement/date", verifyAccount, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00"); //independet of the timestamp
  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return res.json(statement);
});

app.post("/withdraw", verifyAccount, function (req, res) {
  const { amount } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statement);
  console.log(balance);
  if (amount > balance) {
    return res.status(400).json({ error: "Insufficient funds! =(" });
  }
  const statementOp = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOp);

  return res.status(201).send();
});

app.put("/account", verifyAccount, (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;
  return res.status(201).send();
});

app.get("/account", verifyAccount, (req, res) => {
  const { customer } = req;
  return res.json(customer);
});

app.delete("/account", verifyAccount, (req, res) => {
  const { customer } = req;
  customers.splice(customer, 1);

  return res.status(200).json(customers);
});

app.get("/balance", verifyAccount, (req, res) => {
  const { customer } = req;
  const balance = getBalance(customer.statement);

  return res.json(balance);
});
app.listen(3333);*/
