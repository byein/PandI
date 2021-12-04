var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multer = require('multer');


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'byein',
	password : 'byein',
	database : 'pandi'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

var upload = multer({
  storage : multer.diskStorage({
          destination : function(request, file, cb){
                  cb(null, './public/uploads/');
          },
          filename : function(request, file, cb){
                  cb(null, file.originalname);
          }
  })
});

app.use(express.static('public'));
app.use(express.static('router'));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine','ejs');


// function restrict(req, res, next) {
//   if (req.session.loggedin) {
//     next();
//   } else {
//     req.session.error = 'Access denied!';
//     res.sendFile(path.join(__dirname + '/views/index.html'));
//   }
// }

app.get('/', function(request, response){
  console.log('메인페이지 작동');
  console.log(request.session);
  response.sendFile(path.join(__dirname + '/views/index.html'));

  // db.query(`SELECT nIdx, nImg, nEndDate FROM notice WHERE nEndDate >= DATE(NOW())`, function(error, banner_imgs){
  //         db.query(`SELECT * FROM product WHERE pDelete=0 ORDER BY pDate DESC limit 5;`, function(error, new_products){
  //                 db.query('SELECT sum(od.product_quantity), od.product_id, p.pName, p.pPrice, p.pImg FROM product p, `order` o, order_detail od WHERE p.pIdx=od.product_id and o.oIdx=od.order_id and o.oStatus=3 GROUP BY od.product_id ORDER BY sum(od.product_quantity) DESC limit 5;', function(error2, top_products){
  //                 if(request.session.is_logined == true){
  //                         response.render('mainPage', {
  //                                 is_logined : request.session.is_logined,
  //                                 name : request.session.name,
  //                                 new_products : new_products,
  //                                 banner_imgs: banner_imgs,
  //                                 top_products : top_products
  //                         });
  //                 }else{
  //                         response.render('mainPage', {
  //                                 is_logined : false,
  //                                 new_products : new_products,
  //                                 banner_imgs: banner_imgs,
  //                                 top_products : top_products
  //                         });
  //                 }
  //                 });
  //         });
  // });
});

// app.use('/', function(request, response, next) {
// 	if ( request.session.loggedin == true || request.url == "/login" || request.url == "/signUp" ) {
//     next();
// 	}
// 	else {
//     response.sendFile(path.join(__dirname + '/views/login.html'));
// 	}
// });
app.get('/login', function(request, response){
  response.render('login');
});
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/index');
				response.end();
			} else {
				//response.send('Incorrect Username and/or Password!');
				response.sendFile(path.join(__dirname + '/views/login.html'));
			}			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/signUp.html'));
});

app.post('/register', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var password2 = request.body.password2;
	var email = request.body.email;
	console.log(username, password, email);
	if (username && password && email) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ? AND email = ?', [username, password, email], function(error, results, fields) {
			if (error) throw error;
			if (results.length <= 0) {
        connection.query('INSERT INTO user (username, password, email) VALUES(?,?,?)', [username, password, email],
            function (error, data) {
                if (error)
                  console.log(error);
                else
                  console.log(data);
        });
			  response.send(username + ' Registered Successfully!<br><a href="/index">Home</a>');
			} else {
				response.send(username + ' Already exists!<br><a href="/index">Home</a>');
			}			
			response.end();
		});
	} else {
		response.send('Please enter User Information!');
		response.end();
	}
});

app.get('/logout', function(request, response) {
  request.session.loggedin = false;
	response.send('<center><H1>Logged Out.</H1><H1><a href="/">Goto Home</a></H1></center>');
	response.end();
});

// app.get('/index', restrict, function(request, response) {
// 	if (request.session.loggedin) {
// 		response.sendFile(path.join(__dirname + '/views/index.html'));
// 	} else {
// 		response.send('Please login to view this page!');
// 		response.end();
// 	}
// });

app.get('/test2', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/my/test2.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});



// Board
app.get('/boardtips', function (request, response) { 
    // ������ �н��ϴ�.
    fs.readFile(__dirname + '/board/crudTipsBoard.html', 'utf8', function (error, data) {
        // �����ͺ��̽� ������ �����մϴ�.
        connection.query('SELECT * FROM products', function (error, results) {
            // �����մϴ�.
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});
app.get('/delete/:id', function (request, response) { 
    // �����ͺ��̽� ������ �����մϴ�.
    connection.query('DELETE FROM products WHERE id=?', [request.param('id')], function () {
        // �����մϴ�.
        response.redirect('/boardtips');
    });
});
app.get('/insert', function (request, response) {	
    // ������ �н��ϴ�.
    fs.readFile(__dirname + '/board/crudTipsBoard.html', 'utf8', function (error, data) {
        // �����մϴ�.
        response.send(data);
    });
});
app.post('/insert', function (request, response) {
    // ������ �����մϴ�.
    var body = request.body;

    // �����ͺ��̽� ������ �����մϴ�.
    connection.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [
        body.name, body.modelnumber, body.series
    ], function () {
        // �����մϴ�.
        response.redirect('/board');
    });
});
app.get('/edit/:id', function (request, response) {
	    // ������ �н��ϴ�.
    fs.readFile(__dirname + '/board/crudTipsBoardd.html', 'utf8', function (error, data) {
        // �����ͺ��̽� ������ �����մϴ�.
        connection.query('SELECT * FROM products WHERE id = ?', [
            request.param('id')
        ], function (error, result) {
            // �����մϴ�.
            response.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});
app.post('/edit/:id', function (request, response) {
	    // ������ �����մϴ�.
    var body = request.body

    // �����ͺ��̽� ������ �����մϴ�.
    connection.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?', [
        body.name, body.modelnumber, body.series, request.param('id')
    ], function () {
        // �����մϴ�.
        response.redirect('/board');
    });
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});