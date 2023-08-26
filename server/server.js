import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import ClientError from './lib/client-error.js';
import { authMiddleware } from './lib/authorization-middleware.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/products/weapons', async (req, res, next) => {
  try {
    const sql = `
      select "productId",
             "name",
             "price",
             "imageUrl"
        from "products"
       where "type" = 'weapon'
       order by "name"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/api/products/vehicles', async (req, res, next) => {
  try {
    const sql = `
      select "productId",
             "name",
             "price",
             "imageUrl"
        from "products"
       where "type" = 'vehicle'
       order by "name"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/api/products/throwables', async (req, res, next) => {
  try {
    const sql = `
      select "productId",
             "name",
             "price",
             "imageUrl"
        from "products"
       where "type" = 'throwable'
       order by "name"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
      select "productId",
             "name",
             "price",
             "imageUrl",
             "description"
        from "products"
       where "productId" = $1
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(
        404,
        `cannot find product with productId ${productId}`
      );
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.get('/api/cart/:userId', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const sql = `
      select *
        from "products"
        join "shoppingCartItem" using ("productId")
        join "shoppingCart" using ("shoppingCartId")
        join "users" using ("userId")
       where "users"."userId" = $1
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/cart/addtocart', authMiddleware, async (req, res, next) => {
  try {
    const { productId, quantity, shoppingCartId } = req.body;
    const itemCheck = `
      select "shoppingCartItemId"
        from "shoppingCartItem"
       where "productId" = $1
         and "shoppingCartId" = $2
      `;
    const itemCheckParams = [productId, shoppingCartId];
    const itemCheckResult = await db.query(itemCheck, itemCheckParams);
    if (itemCheckResult.rows.length > 0) {
      const quantityUpdate = `
        update "shoppingCartItem"
        set "quantity" = "quantity" + $1
        where "productId" = $2
        and "shoppingCartId" = $3
        `;
      const quantityUpdateSql = [quantity, productId, shoppingCartId];
      const quantityUpdateResult = await db.query(
        quantityUpdate,
        quantityUpdateSql
      );
      res.status(201).json(quantityUpdateResult);
    } else {
      const sql = `
        insert into "shoppingCartItem" ("productId", "quantity", "shoppingCartId")
        values ($1, $2, $3)
        returning *
      `;
      const params = [productId, quantity, shoppingCartId];
      const result = await db.query(sql, params);
      const [cart] = result.rows;
      res.status(201).json(cart);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/cart/removeitem', authMiddleware, async (req, res, next) => {
  try {
    const { productId, shoppingCartId } = req.body;
    const sql = `
      delete
        from "shoppingCartItem"
       where "productId" = $1
         and "shoppingCartId" = $2
    `;
    const params = [productId, shoppingCartId];
    await db.query(sql, params);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.post('/api/cart/update', authMiddleware, async (req, res, next) => {
  try {
    const { productId, shoppingCartId, quantity } = req.body;
    const sql = `
      update "shoppingCartItem"
         set "quantity" = $3
       where "productId" = $1
         and "shoppingCartId" = $2
    `;
    const params = [productId, shoppingCartId, quantity];
    await db.query(sql, params);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.post('/api/checkout', authMiddleware, async (req, res, next) => {
  try {
    const { cart } = req.body;
    const lineItems = [];
    cart.forEach((item) => {
      lineItems.push({
        price: item.stripeId,
        quantity: item.quantity,
      });
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cart',
    });
    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const userCheck = `
      select "username"
        from "users"
       where "username" = $1
    `;
    const userCheckSql = [username.toLowerCase()];
    const userCheckResult = await db.query(userCheck, userCheckSql);
    if (userCheckResult.rows.length > 0) {
      throw new ClientError(400, 'Username already exists');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning *
    `;
    const params = [username.toLowerCase(), hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    const cartSql = `
      insert into "shoppingCart" ("userId")
      values ($1)
      returning *
    `;
    const cartParams = [user.userId];
    await db.query(cartSql, cartParams);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
             "hashedPassword",
             "shoppingCartId"
        from "users"
        join "shoppingCart" using ("userId")
       where "username" = $1
    `;
    const params = [username.toLowerCase()];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }

    const { userId, hashedPassword, shoppingCartId } = user;

    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username, shoppingCartId };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
