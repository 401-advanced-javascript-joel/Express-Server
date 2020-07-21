'use strict';

const mockDB = require('../data/mock-db');
const { productsModel } = require('../lib/models/Model');
const errorSpy = jest.spyOn(console, 'error');

beforeAll(async () => await mockDB.connectMock());

afterAll(async () => await mockDB.closeMock());

describe('Testing productsModel create method', () => {
  test('Should create new product', async () => {
    errorSpy.mockClear();
    const result = await productsModel.create({
      category: 'test category',
      name: 'test product',
    });
    expect(result.name).toBe('test product');
  });

  test('Should fail to create new product', async () => {
    const result = await productsModel.create({});
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});

describe('Testing productsModel read method', () => {
  test('Should read all products', async () => {
    await productsModel.create({
      category: 'test category',
      name: 'test product',
    });
    const results = await productsModel.read();
    expect(results.length).toBe(2);
  });
});

describe('Testing productsModel readOne method', () => {
  test('Should read the specified product', async () => {
    const product = await productsModel.create({
      category: 'test category',
      name: 'test product',
    });
    const result = await productsModel.readOne(product._id);
    expect(result._id).toEqual(product._id);
  });

  test('Should fail to read the product given nonexisting id', async () => {
    const id = '5e926a2a17c00458508ad631';
    const result = await productsModel.readOne(id);
    expect(result).toBeNull();
  });

  test('Should fail to read the product given invalid id', async () => {
    errorSpy.mockClear();
    const id = '5e926a2a17c00458508ad63';
    const result = await productsModel.readOne(id);
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});

describe('Testing productsModel update method', () => {
  test('Should update the product', async () => {
    const product = await productsModel.create({
      category: 'test category',
      name: 'test product',
    });
    const update = { name: 'Updated test product' };
    const result = await productsModel.update(product._id, update);
  });

  test('Should fail to update the product given nonexisting id', async () => {
    const id = '5e926a2a17c00458508ad631';
    const update = { name: 'Updated test product' };
    const result = await productsModel.update(id, update);
    expect(result).toBeNull();
  });

  test('Should fail to update the product given invalid id', async () => {
    errorSpy.mockClear();
    const id = '5e926a2a17c00458508ad63';
    const update = { name: 'Updated test product' };
    const result = await productsModel.update(id, update);
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});

describe('Testing productsModel delete method', () => {
  test('should delete specified product', async () => {
    const product = await productsModel.create({
      category: 'test category',
      name: 'test product',
    });
    const result = await productsModel.delete(product._id);
    expect(result._id).toEqual(product._id);
  });

  test('should fail to delete when given a nonexisting id', async () => {
    const id = '5e926a2a17c00458508ad631';
    const result = await productsModel.delete(id);
    expect(result).toBeNull();
  });

  test('should fail to delete when given an invalid id', async () => {
    errorSpy.mockClear();
    const id = '5e926a2a17c00458508ad63';
    const result = await productsModel.delete(id);
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});
