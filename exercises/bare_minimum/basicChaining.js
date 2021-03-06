/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var bluebird = require('bluebird');

var {
  getGitHubProfileAsync,
  generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync
} = require('./promisification.js');

var {
  getStatusCodeAsync,
  pluckFirstLineFromFileAsync
} = require('./promiseConstructor.js');

var writeFileAsync = bluebird.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return pluckFirstLineFromFileAsync(readFilePath)
    .then(username => getGitHubProfileAsync(username))
    .then(profile => writeFileAsync(writeFilePath, JSON.stringify(profile)))
    .catch(err => console.error(err));

  // return pluckFirstLineFromFileAsync(readFilePath)
  //   .then((username) => {
  //     console.log('username: ', username);
  //     return getGitHubProfileAsync(username);
  //   })
  //   .then((profile) => {
  //     console.log('profile: ', profile);
  //     return writeFileAsync(writeFilePath, JSON.stringify(profile));
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
