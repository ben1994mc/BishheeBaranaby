function saveRef(){

	var saveRef = {}; 							// showing elements added dynamically
	saveRef.checkref = $('#cib_ref').val();
        
        
	
    console.log('Booking ref =', saveRef.checkref);
	
	
	setObject('checkIndata', saveRef);				// store the data locally
	var storedData = getObject('checkIndata');		// get it back again...
	console.log('Booking ref =', storedData.checkref);
        
       
};

function saveRef2(){
       
    var saveRef2 = {};
        saveRef2.checkIn = $('#ci_confirm').val();
        console.log('Checkin ref =', saveRef2.checkIn);

        setObject('checkInconfirm', saveRef2);				// store the data locally
	var storedData = getObject('checkInconfirm');
        console.log('Checkin ref =', storedData.checkIn);	
}


function savePayment() {

    var customerData = {};
    customerData.cardType = $('input[name=cardtype]:checked').val();
    customerData.Name = $('#nameoncard').val();
    customerData.ExpiryA = $('#expirydateA').val();
    customerData.ExpiryB = $('#expirydateB').val();
    customerData.CardNo = $('#cardno').val();
    customerData.AddressA = $('#firstline').val();
    customerData.AddressB = $('#secondline').val();
    customerData.AddressC = $('#thirdline').val();
    customerData.PostCode = $('#postcode').val();

    console.log('Card Type = ', customerData.cardType);
    console.log('Name = ', customerData.Name);
    console.log('Expiry Date = ', customerData.ExpiryA, customerData.ExpiryB);
    console.log('Adress = ', customerData.AddressA, customerData.AddressB, customerData.AddressC, customerData.PostCode);
    console.log('Card No. = ', customerData.CardNo);

    setObject('customer', customerData);
    var storedData2 = getObject('customer');

    console.log('Card Type = ', storedData2.cardType);
    console.log('Name = ', storedData2.Name);
    console.log('Expiry Date = ', storedData2.ExpiryA, storedData2.ExpiryB);
    console.log('Adress = ', storedData2.AddressA, storedData2.AddressB, storedData2.AddressC, storedData2.PostCode);
    console.log(localStorage.length);
    console.log('Card No. = ', storedData2.CardNo);
}

function roomStatus(){

	var roomStatus = {}; 							// showing elements added dynamically
	roomStatus.roomNo = $('#roomno').val();
        roomStatus.Status = $('input[name=roomstatus]:checked').val();
	console.log('Room no. =', roomStatus.roomNo);
	console.log('Room Status =', roomStatus.Status);
	
	setObject('roomStatus', roomStatus);				// store the data locally
	var storedData3 = getObject('roomStatus');		// get it back again...
	console.log('roomNo =', storedData3.roomNo);
        console.log('roomNo =', storedData3.Status);// check...
};


function saveSupplements(){

	var supplements = {}; 							// showing elements added dynamically
	supplements.checkOut = $('#cob_ref').val();
        supplements.price = $('#supplementarycharges').val();
        supplements.chargeNotes = $('#chargeNotes').val();
	
        console.log('Ref no. =', supplements.checkOut);
	console.log('Total extras =', supplements.price);
	console.log('Notes =', supplements.chargeNotes);
	setObject('supplements', supplements);				// store the data locally
	var storedData4 = getObject('supplements');		// get it back again...
	console.log('Ref no. =', storedData4.checkOut);
	console.log('Total extras =', storedData4.price);
        console.log('Notes =', storedData4.chargeNotes);// check...
};


function get_Booking(disp_id) {
    var storedData;
    storedData = getObject('checkIndata');
    booking_Details('http://localhost:8081/booking_details', storedData, disp_id);
}
;

function booking_Details(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);

    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
               var json = JSON.parse(rt);
            $.each(json, function (i, val) {
            // the returned data will be an array
            var test = JSON.stringify(val)
            var details = test.split(':');
            var details2 = test.split('"');
            var cno = parseFloat(details[2])  
            var rno = parseFloat(details[3])
            var balance = parseFloat(details2[11])
            var chi = details2[15].split('T');
            var cho = details2[19].split('T');
            console.log(chi);
            //var dates = detail.split('"');
          
            console.log(details);
             console.log(details2);
            console.log(cno);
            $('#' + disp_id).append("</br> Customer Name:   "+details2[3]);
            $('#' + disp_id).append("</br> Customer Number: "+cno);
            $('#' + disp_id).append("</br> Room Number:   "+rno);
             $('#' + disp_id).append("</br> Balance Outstanding:   £"+balance);
             $('#' + disp_id).append("</br> Checkin Date:   "+chi[0]);
             $('#' + disp_id).append("</br> Checkout Date:   "+cho[0]);
              })
        },
        error: function () {
            alert("there's a problem");
        }
    });
}

function checkIn(disp_id){
    var storedData;
    storedData = getObject('checkInconfirm');
    check_inguest('http://localhost:8081/check_in', storedData, disp_id);
};

function check_inguest(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);

    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
               var json = JSON.parse(rt);
               
               $('#' + disp_id).append("</br>Checkin Complete");
            
        },
        error: function () {
            alert("there's a problem");
        }
    });
}
function supplements(disp_id){
    var storedData;
    storedData = getObject('supplements');
    add_supplements('http://localhost:8081/add_charges', storedData, disp_id);
};

function add_supplements(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);

    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
               var json = JSON.parse(rt);
               
               var bal = JSON.stringify(json);
               
               var bal2 = bal.split('"');
               console.log(bal2);
               var bal3 = bal2[3];
               
               $('#' + disp_id).append("</br>Charges Applied");
               $('#' + disp_id).append("</br>Outstanding balance is: ");
               $('#' + disp_id).append('£'+bal3);
               
            
        },
        error: function () {
            alert("there's a problem");
        }
    });
}
function payment(disp_id){
    var storedData;
    storedData = getObject('supplements');
    pay('http://localhost:8081/pay_bill', storedData, disp_id);
};

function pay(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);

    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
               var json = JSON.parse(rt);
                            
               
               $('#' + disp_id).append("</br>Payment Successful");              
            
        },
        error: function () {
            alert("there's a problem");
        }
    });
}
function room_Status(disp_id){
    var storedData;
    storedData = getObject('roomStatus');
    Status('http://localhost:8081/room_status', storedData, disp_id);
};

function Status(path, data, disp_id) {

    // convert the parameters to a JSON data string
    var json = JSON.stringify(data);

    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
               var json = JSON.parse(rt);
                            
               
               $('#' + disp_id).append("</br>Status Changed");              
            
        },
        error: function () {
            alert("there's a problem");
        }
    });
}