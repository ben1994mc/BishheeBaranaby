function saveForm(){

	var checkAvailabilityData = {}; 							// showing elements added dynamically
	checkAvailabilityData.RoomType = $('input[name=RoomType]:checked').val();	// get a radio button value
	checkAvailabilityData.PackageType = $('input[name=PackageType]:checked').val();		// gets a single value
	checkAvailabilityData.CID = $('input[name="CID"]').val();	
	checkAvailabilityData.COD = $('input[name="COD"]').val();
	
        // check we're getting what we hope for
	console.log('RoomType =', checkAvailabilityData.RoomType);
	console.log('PackageType =', checkAvailabilityData.PackageType);
	console.log('CID =', checkAvailabilityData.CID);
	console.log('COD =', checkAvailabilityData.COD);
	
        setObject('checkAvailability', checkAvailabilityData);				// store the data locally
	var storedData = getObject('checkAvailability');		// get it back again...
	// check...
        console.log('RoomType =', storedData.RoomType);
	console.log('PackageType =', storedData.PackageType);
	console.log('CID =', storedData.CID);
	console.log('COD =', storedData.COD);
};

function postAvailability(disp_id, disp_id2){
	var storedData;
    saveForm(); // save the form again just in case
    storedData = getObject('checkAvailability');
	post('http://localhost:8081/get_form', storedData, disp_id, disp_id2);
};

function changePage(url){
	var win = window.open(url, '_self');
	win.focus();
};

// submit data for storage by using AJAX (to be implemented) 
function post(path, data, disp_id, disp_id2) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);
	var booking_page = $("<input type='button' value='Proceed to Booking' id='Proceed_to_Booking' onclick = 'changePage('localhost:8080/index2.html)'>");
    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function(rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array
			
			$('#'+disp_id).empty();
			
			
			if(json != null){
            
				$('#'+disp_id).append(booking_page);
				$('#'+disp_id2).remove();
			}
        },
        error: function(){
            alert("there's a problem");
        }
    });
};

