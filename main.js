function saveForm() {

    var checkAvailabilityData = {}; // showing elements added dynamically
    checkAvailabilityData.RoomType = $('input[name=RoomType]:checked').val(); // get a radio button value
    checkAvailabilityData.PackageType = $('input[name=PackageType]:checked').val(); // gets a single value
    checkAvailabilityData.CID = $('input[name="CID"]').val();
    checkAvailabilityData.COD = $('input[name="COD"]').val();
    // check we're getting what we hope for
    console.log('RoomType =', checkAvailabilityData.RoomType);
    console.log('PackageType =', checkAvailabilityData.PackageType);
    console.log('CID =', checkAvailabilityData.CID);
    console.log('COD =', checkAvailabilityData.COD);
    setObject('checkAvailability', checkAvailabilityData); // store the data locally
    var storedData = getObject('checkAvailability'); // get it back again...
// check...
    console.log('RoomType =', storedData.RoomType);
    console.log('PackageType =', storedData.PackageType);
    console.log('CID =', storedData.CID);
    console.log('COD =', storedData.COD);

    console.log(localStorage.length);
}
;

function saveCustomer() {

    var customerData = {};
    customerData.Email = $('#c_email').val();
    customerData.cardType = $('input[name=cardtype]:checked').val();
    customerData.Name = $('#nameoncard').val();
    customerData.ExpiryA = $('#expirydateA').val();
    customerData.ExpiryB = $('#expirydateB').val();
    customerData.CardNo = $('#cardno').val();
    customerData.AddressA = $('#firstline').val();
    customerData.AddressB = $('#secondline').val();
    customerData.AddressC = $('#thirdline').val();
    customerData.PostCode = $('#postcode').val();
    customerData.Notes = $('#notes').val();

    console.log('Email = ', customerData.Email);
    console.log('Card Type = ', customerData.cardType);
    console.log('Name = ', customerData.Name);
    console.log('Expiry Date = ', customerData.ExpiryA, customerData.ExpiryB);
    console.log('Adress = ', customerData.AddressA, customerData.AddressB, customerData.AddressC, customerData.PostCode);
    console.log('Notes = ', customerData.Notes);
    console.log('Card No. = ', customerData.CardNo);

    setObject('customer', customerData);
    var storedData2 = getObject('customer');

    console.log('Card Type = ', storedData2.cardType);
    console.log('Name = ', storedData2.Name);
    console.log('Expiry Date = ', storedData2.ExpiryA, storedData2.ExpiryB);
    console.log('Adress = ', storedData2.AddressA, storedData2.AddressB, storedData2.AddressC, storedData2.PostCode);
    console.log('Notes = ', storedData2.Notes);
    console.log(localStorage.length);
    console.log('Card No. = ', storedData2.CardNo);
}
$(document).ready(function () {
    $("#booking").hide();

});

function showbooking() {
    $("#booking").show();
}

function hidemain() {
    $("#main").hide();
}
function postSummary(disp_id) {
    var storedData;
    storedData = getObject('checkAvailability');
    bookingSummary(storedData, disp_id);

}
;

function bookingSummary(data, disp_id) {
    console.log(disp_id);
    console.log('TEST TEST TEST TEST TEST TEST');

    console.log(data.PackageType + ' TESTIIIIIIINNNNGGG');
    var room = "'" + data.PackageType + '_' + data.RoomType + "'";
    console.log(room);

    if (JSON.stringify(room).includes('sup_d'))
    {
        console.log('success1');
        $('#' + disp_id).append("Superior Double" + "<br/>");
        $('#' + disp_id).append('<img src="Deluxe-Double.jpg" alt="Restaurant" style="width:50%">' + "<br/>");

    } else
    if (JSON.stringify(room).includes('sup_t'))
    {
        console.log('success2');
        $('#' + disp_id).append("Superior Twin" + "<br/>");
        $('#' + disp_id).append('<img src="twinroom.jpg" alt="Restaurant" style="width:50%">' + "<br/>");
    } else
    if (JSON.stringify(room).includes('std_d'))
    {
        console.log('success3');
        $('#' + disp_id).append("Standard Double" + "<br/>");
        $('#' + disp_id).append('<img src="double-standard.jpg" alt="Restaurant" style="width:50%">' + "<br/>");
    } else
    if (JSON.stringify(room).includes('std_t'))
    {
        console.log('success4');
        $('#' + disp_id).append("Standard Twin" + "<br/>");
        $('#' + disp_id).append('<img src="twin-standard.jpg" alt="Restaurant" style="width:50%">' + "<br/>");

    }
    $('#' + disp_id).append("From:" + "<br/>");
    $('#' + disp_id).append(data.CID + "<br/>");
    $('#' + disp_id).append("To:" + "<br/>");
    $('#' + disp_id).append(data.COD + "<br/>");
}


function checkAvailability(disp_id) {
    var storedData;
    saveForm(); // save the form again just in case
    storedData = getObject('checkAvailability');
    post('http://localhost:8081/get_form', storedData, disp_id);
}
;



// submit data for storage by using AJAX (to be implemented) 

function post(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);
$('#' + disp_id).remove;
    var booking = '"bookingSUM"';
    var price = '"price"';
    var booking_page = "<input type='button' value='Proceed to Booking' onclick='hidemain(); showbooking(); postSummary(" + booking + "); post_total(" + price + ")'>";


    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array
             $('#' + disp_id).empty;
            if (json.length > 0) {
                $('#' + disp_id).empty();

                $('#' + disp_id).append("<h3>Rooms are available!</h3>");
                $('#' + disp_id).append("<h5>Would you like to book now?</h5>");
                $('#' + disp_id).append(booking_page);
            }
            if (json.length == 0) {
                postAvailability('CheckAvailabilitybar');
            }

        },
        error: function () {
            alert("there's a problem");
        }
    });
}
;
function postAvailability(disp_id) {
    var storedData;
    saveForm(); // save the form again just in case
    storedData = getObject('checkAvailability');
    no_rooms('http://localhost:8081/no_rooms', storedData, disp_id);
}
;

function no_rooms(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);
$('#' + disp_id).remove;

    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array

            $('#' + disp_id).empty;
            if (json.length > 0) {

                $('#' + disp_id).empty;
                $('#' + disp_id).append("<h3>Sorry, we have no available rooms of that type for that date</h3>");
                $('#' + disp_id).append("<h4>However, rooms of the following type are available:</h4>");

                
                var i = 0;
                    var j = 0;
                    var k = 0;
                    var f = 0;
                
                $.each(json, function (i, val) {
                    console.log(val);
                    
                    
                    if (JSON.stringify(val).includes('sup_d') && (i == 0))
                    {
                        i++;
                                $('#' + disp_id).append('Superior Double' + "<br/>");
                        $('#' + disp_id).append('<img src="Deluxe-Double.jpg" alt="Restaurant" style="width:50%">' + "<br/>");
                    } else
                    if (JSON.stringify(val).includes('sup_t') && (j == 0))
                    {
                        j++;
                        $('#' + disp_id).append('Superior Twin' + "<br/>");
                        $('#' + disp_id).append('<img src="twinroom.jpg" alt="Restaurant" style="width:50%">' + "<br/>");
                    } else
                    if (JSON.stringify(val).includes('std_t') && (k == 0))
                    {
                        k++;
                        $('#' + disp_id).append('Standard Twin' + "<br/>");
                        $('#' + disp_id).append('<img src="twin-standard.jpg" alt="Restaurant" style="width:50%">' + "<br/>");
                    } else
                    if (JSON.stringify(val).includes('std_d') && (f == 0))
                    {
                        f++;
                        $('#' + disp_id).append('Standard Double' + "<br/>");
                        $('#' + disp_id).append('<img src="double-standard.jpg" alt="Restaurant" style="width:50%">' + "<br/>");
                    }


                })

            }

        },
        error: function () {
            alert("there's a problem");
        }
    });
}
;




function post_total(disp_id) {
    var storedData;
    storedData = getObject('checkAvailability');
    post_price('http://localhost:8081/post_price', storedData, disp_id);
}
;


function post_price(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);



    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array


            var pricefull = JSON.stringify(json);
            var pricequotes = pricefull.split('"');
            var depositfull = Number(pricequotes[3]);
            var deposit = depositfull / 10;
            $('#' + disp_id).append('£' + pricequotes[3] + "</br>");
            $('#' + disp_id).append('The amount to pay now is: ' + '£' + deposit);
        },
        error: function () {
            alert("there's a problem");
        }
    });
}
;

function post_confirmation(disp_id) {
    var storedData;
    storedData = getObject('customer');
    confirmation('http://localhost:8081/insert_customer', storedData, disp_id);
}
;


function confirmation(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);



    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array



            var name = JSON.stringify(json);
            var name2 = name.split('"');

            $('#' + disp_id).append(name2[5] + "</br>");

            post_confirmation_B('confirmation');

        }
    });
}
;

function post_confirmation_B(disp_id) {
    var storedData;
    storedData = getObject('checkAvailability');
    confirmation_B('http://localhost:8081/insert_booking', storedData, disp_id);
}
;

function confirmation_B(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);
	
	 
	 
    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function(rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array
					

					
					var ref = JSON.stringify(json);
					$('#'+disp_id).append('Your Booking has Been Confirmed! </br>');
					
					
					var room = "'"+data.PackageType+'_'+data.RoomType+"'";

					$('#'+disp_id).append('You have booked a: </br>');
					if(JSON.stringify(room).includes('sup_d'))
					{
						
						$('#'+disp_id).append("Superior Double"+ "<br/>");
						$('#'+disp_id).append('<img src="Deluxe-Double.jpg" alt="Restaurant" style="width:50%">'+ "<br/>");
						
					}
					else
					if(JSON.stringify(room).includes('sup_t'))
					{
						
						$('#'+disp_id).append("Superior Twin"+ "<br/>");
						$('#'+disp_id).append('<img src="twinroom.jpg" alt="Restaurant" style="width:50%">'+ "<br/>");
					}
					else
					if(JSON.stringify(room).includes('std_d'))
					{
						
						$('#'+disp_id).append("Standard Double" + "<br/>");
						$('#'+disp_id).append('<img src="double-standard.jpg" alt="Restaurant" style="width:50%">'+ "<br/>");
					}
					else
					if(JSON.stringify(room).includes('std_t'))
					{
						
						$('#'+disp_id).append("Standard Twin" + "<br/>");
						$('#'+disp_id).append('<img src="twin-standard.jpg" alt="Restaurant" style="width:50%">'+ "<br/>");

					}
					$('#'+disp_id).append("From:" + "<br/>");
					$('#'+disp_id).append(data.CID + "<br/>");
					$('#'+disp_id).append("To:" + "<br/>");
					$('#'+disp_id).append(data.COD + "<br/>");
										
										
				   $('#'+disp_id).append('Your Booking Reference Number is: </br>');
				   
				   
                                    var Abref = ref.split(':');
                                                                                             
                                    console.log(Abref);
                                    var bookingref = parseFloat(Abref[1]);
                                  
                                    $('#'+disp_id).append("</br>" + bookingref);
					}
});};

$(document).ready(function () {

    var images = ['back3.jpg', 'quayside.jpg'];
    index = 0;
    $top = $('.header');

    setInterval(function () {
        $top.animate({opacity: 0}, 500, function () {
            $top.css('background-image', 'url(' + images[index] + ')');
            index++;
            $top.animate({opacity: 1}, 500, function () {
                if (index === images.length)
                    index = 0;
            });
        });
    }, 5000);
});

