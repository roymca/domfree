**1.
	To get different values in page6, we have to check in page6 Controller that
	
	if(response.data.status === 1){
		if(response.data["products in category"].product_id===7)
		{
			$scope.items = response.data["products in category"];
		}
		if(response.data["products in category"].product_id===9)
		{
			$scope.items = response.data["products in category"];
		}
		//-----------for rest of the product_id-----------------//
	}