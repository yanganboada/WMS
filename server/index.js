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
    select "p"."productId",
           "p"."sku",
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

  const requiredFields = ['sku', 'name', 'qty', 'supplierId', 'categoryId', 'cost', 'shippingCost', 'size', 'location', 'color', 'status', 'imageUrl'];
  const errors = [];

  for (let i = 0; i < requiredFields.length; i++) {
    if (!req.body[requiredFields[i]]) {
      errors.push(requiredFields[i] + ' is a required field');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  db.query(insertSql, insertSqlValues)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => console.error(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const sql = `
    select *
      from "products"
      join "category" as "c" using ("categoryId")
      join "supplier" as "s" using ("supplierId")
    where "productId" = $1
  `;

  const values = [req.params.productId];

  db.query(sql, values)
    .then(result => {
      if (result.rowCount === 0) {
        next(new ClientError(`"productId" ${productId} does not in the database`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.patch('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const sql = `
    update "products"
    SET "status" = NOT "status"
    where "productId" = $1
    returning *
  `;

  const values = [req.params.productId];

  db.query(sql, values)
    .then(result => {
      if (result.rowCount === 0) {
        next(new ClientError(`"productId" ${productId} does not in the database`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.put('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const { sku, name, qty, supplierId, categoryId, cost, shippingCost, size, location, color, imageUrl } = req.body;

  const sql = `
    update "products"
    SET "sku" = $2,
        "name" = $3,
        "qty" = $4,
        "supplierId" = $5,
        "categoryId" = $6,
        "cost" = $7,
        "shippingCost" = $8,
        "size" = $9,
        "location" = $10,
        "color" = $11,
        "imageUrl" =$12
    where "productId" = $1
    returning *
  `;

  const values = [req.params.productId, sku, name, qty, supplierId, categoryId, cost, shippingCost, size, location, color, imageUrl];

  db.query(sql, values)
    .then(result => {
      if (result.rowCount === 0) {
        next(new ClientError(`"productId" ${productId} does not in the database`, 404));
      } else {
        res.status(204).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/products-quantity', (req, res, next) => {
  const sql = `
    select "sku",
           "name",
           "c"."categoryName" as "category",
           "qty"
      from "products"
      join "category" as "c" using ("categoryId")
      where "qty" <= $1
  `;

  const values = [req.body.qty];

  db.query(sql, values)
    .then(result => {
      if (result.rowCount === 0) {
        next(new ClientError('there is no amount with that qty in the database', 404));
      } else {
        res.status(200).json(result.rows);
      }
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
