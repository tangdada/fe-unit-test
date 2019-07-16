'use strict';
require('should');

const mylib = require('../src/promise');
describe('test promise', () => {
  it('Welcome to Tmall', () => {
    return mylib('Tmall').should.be.fulfilledWith('Hello Tmall');
  });
});