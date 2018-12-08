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
                        + " FROM hotelbooking.roombooking"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = roombooking.r_no"
                        + " WHERE r_class = $1"
                        + " EXCEPT"
                        + " (SELECT room.r_no, room.r_class"
                        + " FROM hotelbooking.roombooking JOIN hotelbooking.room"
                        + " ON room.r_no = roombooking.r_no"
                        + " WHERE checkin >= CAST($2 AS DATE)"
                        + " AND checkout <= CAST($3 AS DATE))"
                        + " ORDER BY r_no;"
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
                        const text = " SELECT DISTINCT room.r_class"
                        + " FROM hotelbooking.roombooking"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = roombooking.r_no"
                        + " EXCEPT"
                        + " (SELECT room.r_class"
                        + " FROM hotelbooking.roombooking JOIN hotelbooking.room"
                        + " ON room.r_no = roombooking.r_no"
                        + " WHERE checkin >= CAST($1 AS DATE)"
                        + " AND checkout <= CAST($2 AS DATE));"

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

                        const text = "INSERT INTO hotelbooking.booking (b_ref, c_no, b_cost, b_outstanding, b_notes)"
                        + " VALUES((SELECT COALESCE(MAX(b_ref),0)+1 FROM hotelbooking.booking),"
                        + " (SELECT COALESCE(MAX(c_no),0) FROM hotelbooking.customer),"
                        + " (SELECT DISTINCT(SELECT price FROM hotelbooking.rates WHERE r_class = $1)*"
                        + " ((CAST($2 AS DATE))-(CAST($3 AS DATE))) FROM hotelbooking.rates),"
                        + " ((SELECT DISTINCT(SELECT price FROM hotelbooking.rates WHERE r_class = $1)*"
                        + " ((CAST($2 AS DATE))-(CAST($3 AS DATE))) FROM hotelbooking.rates)*0.9), 'no notes')"
                        const values = [room, json.COD, json.CID];
                        const res1 = await client.query(text, values);
                        const text2 = "INSERT INTO hotelbooking.roombooking (r_no, b_ref, checkin, checkout)"
                        + " VALUES((SELECT DISTINCT (SELECT (SELECT room.r_no FROM hotelbooking.room ORDER BY RANDOM() LIMIT 1)"
                        + " FROM hotelbooking.roombooking"
                        + " RIGHT JOIN hotelbooking.room"
                        + " ON room.r_no = roombooking.r_no"
                        + " WHERE r_class = $1"
                        + " EXCEPT"
                        + " (SELECT room.r_no"
                        + " FROM hotelbooking.roombooking JOIN hotelbooking.room"
                        + " ON room.r_no = roombooking.r_no"
                        + " WHERE checkin >= CAST($2 AS DATE)"
                        + " AND checkout <= CAST($3 AS DATE))"
                        + " ORDER BY r_no) FROM hotelbooking.room), (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking), CAST($2 AS DATE), CAST($3 AS DATE))"

                        const values2 = [room, json.CID, json.COD];
                        console.log(text2, values2)
                        // here we execute the data insertion command
                        const res2 = await client.query(text2, values2);
                        // after the insertion, we return the complete table.

                        const res3 = await client.query('SELECT roombooking.b_ref FROM hotelbooking.roombooking WHERE roombooking.b_ref = (SELECT COALESCE(MAX(b_ref),0) FROM hotelbooking.booking)')

                        await client.end();
                        json = res3.rows;
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

        var http = require('http');

