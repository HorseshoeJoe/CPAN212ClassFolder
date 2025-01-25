const express = require('express');
const router = express.Router();

// /name and /greeting
router.get('/name', (req, res) => {
  res.send('Your Name: Henry Dineros');
});

router.get('/greeting', (req, res) => {
  res.send('Your Name: Henry Dineros, Student Number: 01661670');
});

// /add x y
router.get('/add', (req, res) => {
  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);
  if (!isNaN(x) && !isNaN(y)) {
    res.send(`Result: ${x + y}`);
  } else {
    res.status(400).send('Please provide valid x and y query parameters.');
  }
});

// /calculate a b
router.get('/calculate', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const operation = req.query.operation;

  if (!isNaN(a) && !isNaN(b) && operation) {
    let result;
    switch (operation) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b !== 0 ? a / b : 'Error: Division by zero'; break;
      case '**': result = a ** b; break;
      default: return res.status(400).send('Invalid operation. Use +, -, *, /, or **.');
    }
    res.send(`Result: ${result}`);
  } else {
    res.status(400).send('Please provide valid a, b, and operation query parameters.');
  }
});

module.exports = router;
