shadowfax-http
==============

Angular HTTP service for [shadowfax](https://github.com/binocarlos/shadowfax) login forms.

Connects to a REST based backend to perform login/register actions - [gandalf](https://github.com/binocarlos/gandalf) will work out of the box.

## install

Install the module to your project:

```
$ npm install binocarlos/shadowfax-http --save
```

## usage

Create a new handler by passing in a $scope that contain some shadowfax directives:

```js
var angular = require('angular-bsfy')
var shadowfax = require('shadowfax')
var shadowfaxhttp = require('shadowfax-http')

var app = angular.module('myApp',[
    shadowfax.name,
    shadowfaxhttp.name
])

.controller('LoginPage', function($scope, shadowfaxhttp){

	// listen to the shadowfax form events and dispatch
	// them to the given urls
	shadowfaxhttp($scope, {
		login:'/auth/login',
		register:'/auth/register'
	})

	// triggered if the user has logged in or registered with no problems
	$scope.$on('shadowfax:complete', function($ev, type){

		// type is a string 'login' or 'register'

		if(type=='login'){
			document.location = '/dashboard'
		}
		else{
			document.location = '/postregister'	
		}

	})

	// display a login error (like incorrect password)
	$scope.$on('shadowfax:error', function($ev, type, error){

		// type is 'login' or 'register' or 'save'

	})

	// display general information
	$scope.$on('shadowfax:message', function($ev, type, error){

		// type is 'login' or 'register' or 'save'

	})
})
```

## build

Then compile with [browserify](https://github.com/substack/node-browserify) and [brfs](https://github.com/substack/brfs):

```bash
$ browserify app.js > bundle.js
```

## license

MIT