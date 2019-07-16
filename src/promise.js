'use strict';
module.exports = name => new Promise(resolve => setTimeout(() => {resolve(`Hello ${name}`)}, 2000))