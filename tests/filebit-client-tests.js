'use strict';

var assert = require('assert');
var nock = require('nock');

var fbc = require('../');

var login = 'fake-login';
var password = 'fake-password';
var link = 'fake-link';

var mockLogin = function(answer) {
nock('http://filebit.pl')
.post('/panel/login',
  {
    login : login,
    password: password
  }
)
.reply(200, answer);
};

var mockFileBit = function(answer){
  nock('http://filebit.pl')
  .post('/includes/ajax.php',
    {
      a: 'serverNewFile',
      url: link,
      t: +(new Date())
    }
  )
  .reply(200, answer);
};

// Login page test
// Correct login & password;
mockLogin('logged in!');
fbc.login(login, password, function(err, resp){
  assert.equal(err, null);
  assert(resp);
});

// wrong password
mockLogin('Podane hasło jest nieprawidłowe!');
fbc.login(login, password, function(err, resp) {
  assert.equal(err.message, 'Login error!');
  assert.equal(resp, undefined);
});

// wrong login
mockLogin('Błąd: Podany użytkownik nie istnieje! Niezła lipa.');
fbc.login(login, password, function(err, resp) {
  assert.equal(err.message, 'Login error!');
  assert.equal(resp, undefined);
});


// File API test
mockFileBit('[{"array":{"downloadStream":"final-link"}}]');
fbc.getLink(link, function(err, resp){
  assert.equal(err, null);
  assert.equal(resp, 'final-link');
});

// File API test
mockFileBit('HWDP');
fbc.getLink(link, function(err, resp){
  assert.equal(err.message, 'Cannot parse server answer');
  assert.equal(resp, undefined);
});

// Server error
mockFileBit('[{"array":{"downloadStream":"final-link"},"error":"1337"}]');
fbc.getLink(link, function(err, resp){
  assert.equal(err.message, 'Server error');
  assert.equal(resp, undefined);
});
