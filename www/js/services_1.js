angular.module('starter')
 
.service('AuthService', function($q, $http) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
	console.log(token);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    username = token;
	console.log(username);
    authToken = token;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  
  var authlogin = function(user) {
	  console.log(user);
    return $q(function(resolve, reject) {
		 console.log(user);
		
			var parameters = {
				'requestMethod': 'login',
				'email': user.username,
				'password': user.password
			};

			var config = {
				params: parameters
			};

			$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', config)
		   .then(
			   function(response){
				  console.log(response);
				  console.log(response.data);
				  // success callback
					if(response.data.status === 1){
						//console.log(response.username);
						storeUserCredentials(user.username);
						isAuthenticated = true;	
						resolve('Login success.');
					}
					else if(response.data.status === 0){
						reject('Login Failed.');
					}
				
			    }, 
			);
	
    });
  };
  
 
  var logout = function() {
    destroyUserCredentials();
  };
  

 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
 
  return {
    authlogin: authlogin,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {console.log(username);return username;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});