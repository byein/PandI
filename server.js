var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multer = require('multer');
var {
    v4 : UUID
} = require('uuid');

var connection = mysql.createConnection(
    {host: 'localhost', user: 'byein', password: 'byein', database: 'pandi', dateStrings: "date"}
);

var app = express();
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

var upload = multer({
    storage: multer.diskStorage({
        destination: function (request, file, cb) {
            cb(null, './public/uploads/');
        },
        filename: function (request, file, cb) {
            cb(null, file.originalname);
        }
    })
});

app.use(express.static('public'));
app.use(express.static('router'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.set('views', __dirname + '/views'); app.set('view engine','ejs');
// function restrict(req, res, next) {   if (req.session.loggedin) {     next();
// } else {     req.session.error = 'Access denied!';
// res.sendFile(path.join(__dirname + '/views/index.html'));   } } home
app.get('/', function (request, response) {
    console.log('메인페이지 작동');
    console.log(request.session);
    var uname = request.session.username;
    //response.sendFile(path.join(__dirname + '/views/index.html'));
    fs.readFile(__dirname + '/views/index.html', 'utf8', function (error, data) {
        if (request.session.loggedin) {
            response.send(ejs.render(data, {un: uname}));
        } else {
            response.send(ejs.render(data, {un: null}));
        }
    });
    // var username = request.body.username; db.query(`SELECT nIdx, nImg, nEndDate
    // FROM notice WHERE nEndDate >= DATE(NOW())`, function(error, banner_imgs){
    // db.query(`SELECT * FROM product WHERE pDelete=0 ORDER BY pDate DESC limit
    // 5;`, function(error, new_products){                 db.query('SELECT
    // sum(od.product_quantity), od.product_id, p.pName, p.pPrice, p.pImg FROM
    // product p, `order` o, order_detail od WHERE p.pIdx=od.product_id and
    // o.oIdx=od.order_id and o.oStatus=3 GROUP BY od.product_id ORDER BY
    // sum(od.product_quantity) DESC limit 5;', function(error2, top_products){
    // if(request.session.is_logined == true){
    // response.render('mainPage', {                                 is_logined :
    // request.session.is_logined,                                 name :
    // request.session.name,                                 new_products :
    // new_products,                                 banner_imgs: banner_imgs,
    // top_products : top_products                         });
    // }else{                         response.render('mainPage', {
    // is_logined : false,                                 new_products :
    // new_products,                                 banner_imgs: banner_imgs,
    // top_products : top_products                         });                 }
    // });         }); });
});

// app.use('/', function(request, response, next) { 	if (
// request.session.loggedin == true || request.url == "/login" || request.url ==
// "/signUp" ) {     next(); 	} 	else {
// response.sendFile(path.join(__dirname + '/views/login.html')); 	} }); login
app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/login', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [
            username, password
        ], function (error, results, fields) {
            if (error) 
                throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/');
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

//register
app.get('/register', function (request, response) {
    response.sendFile(path.join(__dirname + '/views/signUp.html'));
});

app.post('/register', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var password2 = request.body.password2;
    var email = request.body.email;
    console.log(username, password, email);
    if (username && password && email) {
        connection.query(
            'SELECT * FROM user WHERE username = ? AND password = ? AND email = ?',
            [
                username, password, email
            ],
            function (error, results, fields) {
                if (error) 
                    throw error;
                if (results.length <= 0) {
                    connection.query(
                        'INSERT INTO user (username, password, email) VALUES(?,?,?)',
                        [
                            username, password, email
                        ],
                        function (error, data) {
                            if (error) 
                                console.log(error);
                            else 
                                console.log(data);
                            }
                        );
                    response.send(
                        username + ' Registered Successfully!<br><a href="/">Home</a>'
                    );
                } else {
                    response.send(
                        username + ' Already exists!<br><a href="/">Home</a>'
                    );
                }
                response.end();
            }
        );
    } else {
        response.send('Please enter User Information!');
        response.end();
    }
});

//logout
app.get('/logout', function (request, response) {
    request.session.loggedin = false;
    response.send(
        '<center><H1>Logged Out.</H1><H1><a href="/">Goto Home</a></H1></center>'
    );
    response.end();
});

//findHospital
app.get('/findHospital', function (request, response) {
    //response.sendFile(path.join(__dirname + '/views/findHospital.html'));
    var uname = request.session.username;
    fs.readFile(
        __dirname + '/views/findHospital.html',
        'utf8',
        function (error, data) {
            if (request.session.loggedin) {
                response.send(ejs.render(data, {un: uname}));
            } else {
                response.send(ejs.render(data, {un: null}));
            }
        }
    );
    //response.sendFile(path.join(__dirname + '/views/findHospital.html'));

});

//findPetPlace
app.get('/findPetPlace', function (request, response) {
    var uname = request.session.username;
    fs.readFile(
        __dirname + '/views/findPetPlace.html',
        'utf8',
        function (error, data) {
            if (request.session.loggedin) {
                response.send(ejs.render(data, {un: uname}));
            } else {
                response.send(ejs.render(data, {un: null}));
            }
        }
    );
    //response.sendFile(path.join(__dirname + '/views/findPetPlace.html'));
});

//tipsBoard
app.get('/crudTipsBoard', function (request, response) {
    var page = request.query.page;
    var sort = request.query.sort;
    if (!request.query.sort) {
        sort = "mammal";
    }
    if (!request.query.page || request.query.page <= 0) {
        page = 1;
    }
    fs.readFile(
        __dirname + '/views/crudTipsBoard.html',
        'utf8',
        function (error, data) {
            if (error) 
                console.log(error);
            if (sort) {
                condition = " WHERE sort='" + sort + "'";
            } else {
                condition = " WHERE sort='mammal'";
            }
            connection.query(
                'SELECT * FROM tips ' + condition + ' ORDER BY date desc limit ?, 5',
                [5 * (page - 1)],
                function (error, results) {
                    connection.query(
                        'SELECT COUNT(*) as count FROM tips' + condition,
                        function (error, result) {
                            if (error) 
                                console.log(error);
                            response.send(ejs.render(data, {
                                un: request.session.username,
                                tips: results,
                                total: result[0].count,
                                sort: sort,
                                page: page
                            }));
                        }
                    );

                }
            );
        }
    );
});

app.get('/crudTipsBoard/detail/:id', function (request, response) {
    fs.readFile(
        __dirname + '/views/detailTipsBoard.html',
        'utf8',
        function (error, data) {
            connection.query(
                'SELECT * FROM tips WHERE id=?',
                [request.param('id')],
                function (error, re) {
                    connection.query('UPDATE tips set view=? WHERE id=?', [
                        re[0].view + 1,
                        request.param('id')
                    ], function (error, res) {
                        connection.query(
                            'SELECT * FROM tips WHERE id=?',
                            [request.param('id')],
                            function (error, result) {
                                response.send(ejs.render(data, {
                                    data: result[0],
                                    un: request.session.username
                                }));
                            }
                        );
                    });
                }
            );
        }
    );
});

app.get('/deleteTips/:id', function (request, response) {
    connection.query(
        'DELETE FROM tips WHERE id=?',
        [request.param('id')],
        function () {
            response.redirect('/crudTipsBoard');
        }
    );
});

app.get('/insertTips', function (request, response) {
    // ������ �н��ϴ�.
    fs.readFile(
        __dirname + '/views/addTipsBoard.html',
        'utf8',
        function (error, data) {
            // �����մϴ�.
            response.send(ejs.render(data, {un: request.session.username}));
        }
    );
});
app.post('/insertTips', function (request, response) {
    var body = request.body;
    var username = request.session.username;
    if (!username) {
        response.redirect("/login");
        return;
    }
    connection.query(
        'INSERT INTO tips (title, sort, userName, view, likes, text, img) VALUES (?, ?,' +
                ' ?, 0, 0, ?, NULL)',
        [
            body.title,
            body.sort,
            username,
            body.view,
            body.likes,
            body.text
        ],
        function (error) {
            if (error) {
                console.log(error);
            }
            //response.send(data);
            response.redirect('/crudTipsBoard');
        }
    );
});

app.get('/editTips/:id', function (request, response) {
    fs.readFile(
        __dirname + '/views/editTipsBoard.html',
        'utf8',
        function (error, data) {
            connection.query(
                'SELECT * FROM tips WHERE id = ?',
                [request.param('id')],
                function (error, result) {
                    console.log(result[0]);
                    if (error) 
                        console.log(error);
                    response.send(ejs.render(data, {
                        data: result[0],
                        un: request.session.username
                    }));
                }
            );
        }
    );
});

app.post('/editTips/:id', function (request, response) {
    var body = request
        .body

        connection
        .query('UPDATE tips SET title=?, sort=?, text=? WHERE id=?', [
            body.title, body.sort, body.text, request.param('id')
        ], function (error, data) {
            if (error) 
                console.log(error);
            response.redirect('/crudTipsBoard');
        });
});

// app.get('/crudDailyBoard', function(request, response) {
// response.sendFile(path.join(__dirname + '/views/crudDailyBoard.html')); });
// app.get('/index', restrict, function(request, response) { 	if
// (request.session.loggedin) { 		response.sendFile(path.join(__dirname +
// '/views/index.html')); 	} else { 		response.send('Please login to view this
// page!'); 		response.end(); 	} }); app.get('/test2', function (request,
// response) {     if (request.session.loggedin) {
// response.sendFile(path.join(__dirname + '/my/test2.html'));     } else {
// response.send('Please login to view this page!');         response.end();
// } }); dailyBoard
app.get('/crudDailyBoard', function (request, response) {
    var page = request.query.page;

    if (!request.query.page || request.query.page <= 0) {
        page = 1;
    }
    fs.readFile(
        __dirname + '/views/crudDailyBoard.html',
        'utf8',
        function (error, data) {
            if (error) 
                console.log(error);
            connection.query(
                'SELECT * FROM daily ORDER BY date desc limit ?, 5',
                [5 * (page - 1)],
                function (error, results) {
                    connection.query(
                        'SELECT COUNT(*) as count FROM daily',
                        function (error, result) {
                            if (error) 
                                console.log(error);
                            response.send(ejs.render(data, {
                                un: request.session.username,
                                list: results,
                                total: result[0].count,
                                page: page
                            }));
                        }
                    );

                }
            );
        }
    );
});

app.get('/crudDailyBoard/detail/:id', function (request, response) {
    fs.readFile(
        __dirname + '/views/detailDailyBoard.html',
        'utf8',
        function (error, data) {
            connection.query(
                'SELECT * FROM daily WHERE id=?',
                [request.param('id')],
                function (error, re) {
                    connection.query('UPDATE daily set view=? WHERE id=?', [
                        re[0].view + 1,
                        request.param('id')
                    ], function (error, res) {
                        connection.query(
                            'SELECT * FROM daily WHERE id=?',
                            [request.param('id')],
                            function (error, result) {
                                response.send(ejs.render(data, {
                                    data: result[0],
                                    un: request.session.username
                                }));
                            }
                        );
                    });
                }
            );
        }
    );
});

app.get('/deleteDaily/:id', function (request, response) {
    connection.query(
        'DELETE FROM daily WHERE id=?',
        [request.param('id')],
        function () {
            response.redirect('/crudDailyBoard');
        }
    );
});

// app.get('/crudTipsBoard', function (request, response) {      ������ �н��ϴ�.
// fs.readFile(__dirname + '/views/crudTipsBoard.html', 'utf8', function (error,
// data) {          �����ͺ��̽� ������ �����մϴ�.         connection.query('SELECT
// * FROM products', function (error, results) {              �����մϴ�.
// response.send(ejs.render(data, {                 data: results
// }));         });     }); }); app.get('/deleteDaily/:id', function (request,
// response) {      �����ͺ��̽� ������ �����մϴ�.     connection.query('DELETE
// FROM daily WHERE id=?', [request.param('id')], function () {
// �����մϴ�.         response.redirect('/crudDailyBoard');     }); });
app.get('/insertDaily', function (request, response) {
    // ������ �н��ϴ�.
    fs.readFile(
        __dirname + '/views/addDailyBoard.html',
        'utf8',
        function (error, data) {
            // �����մϴ�.
            response.send(ejs.render(data, {un: request.session.username}));
        }
    );
});
app.post('/insertDaily', function (request, response) {
    var body = request.body;
    var username = request.session.username;
    if (!username) {
        response.redirect("/login");
        return;
    }
    connection.query(
        'INSERT INTO daily (title, sort, userName, text, view, likes) VALUES (?, ?, ?, ' +
                '?, 0, 0)',
        [
            body.title,
            body.sort,
            username,
            body.text,
            body.view,
            body.likes
        ],
        function (error) {
            if (error) {
                console.log(error);
            }
            //response.send(data);
            response.redirect('/crudDailyBoard');
        }
    );
});

app.get('/editDaily/:id', function (request, response) {
    fs.readFile(
        __dirname + '/views/editDailyBoard.html',
        'utf8',
        function (error, data) {
            connection.query(
                'SELECT * FROM daily WHERE id = ?',
                [request.param('id')],
                function (error, result) {
                    console.log(result[0]);
                    if (error) 
                        console.log(error);
                    response.send(ejs.render(data, {
                        data: result[0],
                        un: request.session.username
                    }));
                }
            );
        }
    );
});

app.post('/editDaily/:id', function (request, response) {
    var body = request
        .body

        connection
        .query('UPDATE daily SET title=?, sort=?, text=? WHERE id=?', [
            body.title, body.sort, body.text, request.param('id')
        ], function (error, data) {
            if (error) 
                console.log(error);
            response.redirect('/crudDailyBoard');
        });
});

//use & privacy
app.get('/use', function (request, response) {
    var uname = request.session.username;

    fs.readFile(__dirname + '/views/use.html', 'utf8', function (error, data) {
        if (request.session.loggedin) {
            response.send(ejs.render(data, {un: uname}));
        } else {
            response.send(ejs.render(data, {un: null}));
        }
    });
    //response.sendFile(path.join(__dirname + '/views/use.html'));
});
app.get('/privacy', function (request, response) {
    var uname = request.session.username;

    fs.readFile(__dirname + '/views/privacy.html', 'utf8', function (error, data) {
        if (request.session.loggedin) {
            response.send(ejs.render(data, {un: uname}));
        } else {
            response.send(ejs.render(data, {un: null}));
        }
    });
    //response.sendFile(path.join(__dirname + '/views/privacy.html'));
});

app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});