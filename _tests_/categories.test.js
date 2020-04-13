'use strict';

const mockDB = require('../data/mock-db');
const { categoriesModel } = require('../lib/models/Model');
const errorSpy = jest.spyOn(console, 'error');

beforeAll(async () => await mockDB.connectMock());

afterAll(async () => await mockDB.closeMock());

describe('Testing categoriesModel create method', () => {
  test('Should create new category', async () => {
    errorSpy.mockClear();
    const result = await categoriesModel.create({
      name: 'test category',
    });
    expect(result.name).toBe('test category');
  });

  test('Should fail to create new category', async () => {
    const result = await categoriesModel.create({});
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});

describe('Testing categoriesModel read method', () => {
  test('Should read all categories', async () => {
    await categoriesModel.create({ name: 'test category' });
    const results = await categoriesModel.read();
    expect(results.length).toBe(2);
  });
});

describe('Testing categoriesModel readOne method', () => {
  test('Should read the specified category', async () => {
    const category = await categoriesModel.create({ name: 'test category' });
    const result = await categoriesModel.readOne(category._id);
    expect(result._id).toEqual(category._id);
  });

  test('Should fail to read the category given a nonexisting id', async () => {
    errorSpy.mockClear();
    const id = '5e926a2a17c00458508ad631';
    const result = await categoriesModel.readOne(id);
    expect(result).toBeNull();
  });

  test('Should fail to read the category given invalid id', async () => {
    errorSpy.mockClear();
    const id = '5e926a2a17c00458508ad63';
    const result = await categoriesModel.readOne(id);
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});

describe('Testing categoriesModel update method', () => {
  test('Should update the category', async () => {
    const category = await categoriesModel.create({ name: 'test category' });
    const update = { name: 'Updated test category' };
    const result = await categoriesModel.update(category._id, update);
  });

  test('Should fail to update the category given nonexisting id', async () => {
    const id = '5e926a2a17c00458508ad631';
    const update = { name: 'Updated test category' };
    const result = await categoriesModel.update(id, update);
    expect(result).toBeNull();
  });

  test('Should fail to update the category given invalid id', async () => {
    errorSpy.mockClear();
    const id = '5e926a2a17c00458508ad63';
    const update = { name: 'Updated test category' };
    const result = await categoriesModel.update(id, update);
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});

describe('Testing categoriesModel delete method', () => {
  test('should delete specified category', async () => {
    const category = await categoriesModel.create({ name: 'test category' });
    const result = await categoriesModel.delete(category._id);
    expect(result._id).toEqual(category._id);
  });

  test('should fail to delete when given a nonexisting id', async () => {
    const id = '5e926a2a17c00458508ad631';
    const result = await categoriesModel.delete(id);
    expect(result).toBeNull();
  });

  test('should fail to delete when given an invalid id', async () => {
    errorSpy.mockClear();
    const id = '5e926a2a17c00458508ad63';
    const result = await categoriesModel.delete(id);
    expect(result.error).not.toBe(undefined);
    expect(errorSpy).toHaveBeenCalled();
  });
});
