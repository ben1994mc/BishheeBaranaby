
var bookingRef;

var http = require('http');
// the quick and dirty trick which prevents crashing.
        process.on('uncaughtException', function (err) {
        console.error(err);
                console.log("Node NOT Exiting...");
                });
        http.createServer(function (req, res) {
        console.log(req.url)
                console.log(req.method)

                // Website you wish to allow to connect
                // add this line to address the cross-domain XHR issue.
                res.setHeader('Access-Control-Allow-Origin', '*');                
                switch (req.url) {
        case '/get_form':
                if (req.method == 'POST') {
        console.log("POST");
                var body = '';
                req.on('data', function (data) {
                body += data;
                        console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                console.log("Body: " + body);
                        var json = JSON.parse(body)
                        console.log("Room Type is: " + json.RoomType) // get name
                        console.log("Package Type:  " + json.PackageType)
                        console.log("Check in date:  " + json.CID)
                        console.log("Check out date: " + json.COD)
                        var room = json.PackageType + '_' + json.RoomType;
                        const {Client} = require('pg');
                        const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';
                        const client = new Client({
                        connectionString: connectionString,
                        });
                        await client.connect(); // create a database connection
                        // the below is an insertion SQL command template
                        const text = " SELECT room.r_no, room.r_class"
                        + " FROM hotelbooking.available_rooms"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE room.r_class = $1"
                        + " EXCEPT"
                        + " (SELECT room.r_no, room.r_class"
                        + " FROM hotelbooking.available_rooms JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE (checkin, checkout) OVERLAPS ((CAST($2 AS DATE)), (CAST($3 AS DATE)))"
                        + " ORDER BY r_no);"
                        const values = [room, json.CID, json.COD];
                        console.log(text, values)
                        // here we execute the data insertion command
                        const res1 = await client.query(text, values);
                        // after the insertion, we return the complete table.

                        await client.end();
                        json = res1.rows;
                        var json_str_new = JSON.stringify(json);
                        console.log(json_str_new);
                        res.end(json_str_new);
                });
            }
        break;
                case '/no_rooms':
                if (req.method == 'POST') {
        console.log("POST");
                var body = '';
                req.on('data', function (data) {
                body += data;
                        console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                console.log("Body: " + body);
                        var json = JSON.parse(body)
                        console.log("Room Type is: " + json.RoomType) // get name
                        console.log("Package Type:  " + json.PackageType)
                        console.log("Check in date:  " + json.CID)
                        console.log("Check out date: " + json.COD)
                        var room = json.PackageType + '_' + json.RoomType;
                        const {Client} = require('pg');
                        const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';
                        const client = new Client({
                        connectionString: connectionString,
                        });
                        await client.connect(); // create a database connection
                        // the below is an insertion SQL command template
                        const text = " SELECT DISTINCT room.r_no, room.r_class"
                        + " FROM hotelbooking.available_rooms"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " EXCEPT"
                        + " (SELECT room.r_no, room.r_class"
                        + " FROM hotelbooking.available_rooms JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE (checkin, checkout) OVERLAPS ((CAST($1 AS DATE)), (CAST($2 AS DATE))))";

                        const values = [json.CID, json.COD];
                        console.log(text, values)
                        // here we execute the data insertion command
                        const res1 = await client.query(text, values);
                        // after the insertion, we return the complete table.

                        await client.end();
                        json = res1.rows;
                        var json_str_new = JSON.stringify(json);
                        console.log(json_str_new);
                        res.end(json_str_new);
                });
        }
        break;
                case '/post_price':
                if (req.method == 'POST') {
        console.log("POST");
                var body = '';
                req.on('data', function (data) {
                body += data;
                        console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                console.log("Body: " + body);
                        var json = JSON.parse(body)
                        console.log("Room Type is: " + json.RoomType) // get name
                        console.log("Package Type:  " + json.PackageType)
                        console.log("Check in date:  " + json.CID)
                        console.log("Check out date: " + json.COD)
                        var room = json.PackageType + '_' + json.RoomType;
                        const {Client} = require('pg');
                        const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';
                        const client = new Client({
                        connectionString: connectionString,
                        });
                        await client.connect(); // create a database connection
                        // the below is an insertion SQL command template
                        const text = " SELECT DISTINCT"
                        + " (SELECT price FROM hotelbooking.rates"
                        + " WHERE r_class = $1)"
                        + "*"
                        + "((CAST($2 AS DATE))"
                        + "-"
                        + "(CAST($3 AS DATE)))"
                        + " AS price FROM hotelbooking.rates"

                        const values = [room, json.COD, json.CID];
                        console.log(text, values)
                        // here we execute the data insertion command
                        const res1 = await client.query(text, values);
                        // after the insertion, we return the complete table.

                        await client.end();
                        json = res1.rows;
                        var json_str_new = JSON.stringify(json);
                        console.log(json_str_new);
                        res.end(json_str_new);
                        
                       
                        

                });
        }
        break;
                case '/insert_customer':
                if (req.method == 'POST') {
        console.log("POST");
                var body = '';
                req.on('data', function (data) {
                body += data;
                        console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                
                console.log("Body: " + body);
                        var json = JSON.parse(body)
                        console.log('Email = ', json.Email);
                        console.log('Card No. = ', json.CardNo);
                        console.log('Card Type = ', json.cardType);
                        console.log('Name = ', json.Name);
                        console.log('Expiry Date = ', json.ExpiryA, json.ExpiryB);
                        console.log('Adress = ', json.AddressA, json.AddressB, json.AddressC, json.PostCode);
                        console.log('Notes = ', json.Notes);
                        var expiryDate = json.ExpiryA + '/' + json.ExpiryB;
                        var Address = json.AddressA + ', ' + json.AddressB + ', ' + json.AddressC + ', ' + json.PostCode;
                        const {Client} = require('pg');
                        const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';
                        const client = new Client({
                        connectionString: connectionString,
                        });
                        await client.connect(); // create a database connection
                        // the below is an insertion SQL command template
                                          
                   
                    const text = "INSERT INTO hotelbooking.customer (c_no, c_name, c_email, c_address, c_cardtype, c_cardexp, c_cardno)"
                        + "VALUES((SELECT COALESCE(MAX(c_no),0)+1 FROM hotelbooking.customer), $1, $2, $3, $4, $5, $6);"
  
                        console.log(bookingRef + " new test");                      
  
                        const values = [json.Name, json.Email, Address, json.cardType, expiryDate, json.CardNo];
                        console.log(text, values)
                        // here we execute the data insertion command
                        const res1 = await client.query(text, values);
                            
                        const res2 = await client.query('SELECT * FROM hotelbooking.customer WHERE customer.c_no = (SELECT COALESCE(MAX(c_no),0) FROM hotelbooking.customer)')

                        // after the insertion, we return the complete table.

                        await client.end();
                        json = res2.rows;
                        var json_str_new = JSON.stringify(json);
                        console.log(json_str_new);
                        res.end(json_str_new);
                        
                  
                });
        }
        break;               
        case '/insert_booking':
                if (req.method == 'POST') {
        console.log("POST");
                var body = '';
                req.on('data', function (data) {
                body += data;
                        console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                console.log("Body: " + body);
                        var json = JSON.parse(body)
                        console.log("Room Type is: " + json.RoomType) // get name
                        console.log("Package Type:  " + json.PackageType)
                        console.log("Check in date:  " + json.CID)
                        console.log("Check out date: " + json.COD)
                        var room = json.PackageType + '_' + json.RoomType;
                        const {Client} = require('pg');
                        const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';
                        const client = new Client({
                        connectionString: connectionString,
                        });
                        await client.connect(); // create a database connection
                        // the below is an insertion SQL command template
                                    
                
                        console.log("BOOKING REF TEST");
                        const text = "INSERT INTO hotelbooking.booking (b_ref, c_no, b_cost, b_outstanding, b_notes)"
                        + " VALUES((SELECT COALESCE(MAX(b_ref),0)+1 FROM hotelbooking.booking), "
                        + " (SELECT COALESCE(MAX(c_no),0) FROM hotelbooking.customer),"
                        + " 0,"
                        + " 0, 'no notes')";

                        const res1 = await client.query(text);

                        // after the insertion, we return the complete table.

                        const res3 = await client.query('SELECT roombooking.b_ref FROM hotelbooking.roombooking WHERE roombooking.b_ref = (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking)');
                        await client.end();
                        json = res3.rows;
                        var json_str_new = JSON.stringify(json);
                        console.log(json_str_new);
                        res.end(json_str_new);
                   
                    
                });
        }
        break;
                case '/insert_roombooking':
                if (req.method == 'POST') {
        console.log("POST");
                var body = '';
                req.on('data', function (data) {
                body += data;
                        console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                console.log("Body: " + body);
                        var json = JSON.parse(body)
                        console.log("Room Type is: " + json.RoomType) // get name
                        console.log("Package Type:  " + json.PackageType)
                        console.log("Check in date:  " + json.CID)
                        console.log("Check out date: " + json.COD)
                        var room = json.PackageType + '_' + json.RoomType;
                        const {Client} = require('pg');
                        const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';
                        const client = new Client({
                        connectionString: connectionString,
                        });
                        await client.connect(); // create a database connection
                        // the below is an insertion SQL command template
                                    
                  
                        
                            console.log("TESTING773287424732897");
                         const update = "update hotelbooking.booking set b_cost=(b_cost)+(SELECT DISTINCT(SELECT price FROM hotelbooking.rates WHERE r_class = $1)*"
                                       +" ((CAST($2 AS DATE))-(CAST($3 AS DATE))) FROM hotelbooking.rates) "
                                       +" WHERE b_ref= (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking);"
                        const updateValues = [room, json.COD, json.CID];
                        const restest = await client.query(update, updateValues);   
                        
                         const update2 = "update hotelbooking.booking set b_outstanding=(b_cost)*0.9 "
                                       +" WHERE b_ref= (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking);"
                       
                        const restest2 = await client.query(update2);   
                                           
                          
                        // after the insertion, we return the complete table.
                    
                        
                        const text2 = "INSERT INTO hotelbooking.roombooking (r_no, b_ref, checkin, checkout)"
                        + " VALUES((SELECT room.r_no"
                        + " FROM hotelbooking.available_rooms"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE room.r_class = $1"
                        + " EXCEPT"
                        + " (SELECT room.r_no"
                        + " FROM hotelbooking.available_rooms JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE  (checkin, checkout) OVERLAPS ((CAST($2 AS DATE)), (CAST($3 AS DATE))))"
                        + " ORDER BY r_no LIMIT 1), (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking), CAST($2 AS DATE), CAST($3 AS DATE))"
                        
                        
                        const values2 = [room, json.CID, json.COD];
                        console.log(text2, values2)
                        // here we execute the data insertion command
                        const res2 = await client.query(text2, values2);
                        
                        const res3 = await client.query('SELECT roombooking.b_ref FROM hotelbooking.roombooking WHERE roombooking.b_ref = (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking)');
                        await client.end();
                        json = res3.rows;
                        var json_str_new = JSON.stringify(json);
                        console.log(json_str_new);
                        res.end(json_str_new);      
                });
        }
        break;
             case '/additional_roombooking':
                if (req.method == 'POST') {
        console.log("POST");
                var body = '';
                req.on('data', function (data) {
                body += data;
                        console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                console.log("Body: " + body);
                        var json = JSON.parse(body)
                        console.log("Room Type is: " + json.RoomType) // get name
                        console.log("Package Type:  " + json.PackageType)
                        console.log("Check in date:  " + json.CID)
                        console.log("Check out date: " + json.COD)
                        var room = json.PackageType + '_' + json.RoomType;
                        const {Client} = require('pg');
                        const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';
                        const client = new Client({
                        connectionString: connectionString,
                        });
                        await client.connect(); // create a database connection
                        // the below is an insertion SQL command template
                                    
                  
                        
                            console.log("TESTING773287424732897");
                         const update = "update hotelbooking.booking set b_cost=(b_cost)+(SELECT DISTINCT(SELECT price FROM hotelbooking.rates WHERE r_class = $2)*"
                                       +" ((CAST($3 AS DATE))-(CAST($4 AS DATE))) FROM hotelbooking.rates) "
                                       +" WHERE b_ref= $1;"
                        const updateValues = [bookingRef, room, json.COD, json.CID];
                        const restest = await client.query(update, updateValues);   
                        
                         const update2 = "update hotelbooking.booking set b_outstanding=(b_cost)*0.9 "
                                       +" WHERE b_ref= $1;"
                       const updateValues2 = [bookingRef];
                        const restest2 = await client.query(update2, updateValues2);   
                                           
                          
                        // after the insertion, we return the complete table.
                    
                        
                        const text2 = "INSERT INTO hotelbooking.roombooking (r_no, b_ref, checkin, checkout)"
                        + " VALUES((SELECT room.r_no"
                        + " FROM hotelbooking.available_rooms"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE room.r_class = $1"
                        + " EXCEPT"
                        + " (SELECT room.r_no"
                        + " FROM hotelbooking.available_rooms JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE  (checkin, checkout) OVERLAPS ((CAST($2 AS DATE)), (CAST($3 AS DATE))))"
                        + " ORDER BY r_no LIMIT 1), $4, CAST($2 AS DATE), CAST($3 AS DATE))"
                        
                        
                        const values2 = [room, json.CID, json.COD, bookingRef];
                        console.log(text2, values2)
                        // here we execute the data insertion command
                        const res2 = await client.query(text2, values2);
                        
                        const res3 = await client.query('SELECT roombooking.b_ref FROM hotelbooking.roombooking WHERE roombooking.b_ref = (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking)');
                        await client.end();
                        json = res3.rows;
                        var json_str_new = JSON.stringify(json);
                        console.log(json_str_new);
                        res.end(json_str_new);      
                });
        }
        break;
        case '/booking_details':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.checkref) // get name
                    
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    const text = "SELECT customer.c_name, booking.c_no, roombooking.r_no, booking.b_outstanding, roombooking.checkin, roombooking.checkout"
                                +" FROM hotelbooking.booking, hotelbooking.roombooking, hotelbooking.customer"
                                +" WHERE booking.b_ref = roombooking.b_ref"
                                +" AND customer.c_no = booking.c_no"
                                +" AND booking.b_ref = $1";
                    const values = [json.checkref];

					// here we execute the data insertion command
                    const res1 = await client.query(text, values);

					// after the insertion, we return the complete table.
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
            
            case '/modify_details':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.bookingData) // get name
                    bookingRef = json.bookingData;
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    const text = "SELECT customer.c_name, booking.c_no, roombooking.r_no, booking.b_outstanding, roombooking.checkin, roombooking.checkout"
                                +" FROM hotelbooking.booking, hotelbooking.roombooking, hotelbooking.customer"
                                +" WHERE booking.b_ref = roombooking.b_ref"
                                +" AND customer.c_no = booking.c_no"
                                +" AND booking.b_ref = $1";
                    const values = [json.bookingData];

					// here we execute the data insertion command
                    const res1 = await client.query(text, values);

			
                   
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
               case '/cancel_bookings':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.bookingData) // get name
                    bookingRef = json.bookingData;
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    const text = "DELETE FROM hotelbooking.roombooking * WHERE b_ref = $1";
                    const values = [json.bookingData];

					// here we execute the data insertion command
                    const res1 = await client.query(text, values);

					// after the insertion, we return the complete table.
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
               case '/cancel_booking':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.bookingData) // get name
                    bookingRef = json.bookingData;
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                     const text = "DELETE FROM hotelbooking.booking * WHERE b_ref = $1";
                    const values = [json.bookingData];

					// here we execute the data insertion command
                    const res1 = await client.query(text, values);

					// after the insertion, we return the complete table.
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
        case '/check_in':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.checkIn) // get name
                    
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    
                    const textA = "SET SEARCH_PATH TO hotelbooking";
                    const res1A = await client.query(textA);
                    const text = "UPDATE room SET r_status='O'"
                                +" WHERE r_no="
                                +" (SELECT roombooking.r_no FROM hotelbooking.roombooking"
                                +" WHERE roombooking.b_ref = $1 LIMIT 1)";
                        
                    const values = [json.checkIn];

					// here we execute the data insertion command
                    const res1 = await client.query(text, values);

					// after the insertion, we return the complete table.
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
            case '/add_charges':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.checkOut) // get name
                    console.log("Charges to be added = " + json.price)
                    console.log("Notes = " + json.chargeNotes)
                    var notes = ": " + json.chargeNotes;
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    
                    const textA = "SET SEARCH_PATH TO hotelbooking";
                    const res1A = await client.query(textA);
                    
                    const textB = "UPDATE booking set b_cost=(SELECT b_cost FROM BOOKING WHERE b_ref= $1)+$2"
                                +"WHERE b_ref=$1";
                        
                    const valuesB = [json.checkOut, json.price];
                    
                    const res1B = await client.query(textB, valuesB);
                    
                    const textC = "UPDATE booking set b_outstanding =(SELECT b_outstanding FROM BOOKING WHERE b_ref= $1)+$2"
                                +"WHERE b_ref=$1";
                        
                    const valuesC = [json.checkOut, json.price];
                     
                    const res1C = await client.query(textC, valuesC);
                    
                    const textD = "UPDATE booking set b_notes=$1"
                                +"WHERE b_ref=$2";
                        
                    const valuesD = [notes, json.checkOut];
                     
                    const res1D = await client.query(textD, valuesD);
					// here we execute the data insertion command      

					// after the insertion, we return the complete table.
                      const textE = "SELECT b_outstanding FROM booking WHERE b_ref = $1"
                        
                    const valuesE = [json.checkOut];
                     
                    const res1E = await client.query(textE, valuesE);                   
                                        
                    json = res1E.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
        case '/pay_bill':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.checkOut) // get name
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    
                   const text = "UPDATE hotelbooking.booking set b_outstanding=0"
                                +"WHERE b_ref=$1";
                        
                    const values = [json.checkOut];
                    
                    const res1 = await client.query(text, values);                  
                                        
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
            case '/room_status':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    console.log("booking ref = " + json.roomNo) 
                    console.log("booking ref = " + json.Status)// get name
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    
                   const textA = "SET SEARCH_PATH TO hotelbooking";
                   const res1A = await client.query(textA); 
                   const text = "UPDATE room SET r_status=$1"
                                +" WHERE r_no=$2";
                                
                        
                    const values = [json.Status, json.roomNo];
                    
                    const res1 = await client.query(text, values);                  
                                        
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;
        case '/show_tasks':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    
                   const text = "SELECT room.r_no FROM hotelbooking.room"
                                +" WHERE room.r_status = 'C'";
                   const res1 = await client.query(text); 
                                                                                         
                                        
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;            
        case '/add_room':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    const {Client} = require('pg');
                     console.log("Room Type is: " + json.RoomType) // get name
                        console.log("Package Type:  " + json.PackageType)
                        console.log("Check in date:  " + json.CID)
                        console.log("Check out date: " + json.COD)
                        var room = json.PackageType + '_' + json.RoomType;
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    
                  
                      
                    const text = " SELECT room.r_no, room.r_class"
                        + " FROM hotelbooking.available_rooms"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE room.r_class = $1"
                        + " EXCEPT"
                        + " (SELECT room.r_no, room.r_class"
                        + " FROM hotelbooking.available_rooms JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE (checkin, checkout) OVERLAPS ((CAST($2 AS DATE)), (CAST($3 AS DATE)))"
                        + " ORDER BY r_no);"
                        const values = [room, json.CID, json.COD];
                        console.log(text, values)
                       const res1 = await client.query(text, values); 
                    
                    if(res1.rows != 0)
                    {
                    const text2 = "INSERT INTO hotelbooking.availability (r_no, r_class, checkin, checkout)"
                        + " VALUES((SELECT room.r_no"
                        + " FROM hotelbooking.available_rooms"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE room.r_class = $1"
                        + " EXCEPT"
                        + " (SELECT room.r_no"
                        + " FROM hotelbooking.available_rooms JOIN hotelbooking.room"
                        + " ON room.r_no = available_rooms.r_no"
                        + " WHERE  (checkin, checkout) OVERLAPS ((CAST($2 AS DATE)), (CAST($3 AS DATE))))"
                        + " ORDER BY r_no LIMIT 1), $1, CAST($2 AS DATE), CAST($3 AS DATE))"

                        const values2 = [room, json.CID, json.COD];
                        console.log(text2, values2)
                         const res2 = await client.query(text2, values2);
                    }
                        // here we execute the data insertion command
                                                                                
                                        
                    json = res1.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break; 
        case '/delete_all':
            if (req.method == 'POST') {
                console.log("POST");
                var body = '';
                req.on('data', function (data) {
                    body += data;
                    console.log("Partial body: " + body);
                });
                req.on('end', async function () {
                    console.log("Body: " + body);
                    var json = JSON.parse(body)
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://groupcz:groupcz@cmp-18stunode.cmp.uea.ac.uk/groupcz';

                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
					
					// the below is an insertion SQL command template
                    
                   const textA = "SET SEARCH_PATH TO hotelbooking";
                   const resA = await client.query(textA);
                    
                    const text = "DELETE FROM hotelbooking.availability *";
                   const res1 = await client.query(text); 
                                                                                         
                    const text2 = "SELECT * FROM AVAILABILITY";
                   const res2 = await client.query(text2);                     
                    json = res2.rows;
                    await client.end();
 
                    var json_str_new = JSON.stringify(json);
                    console.log(json_str_new);
                    res.end(json_str_new);
                });
                
            }
            break;            
                default:
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end('error');
        }
        }).listen(8081); // listen to port 8081

        var http = require('http'); //latest version
