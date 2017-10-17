var app = angular.module('starter', ['ionic','ngCordovaOauth'])

	var cartArr = new Array();
	
	app.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
			StatusBar.styleDefault();
			}
		});
	});
	
	
	
	
	app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
		$rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
	 
			if ('data' in next && 'authorizedRoles' in next.data) {
			  var authorizedRoles = next.data.authorizedRoles;
			  if (!AuthService.isAuthorized(authorizedRoles)) {
				event.preventDefault();
				console.log('12345678');
				$state.go($state.current, {}, {reload: true});
				$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
			  }
			}
		 
			if (!AuthService.isAuthenticated()) {
				
				/*
				if (next.name !== 'login') {
					event.preventDefault();
					$state.go('login');
				}
				*/
				
				if (next.name == 'home') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'fxpage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'faqpage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'dealerspage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'contactpage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'missonpage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'termspage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'items') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'pg7page') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'details') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name == 'cartpage') {
					event.preventDefault();
					$state.go('login');
				}
			};
		});
	});
	
	
	


	app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

		  $stateProvider.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'loginCtrl'   
		  });

		  $stateProvider.state('register', {
			url: '/register',
			templateUrl: 'templates/register.html',
			controller: 'registerCtrl'   
		  });
		  
		  $stateProvider.state('forgot', {
			url: '/forgotPassword',
			templateUrl: 'templates/forgot.html',
		    controller: 'forgotCtrl'   
		  });
		  
		  $stateProvider.state('home', {
			cache:false,
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: 'homeCtrl'   
		  });
		  
		  $stateProvider.state('fxpage', {
			cache:false,
			url: '/fx-9',
			templateUrl: 'templates/fx.html',
			//controller: 'fxCtrl'   
		  });
		  
		  $stateProvider.state('faqpage', {
			cache:false,
			url: '/faq',
			templateUrl: 'templates/faq.html',
			//controller: 'faqCtrl'   
		  });
		  
		  $stateProvider.state('dealerspage', {
			cache:false,
			url: '/dealers',
			templateUrl: 'templates/dealers.html',
			//controller: 'dealersCtrl'   
		  });
		  
		  $stateProvider.state('contactpage', {
			cache:false,
			url: '/contact',
			templateUrl: 'templates/contact.html',
			//controller: 'contactCtrl'   
		  });
		  
		  $stateProvider.state('missonpage', {
			cache:false,
			url: '/misson',
			templateUrl: 'templates/misson.html',
			controller: 'missionCtrl'   
		  });
		  
		  $stateProvider.state('termspage', {
			cache:false,
			url: '/termsofservice',
			templateUrl: 'templates/terms.html',
			controller: 'termsCtrl'   
		  });
		    
		  $stateProvider.state('items', {
			cache:false,
			url: '/items/:name',
			templateUrl: 'templates/pg6.html',
			controller: 'pg6Ctrl'   
		  });
		  
		  $stateProvider.state('pg7page', {
			cache:false,
			url: '/page7',
			templateUrl: 'templates/pg7.html',
			controller: 'cartCtrl'   								//pg7Ctrl
		  });
		  
		  $stateProvider.state('details', {
			cache:false,
			url: '/details',
			templateUrl: 'templates/details.html',
			controller: 'cartCtrl'   								//pg7Ctrl
		  });
		  
		  $stateProvider.state('cartpage', {
			cache:false,
			url: '/cart',
			templateUrl: 'templates/cart.html',
			controller: 'cartCtrl'   
		  });
		

		  //console.log("1");
		$urlRouterProvider.otherwise('/login');
	});

	
	
	app.controller('loginCtrl', function($scope, $state, $http, $ionicPopup, AuthService){
		$scope.login=function(user){
			//$state.go('home');
			
			//console.log(user);
			//console.log(user.username);
			
			
				AuthService.authlogin(user).then(function(authenticated) {
					$state.go('home', {}, {reload: true});
					  //$scope.setCurrentUsername(user.email);
					}, function(err) {
					  var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					  });
					  user.username='';
					  user.password='';
					});
			
		}
		
		$scope.reg=function(){
			$state.go('register');
		}
		
		$scope.forget=function(){
			$state.go('forgot');
		}
		
	})

	

	app.controller('registerCtrl', function($scope, $state, $http, $ionicPopup){
		$scope.log=function(){
			$state.go('login');
		}
		
		
		$scope.register=function(ruser){
			//$state.go('home');
			
			console.log(ruser);
			console.log(ruser.email);
			console.log(ruser.password);
			console.log(ruser.repassword);
			
			if(ruser.password === ruser.repassword){
				var parameters = {
					'requestMethod': 'newRegistration',
					'email': ruser.username,
					'password': ruser.password
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
							var alertPopup = $ionicPopup.alert({
								title: 'Registration successful..',
							});
							
							$state.go('login');
						}
						
						if(response.data.status === 0){
							var alertPopup = $ionicPopup.alert({
								title: 'User Already Exists.',
							});
							
							ruser.email='';
							ruser.password='';
							ruser.repassword='';
						}
						
					}, 
				);
			}
			
			if(ruser.password !== ruser.repassword){
				var alertPopup = $ionicPopup.alert({
					title: 'Password mismatch!',
				});
			}
		}
		
		
	})
	
	
	app.controller('forgotCtrl', function($scope, $state, $http, $ionicPopup){
		$scope.back=function(){
			$state.go('login');
		}
		
			$scope.send=function(user){
				var parameters = {
					'requestMethod': 'resetPassword',
					'useremail': user.email
				};

				var config = {
					params: parameters
				};

				$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', config)
			   .then(
				   function(response){
					  console.log(response);
					  console.log(response.status);
					  
					   //success callback
						if(response.status === 200){
							var alertPopup = $ionicPopup.alert({
								title: 'Link for password reset has been emailed to you. Please check your email.',
							});
							
							$state.go('login');
							user.email = '';
						}
					}, 
				);
		
			}
	})


	app.controller('sideCtrl', function($scope, $state, AuthService, $window){
		$scope.hm=function(){
			$state.go('home');
		}
		
		$scope.fx=function(){
			$state.go('fxpage');
		}
		
		$scope.faq=function(){
			$state.go('faqpage');
		}
		
		$scope.dealers=function(){
			$state.go('dealerspage');
		}
		
		$scope.contact=function(){
			$state.go('contactpage');
		}
		
		$scope.misson=function(){
			$state.go('missonpage');
		}
		
		$scope.terms=function(){
			$state.go('termspage');
		}
		
		$scope.logout=function(){
			AuthService.logout();
			$window.location.reload();
			$state.go('login');
		}
	})


	app.controller('homeCtrl', function($scope, $state, $http){
		
		$scope.gocart = function(){
			var parameters = {
				'requestMethod': 'getCart'
			};

			var config = {
				params: parameters
			};

			$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', config)
		   .then(
			   function(response){
				  //console.log(response);
				  // success callback
				 if(response.status === 200){
					$state.go('cartpage');
					//console.log(response.data.categories.length);
					
				 }
				 
				
			   }, 
			   function(response){
				 // failure call back

			   }
			);
			//$state.go('cartpage');
		}
		
		
		var parameters = {
			'requestMethod': 'getAllCategories'
		};

		var config = {
			params: parameters
		};

		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', config)
	   .then(
		   function(response){
			  //console.log(response);
			  //console.log(response.data.status)
			  // success callback
			 if(response.data.status === 1){
				console.log(response.data.categories);
				//console.log(response.data.categories.length);
				$scope.items = response.data.categories;

				var resLength = response.data.categories.length;
				for(var i=0; i<resLength; i++){
					//console.log(response.data.categories[i]);
					response.data.categories[i].action = i; 
					 if (response.data.categories[i].action===0){
					 response.data.categories[i].source = 'img/img1.jpg';}
					 if (response.data.categories[i].action===1){
					 response.data.categories[i].source = 'img/img2.jpg';}
					 if (response.data.categories[i].action===2){
					 response.data.categories[i].source = 'img/img3.jpg';}
					 if (response.data.categories[i].action===3){
					 response.data.categories[i].source = 'img/img4.jpg';}
					 if (response.data.categories[i].action===4){
					 response.data.categories[i].source = 'img/img1.jpg';}
					 if (response.data.categories[i].action===5){
					 response.data.categories[i].source = 'img/img2.jpg';}
					 if (response.data.categories[i].action===6){
					 response.data.categories[i].source = 'img/img3.jpg';}
					 
					//console.log(response.data.categories[i].action);
				}
				
			 }
			 
			
		   }, 
		   function(response){
			 // failure call back

		   }
		);
	
	})



	var globdata = {};
	app.controller('pg6Ctrl', function($http,$scope, $state,$stateParams){
		
		$scope.back = function(){
			$state.go('home');	
		}
		
		console.log($stateParams.name);	
		var paraname = $stateParams.name;
	
		
		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', {
			params:{'requestMethod': 'getAllCategories'}	
			}
		)
	   .then(
		function(response){
			  //console.log(response);
			  //console.log(response.data.status)
			  // success callback
			if(response.data.status === 1){
				console.log(response.data);
				console.log(response.data.categories);
				//console.log(response.data.categories.length);
				$scope.items1 = response.data.categories;

				var resLength = response.data.categories.length;
				for(var i=0; i<resLength; i++){
					//console.log(response.data.categories[i]);
					response.data.categories[i].action = i; 
					
					 if (response.data.categories[i].action===0){
					 response.data.categories[i].source = 'img/img1.jpg';}
					 
					 if (response.data.categories[i].action===1){
					 response.data.categories[i].source = 'img/img2.jpg';}
					 
					 if (response.data.categories[i].action===2){
					 response.data.categories[i].source = 'img/img3.jpg';}
					 
					 if (response.data.categories[i].action===3){
					 response.data.categories[i].source = 'img/img4.jpg';}
					 
					 if (response.data.categories[i].action===4){
					 response.data.categories[i].source = 'img/img1.jpg';}
					 
					 if (response.data.categories[i].action===5){
					 response.data.categories[i].source = 'img/img2.jpg';}
					 
					 if (response.data.categories[i].action===6){
					 response.data.categories[i].source = 'img/img3.jpg';}
						 
					//console.log(response.data.categories[i].action);
				}
				
	/*			
				var n1={};
				var s1={};
	*/
				for( var i=0; i<resLength; i++){
					if(response.data.categories[i].name===paraname)
					$scope.holddata = response.data.categories[i];
				//console.log($scope.items1);
				}
				console.log($scope.holddata);
				console.log($scope.holddata.name);
				console.log($scope.holddata.source);
	
		
			}	
		}, 
		function(response){
			 // failure call back

		}
		);
		
		
		
		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', {
			params:{'requestMethod': 'getAllProductsInCategory','categoryName': 'fm-9-elite-series'}	
			}
		)
	   .then(
		function(response){
			if(response.data.status === 1){
				console.log(response.data);
				console.log(response.data["products in category"]);
				//console.log(response.data.categories.length);
				$scope.items = response.data["products in category"];

				
			}
			
		}, 
		function(response){
			 // failure call back

		}
		);
		
		
		$scope.takedata = function(x) {
			$state.go('pg7page');
			
			x.quantity=1;
			console.log(x);
			globdata = x;
		}
		
	})


	
	
	app.controller('cartCtrl', function($http, $scope, $state, $stateParams, $ionicPopup, $timeout, AuthService){
		//localStorage.clear();
		
		console.log(globdata);
		$scope.specificdata = globdata;
		
		$scope.details = function(){
			$state.go('details');
		}
		
		$scope.gocart = function(){
			$state.go('cartpage');
		}
		
		
		$scope.increaseItemCount = function(item) {
			item.quantity++;
		};
		
		$scope.decreaseItemCount = function(item) {
			if (item.quantity > 1) {
			  item.quantity--;
			}
		};
		
		$scope.addtocart = function(specificdata){
			//$state.go('cartpage');
			console.log(specificdata.product_id);
			console.log(specificdata.quantity);
			if (AuthService.isAuthenticated()) {
				//$scope.x = AuthService.username
				//console.log(AuthService.username());
				//console.log(AuthService.password());
				var data1 = AuthService.username();
				var data2 = AuthService.password();
				
			
				var parameters = {
					'requestMethod': 'checkUserlogins',
					'userEmail': data1,
					'userPass': data2,
				};

				var config = {
					params: parameters
				};

				$http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config)
				.then(
					function(response){
						console.log(response.data.message);
						// success callback
							if(response.data.message === 'success'){
								console.log("Add cart data with productId and quantity");
								var parameters = {
									'requestMethod': 'addCartData',
									'productId': specificdata.product_id,
									'quantity': specificdata.quantity,
								};

								var config = {
									params: parameters
								};

								$http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config)
								.then(
									function(response){
										console.log(response.data);
										// success callback
											
											console.log(specificdata);
											$scope.alldata = specificdata;
											console.log($scope.alldata);
											$state.go('cartpage');
									}, 
									function(response){
									// failure call back

									}
								); 
							}
					}, 
					function(response){
					// failure call back

					}
				);
			}
		}
		
		
		/*
		function populatecart(){
				console.log(localStorage["freedom"]);
				var appData = JSON.parse( window.localStorage.getItem('freedom'));
				//var appData = JSON.parse(localStorage["freedom"]);
				console.log(appData);
				$scope.alldata=appData;
				console.log($scope.alldata);	
		}
		
		populatecart();
		*/
		//calculate total amount
			function calculatetotal(){
				var amount=0;
				var cart_items = JSON.parse(localStorage["freedom"]);
					for (i=0;i<cart_items.length;i++){
					  amount=amount+(cart_items[i].product_price*cart_items[i].quantity);
					}
					$scope.total=amount;
				
			}
			calculatetotal();
		
		
		
		$scope.removefromcart=function(user){	
			console.log(user);
			var cart_items = new Array;
			cart_items = JSON.parse(localStorage["freedom"]);
			console.log(cart_items);
			for (i=0;i<cart_items.length;i++){
				if (cart_items[i].product_id == user.product_id)
				{
					console.log('deleted');
					cart_items.splice(this.$index,1);
					cartArr.splice(this.$index,1);
					console.log(cart_items);
					//localStorage.removeItem(cart_items[i]);
					//localStorage["freedom"] = JSON.stringify(cart_items);
					localStorage.setItem('freedom', JSON.stringify(cart_items));
				};
			}
				
				console.log(localStorage["freedom"]);
				//$window.location.reload();
				populatecart();
				calculatetotal();
		};
			
			
			
		$scope.editQuantity = function (type, user) {
			if(type === "add"){
				var cart_items = JSON.parse(localStorage["freedom"]);
				for (i=0;i<cart_items.length;i++){
					if (cart_items[i].product_id == user.product_id){
						if(cart_items[i].quantity<10){
							cart_items[i].quantity=cart_items[i].quantity+1;
							localStorage["freedom"] = JSON.stringify(cart_items);
							user.quantity=user.quantity+1;
							console.log(cart_items[i].quantity);
							console.log(window.localStorage.getItem('freedom'));
						}
					}
				}
				calculatetotal();		
			}
			
			if(type === "subtract"){
				var cart_items = JSON.parse(localStorage["freedom"]);
				for (i=0;i<cart_items.length;i++){
					if (cart_items[i].product_id == user.product_id){
						if(cart_items[i].quantity>1){
							cart_items[i].quantity=cart_items[i].quantity-1;
							localStorage["freedom"] = JSON.stringify(cart_items);
							user.quantity=user.quantity-1;
							console.log(cart_items[i].quantity);
							console.log(window.localStorage.getItem('freedom'));
						}
					}
				}
				calculatetotal();
			}
		}

				$scope.goshop=function(){
					$state.go('home');
				}
			
	})



	app.controller('missionCtrl', function($http,$scope, $state){

		var parameters = {
		'requestMethod': 'getMissionStatement'
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
						console.log(response.data);
						//console.log(response.data.categories.length);
						$scope.mission = response.data;
					}
			}, 
			function(response){
			// failure call back

			}
		);

	})
	
	
	
	
	app.controller('termsCtrl', function($http,$scope, $state){

		var parameters = {
		'requestMethod': 'getTermsOfService'
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
						console.log(response.data);
						//console.log(response.data.categories.length);
						$scope.terms = response.data;
					}
			}, 
			function(response){
			// failure call back

			}
		);

	})