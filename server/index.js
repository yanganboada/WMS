require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const csv = require('csvtojson');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    file.fieldname === 'imageUpload'
      ? cb(null, __dirname + '/public/images/')
      : cb(null, __dirname + '/public/uploads/');
  },
  filename: (req, file, cb) => {
    file.fieldname === 'imageUpload'
      ? cb(null, file.originalname)
      : cb(null, file.originalname + '-' + Date.now());
  }
});
const upload = multer({ storage: storage });

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

app.post('/api/images', upload.single('imageUpload'), (req, res, next) => {
  const image = req.file;
  if (!image) {
    next(new ClientError('please upload a image', 404));
  }
  res.status(200).json(image);
});

app.post('/api/uploads', upload.single('csvUpload'), (req, res, next) => {
  const csvFile = req.file;
  const path = req.file.path;
  if (!csvFile) {
    next(new ClientError('please upload a csv file', 404));
  }
  csv()
    .fromFile(path)
    .then(response => res.status(200).json(response));
});

app.post('/api/products-location', (req, res, next) => {
  const skuList = [];
  req.body.forEach(product => {
    skuList.push(product.sku);
  });
  console.log('req.body', req.body);

  const sql = `
  select "productId",
  "sku",
  "color",
  "location",
  "qty"
  from "products"
  `;

  let whereSql = 'where "sku" IN (';
  const value = [];

  skuList.forEach((sku, index) => {
    value.push(`${sku}`);
    index === skuList.length - 1
      ? whereSql += `$${index + 1})
        order by "location"`
      : whereSql += `$${index + 1}, `;
  });

  db.query(`${sql} ${whereSql}`, value)
    .then(result => {
      const products = result.rows;
      products.map(product => {
        req.body.forEach(reqProduct => {
          if (reqProduct.sku === product.sku) {
            const qty = reqProduct.qty;
            product.qty = qty;
          }
        });
      });
      res.status(200).json(products);
    })
    .catch(err => console.error(err));
});

app.get('/api/po-suggest/', (req, res, next) => {
  const sql = `
    select "sku",
           "name",
           "qty",
           "cost"
      from "products"
      where "qty" <= 20
  `;
  const budget = req.query.budget;

  db.query(sql)
    .then(result => {
      const product = result.rows;
      let totalEstimate = 0;
      product.map(product => {
        poQty = 20 - product.qty;
        product.qty = poQty;
        totalEstimate += product.cost * poQty;
      });

      if (totalEstimate <= budget) {
        res.status(200).json(result.rows);
      } else {
        poPersentage = budget / totalEstimate;
        product.map(product => {
          product.qty = Math.floor(product.qty * poPersentage);
        });
        res.status(200).json(result.rows);
      }

    })
    .catch(err => console.error(err));
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
        res.status(200).json(result.rows[0]);
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

  const values = [req.query.qty];

  db.query(sql, values)
    .then(result => {
      if (result.rowCount === 0) {
        next(new ClientError(`there is no amount with ${req.query.qty} in the database`, 404));
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => console.error(err));

});

app.get('/api/products-filter', (req, res, next) => {

  const sql = `
    select "sku",
           "name",
           "c"."categoryName" as "category",
           "qty"
      from "products"
      join "category" as "c" using ("categoryId")
  `;

  let whereSql = '';
  const values = [];

  if (req.query.sku) {
    whereSql = 'where sku ILIKE $1';
    values.push(`%${req.query.sku}%`);

  } else if (req.query.name) {
    whereSql = 'where name ILIKE $1';
    values.push(`%${req.query.name}%`);

  } else if (req.query.category) {
    whereSql = 'where "c"."categoryName" ILIKE $1';
    values.push(`%${req.query.category}%`);

  } else if (req.query.qty) {
    whereSql = 'where qty = $1';
    values.push(`${req.query.qty}`);
  }

  db.query(`${sql} ${whereSql}`, values)
    .then(result => {
      if (result.rowCount === 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => console.error(err));

});

app.get('/api/products-category', (req, res, next) => {
  const sql = `
    select "p"."qty" as "quantity",
           "p"."cost",
           "c"."categoryName" as "category"
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
