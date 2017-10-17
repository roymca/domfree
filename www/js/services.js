angular.module('starter')
 
.service('AuthService', function($q, $http) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var password = '';
  var isAuthenticated = false;
  var role = '';
  var authToken1;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
	console.log(token);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token1,token2) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token1, token2);
    useCredentials(token1, token2);
  }
 
  function useCredentials(token1, token2) {
    username = token1;
	password = token2;
	console.log(username);
	console.log(password);
    authToken1 = token1;
	authToken2 = token2;
  }
 
  function destroyUserCredentials() {
    authToken1 = undefined;
	authToken2 = undefined;
    username = '';
	password = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  
  var authlogin = function(user) {
	return $q(function(resolve, reject) {
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
				 if(response.data.status === 1){
						//console.log(response.username);
						storeUserCredentials(user.username,user.password);
						isAuthenticated = true;	
						resolve('Login success.');
					}
					else if(response.data.status === 0){
						reject('Login Failed.');
					}
				
			    } 
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
	password: function() {console.log(password);return password;},
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