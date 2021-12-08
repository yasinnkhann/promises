/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var bluebird = require('bluebird');
// var promiseFs = bluebird.promisify(require('fs'));

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {

  return new bluebird ((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, file) => {
      if (err) {
        reject(err);
      } else {
        let pos = file.indexOf('\n');
        let ans = file.substring(0, pos);
        resolve(ans);
      }
    });
  });


  // return promiseFs.readFile(filePath, 'utf-8')
  //   .then((data) => {
  //     const pos = data.indexOf('\n');
  //     const ans = data.substring(0, pos);
  //     return ans;
  //   })

  // return fs.promises.readFile(filePath, 'utf-8')
  //   .then((data) => {
  //     const pos = data.indexOf('\n');
  //     const ans = data.substring(0, pos);
  //     console.log(ans);
  //   });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new bluebird ((resolve, reject) => {
    request.get(url, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
