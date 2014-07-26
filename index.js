'use strict';

var credentials = require('./passwords.json');
var request = require('request');

request = request.defaults({jar: true});

var Filebit_API = (function() {

  var loginUrl = 'http://filebit.pl/panel/login';
  var finalUrl = 'http://filebit.pl/includes/ajax.php';

  var login = function(login, password, callback) {

    request({
        url: loginUrl,
        method:'POST',
        form: {login: login, password: password}
    },

    function(error,response,body) {
      callback(true);
    });
  };

  var getLinks = function(link, callback) {
    console.log('Intermediate link:', link);
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


Filebit_API.login(credentials.login, credentials.password, function() {
  Filebit_API.getLinks(
    'http://bitshare.com/files/b4dctnwu/Suits.S04E06.HDTV.XviD-AFG.avi.html',
    function(result){
      console.log('LINK: result');
    }
  )

});
