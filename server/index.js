require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "p"."sku",
           "p"."name",
           "c"."categoryName" as "category",
           "p"."qty"
      from "products" as "p"
      join "category" as "c" using ("categoryId")
  `;

  db.query(sql)
    .then(result => {
      const product = result.rows;
      res.status(200).json(product);
    })
    .catch(err => console.error(err));

});

app.post('/api/products', (req, res, next) => {
  const { sku, name, qty, supplierId, categoryId, cost, shippingCost, size, location, color, status, imageUrl } = req.body;

  const insertSql = `
    insert into "products" ("sku", "name", "qty", "supplierId", "categoryId", "cost", "shippingCost", "size", "location", "color", "status", "imageUrl")
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      returning "sku", "name", "qty", "supplierId", "categoryId", "cost", "shippingCost", "size", "location", "color", "status", "imageUrl"
    `;

  const insertSqlValues = [sku, name, qty, supplierId, categoryId, cost, shippingCost, size, location, color, status, imageUrl];

  for (let i = 0; i < insertSqlValues.length; i++) {
    if (!insertSqlValues[i]) {
      return res.status(400).json({ error: 'Please fill out the entire form' });
    }
  }

  db.query(insertSql, insertSqlValues)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => console.error(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
