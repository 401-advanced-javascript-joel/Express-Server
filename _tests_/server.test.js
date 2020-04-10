'use strict';

const request = require('supertest');
const mockDB = require('../data/mock-db');
const { server } = require('../lib/server');
const agent = request(server);

const category = {
  name: 'test category',
  display_name: 'test category',
  description: 'testing category CRUD',
};

const product = {
  category: 'test category',
  name: 'test product',
  display_name: 'test product',
  description: 'testing product CRUD',
};

beforeAll(async () => await mockDB.connectMock());

afterAll(async () => await mockDB.closeMock());

describe('Test home page and 404', () => {
  test('Should load homepage', async () => {
    const res = await agent.get('/').send();
    expect(res.status).toBe(200);
    expect(res.text).toBe('<h2>Homepage</h2>');
  });

  test('Should load 404', async () => {
    const res = await agent.get('/fake-url').send();
    expect(res.status).toBe(404);
    expect(res.error.text).toBe('<h2>Error 404: Page Not Found</h2>');
  });
});

describe('Test add category', () => {
  test('Should add a new category', async () => {
    const res = await agent.post('/api/v1/categories').send(category);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
  });

  test('Should fail to add an invalid category', async () => {
    const badCategory = {
      display_name: 'test category',
      description: 'testing category CRUD',
    };
    const res = await agent.post('/api/v1/categories').send(badCategory);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({});
  });
});

describe('Test reading categories', () => {
  test('Should get all categories', async () => {
    const res = await agent.get('/api/v1/categories');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  test('Should get a specific category', async () => {
    const response = await agent.post('/api/v1/categories').send(category);
    const id = response.body._id;
    const res = await agent.get('/api/v1/categories/' + id);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });
});

describe('Test update category', () => {
  test('Should update category', async () => {
    const response = await agent.post('/api/v1/categories').send(category);
    const id = response.body._id;
    const updateCategory = {
      name: 'Updated name',
      display_name: 'Updated display name',
      description: 'Updated description',
    };
    const res = await agent
      .put('/api/v1/categories/' + id)
      .send(updateCategory);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('Should fail to update an invlalid category', async () => {
    const res = await agent.put('/api/v1/categories/5e8eb97888854d039cc08a88c');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});

describe('Test delete category', () => {
  test('Should delete the category', async () => {
    const response = await agent.post('/api/v1/categories').send(category);
    const id = response.body._id;
    const res = await agent.delete('/api/v1/categories/' + id);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('Should fail to delete an invalid category', async () => {
    const res = await agent.delete(
      '/api/v1/categories/5e8eb97888854d039cc08a88c',
    );
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});

describe('Test add product', () => {
  test('Should add a new product', async () => {
    const res = await agent.post('/api/v1/products').send(product);
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual(product.name);
  });

  test('Should fail to add an invalid new product', async () => {
    const badProduct = {
      name: 'test product',
      display_name: 'test product',
      description: 'testing product CRUD',
    };
    const res = await agent.post('/api/v1/products').send(badProduct);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({});
  });
});

describe('Test reading products', () => {
  test('Should get all the products', async () => {
    const res = await agent.get('/api/v1/products');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  test('Should get a specific product', async () => {
    const response = await agent.post('/api/v1/products').send(product);
    const id = response.body._id;
    const res = await agent.get('/api/v1/products/' + id);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });
});

describe('Test update product', () => {
  test('Should update the product', async () => {
    const response = await agent.post('/api/v1/products').send(product);
    const id = response.body._id;
    const res = await agent.put('/api/v1/products/' + id).send(product);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('Should fail to update an invalid product', async () => {
    const res = await agent.put('/api/v1/products/5e8eb97888854d039cc08a88c');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});

describe('Test delete product', () => {
  test('Should delete the product', async () => {
    const response = await agent.post('/api/v1/products').send(product);
    const id = response.body._id;
    const res = await agent.delete('/api/v1/products/' + id);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('Should fail to delete an invalid product', async () => {
    const res = await agent.delete(
      '/api/v1/products/5e8eb97888854d039cc08a88c',
    );
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});
