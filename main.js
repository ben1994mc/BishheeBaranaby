function saveForm(){

	var checkAvailabilityData = {}; 							// showing elements added dynamically
	checkAvailabilityData.RoomType = $('input[name=RoomType]:checked').val();	// get a radio button value
	checkAvailabilityData.PackageType = $('input[name=PackageType]:checked').val();		// gets a single value
	checkAvailabilityData.CID = $('input[type="date"]').val();	
	checkAvailabilityData.COD = $('input[type="date"]').val();
	
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

function postAvailability(disp_id){
	var storedData;
    saveForm(); // save the form again just in case
    storedData = getObject('checkAvailability');
	post('http://localhost:8081/get_form', storedData, disp_id);
};

// submit data for storage by using AJAX (to be implemented) 
function post(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);

    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function(rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array
			
			$('#'+disp_id).empty();
            $.each(json, function(i,val) {
				console.log(val);
				$('#'+disp_id).append(JSON.stringify(val) + "<br/>");
			})
        },
        error: function(){
            alert("han gong a minute there's a problem");
        }
    });
};