
createVisualization();

function createVisualization() {

	var selectBox_area = document.getElementById("area");
	var area = selectBox_area.options[selectBox_area.selectedIndex].value;

	var selectBox_order = document.getElementById("order-type");
	var order = selectBox_order.options[selectBox_order.selectedIndex].value;

	// first filter for the delivery information
	var selectedDelivery = deliveryData; 
	if (area == "All" && order != "all"){
		selectedDelivery = deliveryData.filter(function(obj){
			return obj.order_type == order;
		})
	}
	else if (area != "All" && order == "all"){
		selectedDelivery = deliveryData.filter(function(obj){
			return obj.area == area;
		})
	}
	else if (area != "All" && order != "all"){
		selectedDelivery = deliveryData.filter(function(obj){
			return (obj.area == area) && (obj.order_type == order);
		})
	} 

	// variables to be shown on web
	var deliveries = selectedDelivery.length;

	var all_amount = 0;
	selectedDelivery.forEach(function(data){
		all_amount += data.count;
	});

	var sum_time = 0;
	selectedDelivery.forEach(function(data){
		sum_time += data.delivery_time;
	});

	avg_time = (sum_time / deliveries).toFixed(1);

	var total_sales = 0;
	selectedDelivery.forEach(function(data){
	 	total_sales += data.price;
	});
	total_sales = total_sales.toFixed(2);

	// double filtering for the feedback in specified area, order
	var feedback_ids = [];
	feedbackData.forEach(function(feedback){
 		feedback_ids.push(feedback.delivery_id);
	});

	var deliv_ids = [];
	selectedDelivery.forEach(function(deliv){
	 	deliv_ids.push(deliv.delivery_id);
	});

	var selected_feedback = [];
	for (i = 0; i < feedback_ids.length; i++){
		if (deliv_ids.indexOf(feedback_ids[i]) >= 0){
	 		selected_feedback.push(feedbackData[i]);
	 	}
	}

	var feedbacks = selected_feedback.length;

	// array for different feedback quality
	var quality_entries = new Array(0,0,0);
	selected_feedback.forEach(function(data){
	 	if (data.quality == "low"){
	 		quality_entries[0] += 1;
		}
		else if (data.quality == "medium"){
		 	quality_entries[1] += 1;
		}
		else{
			quality_entries[2] += 1;
		}
	}); 
	 

	// displaying on web
	document.getElementById("delivery_num").innerHTML = deliveries;
	document.getElementById("total_deliv").innerHTML = all_amount;
	document.getElementById("del_time").innerHTML = avg_time + "min";
	document.getElementById("total_sale").innerHTML = "$" + total_sales;
	document.getElementById("feedback").innerHTML = feedbacks;
	document.getElementById("negative").innerHTML = quality_entries[0];
	document.getElementById("neutral").innerHTML = quality_entries[1];
	document.getElementById("positive").innerHTML = quality_entries[2];
	 

	renderBarChart(selectedDelivery);


}
