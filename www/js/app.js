var app = angular.module('starter', ['ionic','ngCordovaOauth','ngCordova']);

	var cartArr = new Array();
	var StatusBar;
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
				if (next.name !== 'login' && next.name !=='register' && next.name !=='forgot' && next.name !=='checkoutpage' && next.name !=='addresspage' ) {
					event.preventDefault();
					$state.go('login');
				};
                        };
				
				/*if (next.name === 'home') {
					event.preventDefault();
					$state.go('login');
				}
				
                                if (next.name === 'fxpage') {
					event.preventDefault();
					$state.go('login');
				}
                        
				if (next.name === 'faqpage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name === 'dealerspage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name === 'contactpage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name === 'missionpage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name === 'termspage') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name === 'items') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name === 'pg7page') {
					event.preventDefault();
					$state.go('login');
				}
				
				if (next.name === 'details') {
					event.preventDefault();
					$state.go('login');
				}
				
				/*if (next.name == 'cartpage') {
					event.preventDefault();
					$state.go('login');
				}*/
			//};//end of if
                        /*if (AuthService.isAuthenticated()) {
                          if (next.name  ) {
                             
					event.preventDefault();
					$state.go('home');
                                    }  
                        }*///end of if
			
		});//end of rootscope
	});//end of run function
        
	
	


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
			templateUrl: 'templates/fx.html'
			//controller: 'fxCtrl'   
		  });
		  
		  $stateProvider.state('faqpage', {
			cache:false,
			url: '/faq',
			templateUrl: 'templates/faq.html'
			//controller: 'faqCtrl'   
		  });
		  
		  $stateProvider.state('dealerspage', {
			cache:false,
			url: '/dealers',
			templateUrl: 'templates/dealers.html',
			controller: 'dealersCtrl'   
		  });
		  
		  $stateProvider.state('contactpage', {
			cache:false,
			url: '/contact',
			templateUrl: 'templates/contact.html',
			controller: 'contactCtrl'   
		  });
		  
		  $stateProvider.state('missionpage', {
			cache:false,
			url: '/mission',
			templateUrl: 'templates/mission.html',
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
			controller: 'pg7Ctrl'   								//pg7Ctrl
		  });
		  
		  $stateProvider.state('details', {
			cache:false,
			url: '/details',
			templateUrl: 'templates/details.html',
			controller: 'pg7Ctrl'   								//pg7Ctrl
		  });
		  
		  $stateProvider.state('cartpage', {
			cache:false,
			url: '/cart',
			templateUrl: 'templates/cart.html',
			controller: 'cartpageCtrl'   
		  });
		
                 $stateProvider.state('checkoutpage', {
			cache:false,
			url: '/checkout',
			templateUrl: 'templates/checkout.html',
			controller: 'checkoutCtrl'   
		  });
                  
                 $stateProvider.state('addresspage', {
			cache:false,
			url: '/address',
			templateUrl: 'templates/address.html',
			controller: 'addressCtrl'   
		  });

		  //console.log("1");
		$urlRouterProvider.otherwise('/login');
	});

	
	
	app.controller('loginCtrl', function($scope, $state, $http, $ionicPopup, AuthService){
		$scope.login=function(user){
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
		};
		
		$scope.reg=function(){
			$state.go('register');
		};
		
		$scope.forget=function(){
			$state.go('forgot');
		};
		
	});

	

	app.controller('registerCtrl', function($scope, $state, $http, $ionicPopup){
		$scope.log=function(){
			$state.go('login');
		};
		
		
		$scope.register=function(ruser){
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
					 if(response.data.status === 1){
							var alertPopup = $ionicPopup.alert({
								title: 'Registration successful..'
							});
							
							$state.go('login');
						}
						
						if(response.data.status === 0){
							var alertPopup = $ionicPopup.alert({
								title: 'User Already Exists.'
							});
							
							ruser.email='';
							ruser.password='';
							ruser.repassword='';
						}
						
					} 
				);
			}
			
			if(ruser.password !== ruser.repassword){
				var alertPopup = $ionicPopup.alert({
					title: 'Password mismatch!'
				});
			}
		};
		
		
	});
	
	
	app.controller('forgotCtrl', function($scope, $state, $http, $ionicPopup){
		$scope.back=function(){
			$state.go('login');
		};
		
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
					  if(response.status === 200){
							var alertPopup = $ionicPopup.alert({
								title: 'Link for password reset has been emailed to you. Please check your email.'
							});
							
							$state.go('login');
							user.email = '';
						}
					} 
				);
		
			};
	});


	app.controller('sideCtrl', function($scope, $state, AuthService, $window){
		$scope.hm = function(){
			$state.go('home');
		};
		
		$scope.fx = function(){
			$state.go('fxpage');
		};
		
		$scope.faq = function(){
			$state.go('faqpage');
		};
		
		$scope.dealers = function(){
			$state.go('dealerspage');
		};
		
		$scope.contact = function(){
			$state.go('contactpage');
		};
		
		$scope.mission = function(){
			$state.go('missionpage');
		};
		
		$scope.terms = function(){
			$state.go('termspage');
		};
		$scope.fm = function(){
			$state.go('fxpage');
		};
		
		$scope.logout=function(){
			AuthService.logout();
			$window.location.reload();
			$state.go('login');
		};
                $scope.checkout = function(){
			$state.go('checkoutpage');
		};
                $scope.shipping = function(){
			$state.go('addresspage');
		};
		
	});


	app.controller('homeCtrl', function($scope, $state, $http){
            $scope.gocart = function(){
                $state.go('cartpage');
            };
		
            var parameters = {
			'requestMethod': 'getAllCategories'
		};

		var config = {
			params: parameters
		};

		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', config)
                .then(
		   function(response){
			 if(response.data.status === 1){
				$scope.items = response.data.categories;

				var resLength = response.data.categories.length;
				for(var i=0; i<resLength; i++){
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
	
	});



	var globdata = {};
	app.controller('pg6Ctrl', function($http,$scope, $state,$stateParams){
		
		$scope.back = function(){
			$state.go('home');	
		};
		
		console.log($stateParams.name);	
		var paraname = $stateParams.name;
	
		
		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', {
			params:{'requestMethod': 'getAllCategories'}	
			}
		)
	   .then(
		function(response){
			  if(response.data.status === 1){
				$scope.items1 = response.data.categories;

				var resLength = response.data.categories.length;
				for(var i=0; i<resLength; i++){
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
			globdata = x;
		};
		
	});


	
	
	app.controller('pg7Ctrl', function($http, $scope, $state, $stateParams, $ionicPopup, $timeout, AuthService){
            
                //localStorage.clear();
		console.log(globdata);
		
		$scope.specificdata = globdata;
		
		$scope.details = function(){
			$state.go('details');
		};
		
		$scope.gocart = function(){
                    $state.go('cartpage');
		};
		$scope.back=function(){
			$state.go('home');
		};
		$scope.backpg7=function(){
			$state.go('pg7page');
		};
		
		$scope.increaseItemCount = function(item) {
			item.quantity++;
		};
		
		$scope.decreaseItemCount = function(item) {
			if (item.quantity > 1) {
			  item.quantity--;
			}
		};
		
		$scope.addtocart = function(specificdata){
			if (AuthService.isAuthenticated()) {
				//$scope.x = AuthService.username
				console.log(AuthService.username());
				console.log(AuthService.password());
				var data1 = AuthService.username();
				var data2 = AuthService.password();
				
			
				var parameters2 = {
					'requestMethod': 'checkUserlogins',
					'userEmail': data1,
					'userPass': data2
				};

				var config2 = {
					params: parameters2
				};

				$http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config2)
				.then(
					function(response){
						if(response.data.message === 'success'){
								var parameters3 = {
									'requestMethod': 'addCartData',
									'productId': specificdata.product_id,
									'quantity': specificdata.quantity
								};
									
								var config3 = {
									params: parameters3
								};

								$http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config3)
								.then(
									function(response){
										console.log(response);
                                                                                    $ionicPopup.alert({
                                                                                            title: 'Item added'
                                                                                    });
									}, 
									function(err){
									// failure call back

									}
								); 
							}
					}, 
					function(err){
					// failure call back

					}
				);
			}
		};
		   
	});



        app.controller('cartpageCtrl', function($http,$scope, $state,  $ionicPopup){
            //calculatetotal();
            var parameters = {
		'requestMethod': 'getCart'
            };

            var config = {
		params: parameters
            };

		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config)
		.then(
			function(response){
                            console.log(response);
				// success callback
                            if(response.data.length > 0){
                                $scope.cartitems = response.data;
                                console.log($scope.cartitems);
                                console.log($scope.cartitems.length);
                                calculatetotal();
                                function calculatetotal(){
                                    var amount=0;
                                    var items = $scope.cartitems;
                                    for (i=0;i<items.length;i++){
                                        amount=amount+(items[i].price*items[i].quantity);
                                    }//end of for
                                        $scope.total=amount;
                                            console.log($scope.total);
                                }//end of function calculate
                                                            
                                     
				$scope.increaseItemCount = function(item) {
                                    item.quantity++;
                                    calculatetotal();
                                };				

                                $scope.decreaseItemCount = function(item) {
                                    console.log(item);
                                    if (item.quantity > 1) {
                                      item.quantity--;
                                      calculatetotal();
                                    }
                                };
                            
                                
                                $scope.removefromcart=function(item){	
                                       
                                        var parameters1 = {
                                            'requestMethod': 'deleteCartData',
                                            'productId': item.ID,
                                            'quantity': item.quantity
                                        };

                                        var config1 = {
                                            params: parameters1
                                        };

                                            $http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config1)
                                            .then(
                                                    function(response){
                                                        console.log(response);
                                                            // success callback
                                                            if (response.data.length !== 0)
                                                            {
                                                                $scope.cartitems = response.data;
                                                                console.log($scope.cartitems);
                                                                
                                                            }
                                                        $ionicPopup.alert({
                                                             title: 'Item deleted'
                                                        });
                                                        calculatetotal();
                                                    }, //end of success res
                                                    function(err){
                                                        // failure call back
                                                    }
                                                );//end of .then


                                            calculatetotal();	
                                    };//end of remove from cart
                    
                            }//end of if
			}, //end of success res
			function(err){
                            // failure call back

			}
                    );//end of .then
            
            
            
            /*   var parameters2 = {
                    'requestMethod': 'cartEmpty',
                    
                };

                var config2 = {
                    params: parameters2
                };

                $http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config2)
                .then(
                        function(response){
                            console.log(response);
                            $scope.cartitems = response;
                        
                        }, //end of success res
                        
                        function(err){
                            
                            // failure call back
                        }
                     );//end of .then
                            
                     */       
                            
                            
            
                $scope.goshop=function(){
                    $state.go('home');
                };
                
                 $scope.cartCheckout = function(){
                     $ionicPopup.alert({
                        title: 'Please fillup shipping and billing address..'
                     });
                    $state.go('addresspage');
                 };
                 
                 $scope.back=function(){
                    $state.go('home');
                };
            
        });//end of cartpage controller

      
       app.controller('missionCtrl', function($http,$scope, $state){

		var parameters = {
                    requestMethod: 'getMissionStatement'
		};

		var config = {
                    params: parameters
		};

		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', config)
		.then(
			function(response){
                            if(response.data.status === 1){
				$scope.mission = response.data;
                            }
			}, 
			function(response){
			// failure call back

			}
		);

	});
	
	app.controller('dealersCtrl', function($http,$scope, $state){

		var parameters = {
		'requestMethod': 'getDealers'
		};

		var config = {
		params: parameters
		};

		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', config)
		.then(
			function(response){
                            if(response.data.status === 1){
				$scope.dealers = response.data;
                            }
			}, 
			function(response){
			// failure call back

			}
		);

	});
	
	
	
	
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
				if(response.data.status === 1){
                                    $scope.terms = response.data;
				}
			}, 
			function(err){
			}
		);

	});
	
//-----------------------------------------------contact page map controller-------------------------------------
	var google;
	app.controller('contactCtrl', function($scope, $ionicLoading) {
		console.log("contactCtrl controller");

    google.maps.event.addDomListener(window, 'click', function() {
		console.log("addDomListener");
        var myLatlng = new google.maps.LatLng(38.025741, -87.443682);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		console.log("contactCtrl controller2");
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(38.025741, -87.443682),
                map: map,
                title: "Freedom Ordanance"
            });
		
        $scope.map = map;
    });
 
 
});

app.controller('checkoutCtrl', function($scope,$state,$http, $ionicPopup) {
    console.log(sdetails);
    console.log(bdetails);
    $scope.shippingdetails = sdetails; 
    $scope.billingdetails = bdetails; 
    
    $scope.back = function(){
	$state.go('cartpage');
    };
    
     var parameters = {
		'requestMethod': 'getCart'
            };

            var config = {
		params: parameters
            };

		$http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config)
		.then(
			function(response){
                            console.log(response);
				// success callback
                            if(response.data.length > 0){
                                $scope.items = response.data;
                                console.log($scope.items);
                                console.log($scope.items.length);
                                calculatetotal();
                                function calculatetotal(){
                                    var amount=0;
                                    var product = $scope.items;
                                    for (i=0;i<product.length;i++){
                                        amount=amount+(product[i].price*product[i].quantity);
                                    }//end of for
                                        $scope.total=amount;
                                            console.log($scope.total);
                                }//end of function calculate
                                  
                            }//end of if
                        }//end of function
                    ); //end of then

                   $scope.payment = function(shippingdetails,billingdetails,finalitem,card){
                       
                       var obj = { "order": { "billing_address": { "first_name": billingdetails.fname, "last_name": billingdetails.lname, "address_1": billingdetails.address1, "address_2": billingdetails.address2, "city": billingdetails.city, "state": billingdetails.state, "postcode": billingdetails.postcode, "country": billingdetails.country, "email": billingdetails.email, "phone": billingdetails.phone }, 
                                                       "shipping_address": { "first_name": shippingdetails.fname, "last_name": shippingdetails.lname, "address_1": shippingdetails.address1, "address_2": shippingdetails.address2, "city": shippingdetails.city, "state": shippingdetails.state, "postcode": shippingdetails.postcode, "country": shippingdetails.country }, 
                                                       }}
			var x = obj.order;
			var myjson = JSON.stringify(x);
                        console.log(myjson);
                        
                        var parameters = {
                            'requestMethod': 'createCart',
                            'order' : myjson,
                        };

                        var config = {
                            params: parameters
                        };

                            $http.get('http://dev.elagoondigital.net/FreedomOrdnance/final/wp/cart_service.php', config)
                            .then(
                                    function(response){
                                        console.log(response);
                                    }
                                );
                       
                   };
                   $scope.edit = function(shippingdetails,billingdetails){
                       $scope.sa = shippingdetails;
                        $scope.ba = billingdetails;
                        sdetails = $scope.sa;
                        bdetails = $scope.ba;
                        $state.go('addresspage');
                    };
                    
                  

});
	
 var sdetails = {}; 
 var bdetails = {}; 
app.controller('addressCtrl', function($scope,$state,$http) {
    $scope.back = function(){
	$state.go('checkoutpage');
    };
    
    $scope.sa = {};
    $scope.ba = {};
    
    $scope.sa = sdetails;
    $scope.ba = bdetails;
    $scope.update = function(sa) {
        $scope.ba = angular.copy($scope.sa);
    };
    
    $scope.submit = function(sa , ba){
       
        $scope.shippingdetails = sa;
        sdetails = $scope.shippingdetails;
        
        
        $scope.billingdetails = ba;
        bdetails = $scope.billingdetails;
        
        
        $state.go('checkoutpage');
    };
    
     
    
    
   
});
