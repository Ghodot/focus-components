//Global configuration uese for tests.
require('babel/register')({
  optional: ['runtime', 'es7.asyncFunctions']
});
let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
/*eslint-disable */
let should  = chai.should();
/*eslint-enable */

process.on('unhandledRejection', (error)=>{
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});
