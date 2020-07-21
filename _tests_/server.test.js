'use strict';

const request = require('supertest');
const mockDB = require('../data/mock-db');
const { server } = require('../lib/server');
const agent = request(server);

const categories = [
  {
    name: 'test category',
    displayName: 'test category',
  },
  {
    name: 'test category 1',
    displayName: 'test category',
  },
  {
    name: 'test category 2',
    displayName: 'test category',
  },
  {
    name: 'test category 3',
    displayName: 'test category',
  },
];

const product = {
  category: 'test category',
  name: 'test product',
  description: 'testing product CRUD',
  image:
    'https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  price: 500.0,
  inStock: 5,
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
    const res = await agent.post('/api/v1/categories').send(categories[0]);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categories[0].name);
  });

  test('Should fail to add an invalid category', async () => {
    const badCategory = {
      displayName: 'test category',
      description: 'testing category CRUD',
    };
    const res = await agent.post('/api/v1/categories').send(badCategory);
    expect(res.status).toBe(400);
    expect(res.body.error.name).toBe('ValidationError');
  });
});

describe('Test reading categories', () => {
  test('Should get all categories', async () => {
    const res = await agent.get('/api/v1/categories');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  test('Should get a specific category', async () => {
    const response = await agent.post('/api/v1/categories').send(categories[1]);
    const id = response.body._id;
    const res = await agent.get('/api/v1/categories/' + id);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });
});

describe('Test update category', () => {
  test('Should update category', async () => {
    const response = await agent.post('/api/v1/categories').send(categories[2]);
    const id = response.body._id;
    const updateCategory = {
      name: 'Updated name',
      displayName: 'Updated display name',
    };
    const res = await agent
      .put('/api/v1/categories/' + id)
      .send(updateCategory);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('Should fail to update an invlalid category', async () => {
    const res = await agent.put('/api/v1/categories/5e926a2a17c00458508ad631');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});

describe('Test delete category', () => {
  test('Should delete the category', async () => {
    const response = await agent.post('/api/v1/categories').send(categories[3]);
    const id = response.body._id;
    const res = await agent.delete('/api/v1/categories/' + id);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
  });

  test('Should fail to delete an invalid category', async () => {
    const res = await agent.delete(
      '/api/v1/categories/5e926a2a17c00458508ad631',
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
      displayName: 'test product',
      description: 'testing product CRUD',
    };
    const res = await agent.post('/api/v1/products').send(badProduct);
    expect(res.status).toBe(400);
    expect(res.body.error.name).toEqual('ValidationError');
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
    const res = await agent.put('/api/v1/products/5e926a2a17c00458508ad631');
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
    const res = await agent.delete('/api/v1/products/5e926a2a17c00458508ad631');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});
