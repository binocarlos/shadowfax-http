var angular = require('angular-bsfy')
var debug = require('debug')

module.exports = angular.module('shadowfax.http',[
	
])

.factory('shadowfaxhttp', function(HTTPHandlers){

	

	function getHandler(type, handlers, $scope){
		var log = debug('shadowfaxhttp:' + type)
		return function($ev, data){
			log(data)
			handlers[type](data, function(err){
				if(err){
					log('error %s', err)
					$scope.$emit('shadowfax:error', type, err)
				}
				else{
					log('success %s', err)
					$scope.$emit('shadowfax:complete', type)
				}
			})
		}
	}

	return function($scope, config){
		config = config || {}
		var handlers = HTTPHandlers(config)
		$scope.$on('shadowfax:login', getHandler('login', handlers, $scope))
		$scope.$on('shadowfax:register', getHandler('register', handlers, $scope))
	}
})

.factory('HTTPHandlers', function(LoginHandler, RegisterHandler){
	var factory = {
		'login':LoginHandler,
		'register':RegisterHandler
	}

	return function(config){
		var handlers = {}
		Object.keys(factory || {}).forEach(function(name){
		  if(!config[name]){
				var m = name + ' property required for shadowfaxhttp'
				log('error - ' + m)
				throw new Error(m)
			}
			handlers[name] = factory[name](config[name])         
		})
		return handlers
	}
		
})


.factory('GenericHandler', function($http){
	return function(name, url){
		var log = debug('shadowfaxhttp:' + name)
		return function(data, done){
			log('POST %s', url)
			$http({
				url: url,
				method: 'POST',
				data:data
			})
			.success(function(data, status, headers, config) {
				log('success: %s', data)
				if(done) done(null, data)
	  	})
		  .error(function(data, status, headers, config) {
		  	log('failed: %s', data)
		    if(done) done(data)
		  })
			
		}
	}
})

.factory('LoginHandler', function(GenericHandler){
	return function(url){
		return GenericHandler('login', url)
	}
})


.factory('RegisterHandler', function(GenericHandler){
	return function(url){
		return GenericHandler('register', url)
	}
})