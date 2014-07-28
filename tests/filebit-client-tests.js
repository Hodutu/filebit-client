'use strict';

var assert = require('assert');
var nock = require('nock');

var fbc = require('../');

var login = 'fake-login';
var password = 'fake-password';

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
