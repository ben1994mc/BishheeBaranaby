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
        $('#' + disp_id).append("Premium Double" + "<br>");
        $('#' + disp_id).append("<img src='premiumdoublesmall.jpg' alt='premiumdoublesmall'>");

    } else
    if (JSON.stringify(room).includes('sup_t'))
    {
        console.log('success2');
        $('#' + disp_id).append("Premium Twin" + "<br>");
        $('#' + disp_id).append("<img src='premiumtwinsmall.jpg' alt='premiumtwinsmall'>");
    } else
    if (JSON.stringify(room).includes('std_d'))
    {
        console.log('success3');
        $('#' + disp_id).append("Standard Double" + "<br>");
        $('#' + disp_id).append("<img src='standarddoublesmall.jpg' alt='standarddoublesmall'>");
    } else
    if (JSON.stringify(room).includes('std_t'))
    {
        console.log('success4');
        $('#' + disp_id).append("Standard Twin" + "<br>");
        $('#' + disp_id).append("<img src='standardtwinsmall.jpg' alt='standardtwinsmall'>");
    }
    $('#' + disp_id).append("<br>" + "From:" + "<br>");
    $('#' + disp_id).append("<br>" + data.CID + "<br/>");
    $('#' + disp_id).append("<br>" + "To:" + "<br/>");
    $('#' + disp_id).append("<br>" + data.COD + "<br/>");
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
    var booking_page = "<table id='proceedtobooking' class='proceedtobooking'><tr><td><h3>Rooms Available:</h3></td><td><h3><div class='container'><input type='button' value='Proceed to Booking' class='btn' onclick='hidemain(); showbooking(); postSummary(" + booking + "); post_total(" + price + ")'></div></h3></td></tr></table>";


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
                $('#' + disp_id).append("<table id='sorryno' class='sorryno'><tr><td><h3>Sorry, no rooms of that type are available for those dates</h3></tr>\n\
                                        <tr><td><h3>However, room(s) of the following type(s) are available:</h3></td></tr></table>");


                var i = 0;
                var j = 0;
                var k = 0;
                var f = 0;

                $.each(json, function (i, val) {
                    console.log(val);


                    if (JSON.stringify(val).includes('sup_d') && (i == 0))
                    {
                        i++;
                        $('#' + disp_id).append("<table id='supdtable' class='supdtable'><tr><td><h3>Premium Double:</h3></td></tr><tr><td><img src='premiumdouble.jpg' alt='premiumdouble'></td></tr></table>");

                    } else
                    if (JSON.stringify(val).includes('sup_t') && (j == 0))
                    {
                        j++;
                        $('#' + disp_id).append("<table id='supttable' class='supttable'><tr><td><h3>Premium Twin:</h3></td></tr><tr><td><img src='premiumtwin.jpg' alt='premiumtwin'></td></tr></table>");

                    } else
                    if (JSON.stringify(val).includes('std_t') && (k == 0))
                    {
                        k++;
                        $('#' + disp_id).append("<table id='stdttable' class='supttable'><tr><td><h3>Standard Twin:</h3></td></tr><tr><td><img src='standardtwin.jpg' alt='premiumtwin'></td></tr></table>");

                    } else
                    if (JSON.stringify(val).includes('std_d') && (f == 0))
                    {
                        f++;
                        $('#' + disp_id).append("<table id='stddtable' class='supttable'><tr><td><h3>Standard Double:</h3></td></tr><tr><td><img src='standarddouble.jpg' alt='standarddouble'></td></tr></table>");

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
            var depositCurrency = deposit.toFixed(2);
            $('#' + disp_id).append('£' + pricequotes[3] + "</br>");
            $('#' + disp_id).append('The amount to pay now is: ' + '£' + depositCurrency);
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
    var printButton = "<input type='button' value='Print Booking Confirmation' class='btn' onClick='window.print()'>";


    $.ajax({
        url: path,
        type: "POST",
        data: json,
        success: function (rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array



            var name = JSON.stringify(json);
            var name2 = name.split('"');
            $('#' + disp_id).append(printButton);
            $('#' + disp_id).append("<br>" + name2[5] + "<br>");
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
        success: function (rt) {
            console.log(rt); // returned data
            var json = JSON.parse(rt); // the returned data will be an array



            var ref = JSON.stringify(json);
            $('#' + disp_id).append('Your Booking has Been Confirmed! <br>');


            var room = "'" + data.PackageType + '_' + data.RoomType + "'";

            $('#' + disp_id).append('You have booked a: <br>');
            if (JSON.stringify(room).includes('sup_d'))
            {

                $('#' + disp_id).append("Premium Double" + "<br>");
                $('#' + disp_id).append("<img src='premiumdoublesmall.jpg' alt='premiumdoublesmall'>");

            } else
            if (JSON.stringify(room).includes('sup_t'))
            {

                $('#' + disp_id).append("Premium Twin" + "<br>");
                $('#' + disp_id).append("<img src='premiumtwinsmall.jpg' alt='premiumtwinsmall'>");
            } else
            if (JSON.stringify(room).includes('std_d'))
            {

                $('#' + disp_id).append("Standard Double" + "<br>");
                $('#' + disp_id).append("<img src='standarddoublesmall.jpg' alt='standarddoublesmall'>");
            } else
            if (JSON.stringify(room).includes('std_t'))
            {

                $('#' + disp_id).append("Standard Twin" + "<br>");
                $('#' + disp_id).append("<img src='standardtwinsmall.jpg' alt='standardtwinsmall'>");

            }
            $('#' + disp_id).append("<br>" + "From:" + "<br>");
            $('#' + disp_id).append("<br>" + data.CID + "<br/>");
            $('#' + disp_id).append("<br>" + "To:" + "<br/>");
            $('#' + disp_id).append("<br>" + data.COD + "<br/>");


            $('#' + disp_id).append('Your Booking Reference Number is: <br>');


            var Abref = ref.split(':');

            console.log(Abref);
            var bookingref = parseFloat(Abref[1]);

            $('#' + disp_id).append("<br>" + bookingref);
        }
    });
}
;

$(document).ready(function () {

    var images = ['back3.jpg', 'quayside.jpg', 'norwichsky.jpg'];
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


(function ($)
{
    $('#clicker1').click(function () {
        $(this).toggleClass('active');
    });
})(jQuery);

$(document).ready(function ()
{
    $("#cf_onclick").click(function () {
        $("#cf2 img.top").toggleClass("transparent");
    });

    $(document).ready(function ()
    {
        $("#cf7_controls").on('click', 'span', function ()
        {
            $("#cf7 img").removeClass("opaque");
            var newImage = $(this).index();
            $("#cf7 img").eq(newImage).addClass("opaque");
            $("#cf7_controls span").removeClass("selected");
            $(this).addClass("selected");
        });
    });
});
