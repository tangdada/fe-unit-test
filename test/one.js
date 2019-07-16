'use strict'
require('should');
const exp = require('../src/one');
describe('test one', function () {
  it('should get "hello world!"', function () {
    exp().should.be.eql('hello world!');
  })
});