# filebit-client by [@michalbe](http://github.com/michalbe) #
Automated client for file download helper - [filebit.pl](http://filebit.pl)

### What? ###
Filebit-client allows to use filebit in node.js environment.

### API: ###

Filebit-client has only two methods:

* __login(login, password, callback)__
* __getLink(search-term, options, callback)__:

### How to use: ###
```
npm install filebit-client
```
then:
```javascript
var fbc = require('filebit-client');

// Log-in first
fbc.login('my-login', 'my-password', function(error, loggedIn){
  if (error) {
    // we could not logged in
    console.log(error);
    return;
  }

  // We are logged in, so let's download some file!
  fbc.getLink('http://some-very-expensive-hosting-site.com/file.mkv', function(error, link){
    if (error) {
      // we could not get proper link
      console.log(error);
      return;
    }

    // We have nice link to download!
    console.log(link); // http://blabla.filebit.pl/file.mkv
  });
});
```

### To Do ###
  * Support of multiple files in one request
  * Fix timestamps in tests (sometimes tests fail because the date used in Nock to mock the server response is different than the one used to send the request)


### Testing ###
To contribute to the project:

```bash
#clone the repo
$ git clone git@github.com:michalbe/filebit-client.git
$ cd filebit-client

#install all the dependencies
$ npm install

#to run jshint:
$ npm run lint

#to run tests
$ npm test
```

Tests & linter are hooked to commit (using [precommit-hook](https://github.com/nlf/precommit-hook)), it's not possible tocommit if linter is not passing or there are failing tests. To commit anyway:
```bash
$ git commit -n
```
