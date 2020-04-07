'use strict';

const request = require('supertest');
const app = require('../lib/server');
const agent = request(app);

describe('Test home page and 404', () => {
  test('Should load homepage', async () => {
    const res = await agent.get('/').send();
    expect(res.status).toBe(200);
    expect(res.text).toBe('<h2>Homepage</h2>');
  });

  test('Should load 404', async () => {
    const res = await agent.get('/fake-url').send();
    expect(res.status).toBe(404);
    expect(res.error.text).toBe('<h2>404 Page Not Found</h2>');
  });
});

describe('Test add category', () => {
  test('Should add a new category', async () => {
    const category = {
      id: 10,
      name: 'test category',
      display_name: 'test category',
      description: 'testing category CRUD',
    };
    const res = await agent.post('/api/v1/categories').send(category);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(category);
  });

  test('Should fail to add an invalid category', async () => {
    const category = {
      display_name: 'test category',
      description: 'testing category CRUD',
    };
    const res = await agent.post('/api/v1/categories').send(category);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({});
  });
});

describe('Test reading categories', () => {
  test('Should get all categories', async () => {
    const res = await agent.get('/api/v1/categories');
    expect(res.body.count).toBe(5);
  });
});

describe('Test update category', () => {
  test('Should update category', async () => {
    const updateCategory = {
      name: 'Updated name',
      display_name: 'Updated display name',
      description: 'Updated description',
    };
    const res = await agent.put('/api/v1/categories/10').send(updateCategory);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(10);
  });

  test('Should fail to update an invlalid category', async () => {
    const res = await agent.put('/api/v1/categories/11');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});

describe('Test delete category', () => {
  test('Should delete the category', async () => {
    const res = await agent.delete('/api/v1/categories/10');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(10);
  });

  test('Should fail to delete an invalid category', async () => {
    const res = await agent.delete('/api/v1/categories/10');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});

describe('Test add product', () => {
  test('Should add a new product', async () => {
    const product = {
      id: 10,
      category: 'test category',
      name: 'test product',
      display_name: 'test product',
      description: 'testing product CRUD',
    };
    const res = await agent.post('/api/v1/products').send(product);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(product);
  });

  test('Should fail to add an invalid new product', async () => {
    const product = {
      name: 'test product',
      display_name: 'test product',
      description: 'testing product CRUD',
    };
    const res = await agent.post('/api/v1/products').send(product);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({});
  });
});

describe('Test reading products', () => {
  test('Should get all the products', async () => {
    const res = await agent.get('/api/v1/products');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(5);
  });
});

describe('Test update product', () => {
  test('Should update the product', async () => {
    const product = {
      category: 'test category',
      name: 'test product',
      display_name: 'test product',
      description: 'testing product CRUD',
    };
    const res = await agent.put('/api/v1/products/10').send(product);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(10);
  });

  test('Should fail to update an invalid product', async () => {
    const res = await agent.put('/api/v1/products/11');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});

describe('Test delete product', () => {
  test('Should delete the product', async () => {
    const res = await agent.delete('/api/v1/products/10');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(10);
  });

  test('Should fail to delete an invalid product', async () => {
    const res = await agent.delete('/api/v1/products/10');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});
