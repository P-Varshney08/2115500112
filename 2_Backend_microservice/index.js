const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const app = express();
const PORT = 8080;

const API_ENDPOINTS = [
  'http://20.244.56.144/test/companies/AMZ/categories/',
  'http://20.244.56.144/test/companies/FLP/categories/',
  'http://20.244.56.144/test/companies/SNP/categories/',
  'http://20.244.56.144/test/companies/MYN/categories/',
  'http://20.244.56.144/test/companies/AZO/categories/',
];

const getProducts = async (category, minPrice, maxPrice) => {
  const requests = API_ENDPOINTS.map(endpoint =>
    axios.get(`${endpoint}${category}/products?minPrice=${minPrice}&maxPrice=${maxPrice}`)
  );
  const responses = await Promise.all(requests);
  return responses.flatMap(response => response.data.products);
};

const sortItems = (items, sortBy, order) => {
  return _.orderBy(items, [sortBy], [order]);
};

const paginateItems = (items, page, limit) => {
  const startIndex = (page - 1) * limit;
  return items.slice(startIndex, startIndex + limit);
};

app.get('/categories/:categoryname/products', async (req, res) => {
  try {
    const { categoryname } = req.params;
    let { n = 10, page = 1, sortBy = 'price', order = 'asc', minPrice = 0, maxPrice = Number.MAX_VALUE } = req.query;

    n = parseInt(n);
    page = parseInt(page);
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);

    if (isNaN(n) || n <= 0) n = 10;
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(minPrice) || minPrice < 0) minPrice = 0;
    if (isNaN(maxPrice) || maxPrice <= 0) maxPrice = Number.MAX_VALUE;

    const products = await getProducts(categoryname, minPrice, maxPrice);

    products.forEach(product => {
      product.id = uuidv4();
    });

    const sortedProducts = sortItems(products, sortBy, order);
    const paginatedProducts = paginateItems(sortedProducts, page, n);

    res.json({ products: paginatedProducts });
  } catch (error) {
    console.error(`Error retrieving products: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/',async(req,res)=>{
    try {
      return res.status(200).json({products:[
        {
          "productName": "Laptop 13",
          "price": 1244,
          "rating": 4.7,
          "discount": 63,
          "availability": "yes"
        },
        {
          "productName": "Laptop 3",
          "price": 9102,
          "rating": 4.5,
          "discount": 45,
          "availability": "out-of-stock"
        },
        {
          "productName": "Laptop 11",
          "price": 2652,
          "rating": 4.12,
          "discount": 98,
          "availability": "out-of-stock"
        },
        {
          "productName": "Laptop 4",
          "price": 1258,
          "rating": 3.8,
          "discount": 33,
          "availability": "yes"
        }
      ]
      })
      
    } catch (error) {
      
    }
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
