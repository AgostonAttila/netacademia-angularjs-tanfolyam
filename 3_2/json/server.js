var fs = requre('fs'),
    http = require("http");


//Adatok írása a JSON fileba

function writeJSON() {
    fs.writeFile('products.json', data, function (err){
        if (err) throw err; 
        console.log("Saved");
    });
}


http.createser(function (request, res) {


    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();

        });

        request.on('end', function () {
            writeJSON();
        });

    }

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Acces-Control-Allow-Origin': '*',
        'Acces-Control-Allow-Headers': 'Origin,X-REquested-With,Content-Type,Accept'
    });
    res.end('Kapott adatok: ');
}).listen("3333");

console.log("Server listen in 3333 port");