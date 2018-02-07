var fs = require('fs'),
    http = require("http");
port = '3333';


//Adatok írása a JSON fileba

function writeJSON(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log("Saved");
    });
}


//Url feldolgozása
function processUrl(url) {
    if (url.charAt(0) === "/") url = url.substring(1);
    return url = url.split("/");
};

//Get kérések kezelése
function handleGetRequest(request, result) {

    //URL feldolgozása
    var url = processUrl(request.url);

    var model = url[0],
        id = url[1];

    //Beolvassuk a modellt
    var modelJson = fs.readFileSync(model + '.json', 'utf8');


    //összes adat visszadása
    if (id === "all") {
        writeResult(result, modelJson);
        return;
    }

    //Megkeressük a usert az id alapján
    modelJson = JSON.parse(modelJson);
    var user = {};
    for (var k in modelJson) {
        if (modelJson[k.id] === id)
            user = modelJson[k];
    }

    writeResult(result, JSON.stringify(user));
};

//Új adat beszúrása a modellbe
function handlePutRequest(request, result) {

    var body = '';

    request.on('data', function (data) {
        body += data;
    });


    request.on('end', function () {

        body = JSON.parse(body);

        //URL feldolgozása
        var url = processUrl(request.url),
            model = url[0],
            modelJson = fs.readFileSync(model + '.json', 'utf8');

        //Beszúrjuk az új sort a tábla végébe
        modelJson = JSON.parse(modelJson);
        var lastId = modelJson[modelJson.length - 1].id;
        body.id = parseInt(lastId, 10) + 1;
        modelJson.push(body);

        //Fájl visszaírása a mervelemezre
        writeJSON(model + '.json', JSON.stringify(modelJson));

        writeResult(result, JSON.stringify(body));
    });

};

//Adatok frissítése
function handlePostRequest(request, result) {

    var body = '';

    request.on('data', function (data) {
        body += data;
    });


    request.on('end', function () {

        body = JSON.parse(body);

        //URL feldolgozása
        var url = processUrl(request.url),
            model = url[0],
            modelJson = fs.readFileSync(model + '.json', 'utf8');

        //Beszúrjuk az új sort a tábla végébe
        modelJson = JSON.parse(modelJson);


        for (var k in modelJson) {
            if (modelJson[k.id] === body.id)
                modelJson[k] = body;
        }


        //Fájl visszaírása a mervelemezre
        writeJSON(model + '.json', JSON.stringify(modelJson));

        writeResult(result, JSON.stringify(body));
    });

};


//Adat törlése
function handleDeleteRequest(request, result) {


    //URL feldolgozása
    var url = processUrl(request.url),
        model = url[0],
        id = url[1],
        modelJson = fs.readFileSync(model + '.json', 'utf8');

    //Beszúrjuk az új sort a tábla végébe
    modelJson = JSON.parse(modelJson);

    var index = -1;
    for (var k in modelJson) {
        if (modelJson[k.id] === id)
            index = k;
    }

    //Ha találtunk megfelelő elemet akkor eltávolítjuk a tömbből
    var message = "";
    if (index !== -1) {
        modelJson.splice(index, 1);
        message = "Deleted!";
    } else {
        message = "No element found!";
    }

    //Fájl visszaírása a mervelemezre
    writeJSON(model + '.json', JSON.stringify(modelJson));

    writeResult(result, message);


};

//WriteResult
function writeResult(result, data) {
    result.writeHead(200, {
        'Content-Type': 'text/plain',
        'Acces-Control-Allow-Origin': '*',
        'Acces-Control-Allow-Headers': 'Origin,X-REquested-With,Content-Type,Accept',
        'Acces-Control-Allow-Methods': 'PUT,GET,POST,DELETE,OPTIONS'
    });
    result.end(data);
}


http.createServer(function (request, result) {

    //Különböző típusok lekérése
    switch (request.method.toLowerCase()) {
    case "get":
        handleGetRequest(request, result);
        break;
    case "put":
        handlePutRequest(request, result);
        break;
    case "post":
        handlePostRequest(request, result);
        break;
    case "delete":
        handleDeleteRequest(request, result);
        break;
        writeResult(result, "A metódus" + request.method);
    default:
        break;

    }


}).listen(port);

console.log("Server listen in 3333 port");