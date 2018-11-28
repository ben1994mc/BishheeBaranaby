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
					var room = json.PackageType+'_'+json.RoomType;
                    const {Client} = require('pg');
                    const connectionString = 'postgresql://student:dbpassword@localhost/studentdb';
                    const client = new Client({
                      connectionString: connectionString,
                    });
                    await client.connect(); // create a database connection
// the below is an insertion SQL command template
                    const text =  " SELECT room.r_no, room.r_class"
								+ " FROM hotelbooking.roombooking"
								+ " RIGHT JOIN hotelbooking.room"
								+ " ON room.r_no = roombooking.r_no"
								+ " WHERE r_class = $1"
								+ " EXCEPT"
								+ " (SELECT room.r_no, room.r_class"
								+ " FROM hotelbooking.roombooking JOIN hotelbooking.room"
								+ " ON room.r_no = roombooking.r_no"
								+ " WHERE checkin > CAST($2 AS DATE)"
								+ " AND checkout < CAST($3 AS DATE))"
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
					if(json != null){
					console.log("rooms available");
										}
						else
						{
						console.log("not rooms available")
						}
										});
							
						}
						break;
					default:
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.end('error');
				}
			 }).listen(8081); // listen to port 8081