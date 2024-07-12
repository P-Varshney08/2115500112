// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = 8080;

// app.get('/numbers', async (req, res) => {
//   try {
//     let { url } = req.query;

//     if (!Array.isArray(url)) {
//       url = ["http://20.244.56.144/numbers/primes", "http://20.244.56.144/numbers/fibo", "http://20.244.56.144/numbers/odd","http://20.244.56.144/numbers/rand"];
//     }

//     const numbers = [];

//     const requests = url.map(async (url) => {
//       try {
//         const response = await axios.get(url);
//         const { numbers: urlNumbers } = response.data;
//         numbers.push(...urlNumbers);
//       } catch (error) {
//         console.error(`Error retrieving numbers from ${url}: ${error.message}`);
//       }
//     });

//     await Promise.all(requests);
//     const mergedNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);

//     res.json({ numbers: mergedNumbers });
//   } catch (error) {
//     console.error(`Error processing request: ${error.message}`);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8080;
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc1Njk1LCJpYXQiOjE3MjA3NzUzOTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjVkMDg0MDk0LTJmN2ItNDQ4Zi04ODI1LWJhZjhlODY2OTc3NyIsInN1YiI6InByaXlhLnZhcnNobmV5X2NzLmFpbWwyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJBZmZvcmQgTWVkaWNhbCIsImNsaWVudElEIjoiNWQwODQwOTQtMmY3Yi00NDhmLTg4MjUtYmFmOGU4NjY5Nzc3IiwiY2xpZW50U2VjcmV0IjoiamhOR21LSGRHSWVGd1d5WCIsIm93bmVyTmFtZSI6IlByaXlhIiwib3duZXJFbWFpbCI6InByaXlhLnZhcnNobmV5X2NzLmFpbWwyMUBnbGEuYWMuaW4iLCJyb2xsTm8iOiIyMTE1NTAwMTEyIn0.Inw7NCDtqnxEJ7UGFxMF1k7DNg7SiCR-EiEQallAufU";

app.get('/numbers', async (req, res) => {
  try {
    let { url } = req.query;
    if (!Array.isArray(url)) {
      url = ["http://20.244.56.144/numbers/primes", "http://20.244.56.144/numbers/fibo", "http://20.244.56.144/numbers/odd", "http://20.244.56.144/numbers/rand"];
    }
    const numbers = [];
    const requests = url.map(async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`
          }
        });
        const { numbers: urlNumbers } = response.data;
        numbers.push(...urlNumbers);
      } catch (error) {
        console.error(`Error retrieving numbers from ${url}: ${error.message}`);
      }
    });
    await Promise.all(requests);
    const mergedNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
