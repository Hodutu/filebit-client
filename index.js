var credentials = require('./passwords.json');
var request = require('request');
var debug = require('../helpers/debug');

request = request.defaults({jar: true});

var Filebit_API = (function() {

  var loginUrl = 'http://filebit.pl/panel/login';
  var finalUrl = 'http://filebit.pl/includes/ajax.php';

  var login = function(callback) {

    request({
        url: loginUrl,
        method:'POST',
        form: {login: credentials.login, password: credentials.password}
    },

    function(error,response,body) {
      callback(true);
    });
  };

  var getLinks = function(link, callback) {
    debug.log('Intermediate link:', link);
    request({
        url: finalUrl,
        method:'POST',
        form: {
          a: 'serverNewFile',
          url: link,
          t: +(new Date())
        }
    },

    function(error,response,body) {
      callback(JSON.parse(body)[0].array.downloadStream);
    });

  };

  return {
    login: login,
    getLinks: getLinks
  };
})();

module.exports = Filebit_API;
