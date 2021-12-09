var db = require('./db');

exports. in = function (request, response) { //alert가 안됨
    var post = request.body;
    db.query(
        `SELECT * FROM member WHERE mId=?`,
        [post.userid],
        function (error, results) {
            db.query(
                `SELECT * FROM admin WHERE aId=?`,
                [post.userid],
                function (error2, admin) {
                    if (!results[0]) {
                        if (!admin[0]) {
                            response.send(
                                '<script>alert("아이디 또는 비밀번호가 일치하지 않습니다."); window.location.href = `/login`;</sc' +
                                'ript>'
                            );
                        } else {
                            if (post.userpw != admin[0].aPwd) {
                                response.send(
                                    '<script>alert("아이디 또는 비밀번호가 일치하지 않습니다."); window.location.href = `/login`;</sc' +
                                    'ript>'
                                );
                            } else {
                                request.session.is_logined = true;
                                request.session.name = admin[0].aId;
                                request.session.pw = admin[0].aPwd;

                                request
                                    .session
                                    .save(function () {
                                        response.render('mainPage_admin', {
                                            name: admin[0].aId,
                                            is_logined: true
                                        });
                                    });
                                response.redirect(`/admin`);
                            }
                        }
                    } else if (post.userpw != results[0].mPwd) {
                        response.send(
                            '<script>alert("아이디 또는 비밀번호가 일치하지 않습니다."); window.location.href = `/login`;</sc' +
                            'ript>'
                        );
                    } else if (error) {
                        console.log(error);
                    } else {
                        request.session.is_logined = true;
                        request.session.name = results[0].mName;
                        request.session.ID = results[0].mId;
                        request.session.pw = results[0].mPwd;

                        request
                            .session
                            .save(function () {
                                response.render('mainPage', {
                                    name: results[0].mName,
                                    ID: results[0].mId,
                                    is_logined: true
                                });
                            });
                        response.redirect(`/`);
                    }
                }
            );
        }
    );
}

exports.in_direct = function (request, response) { //alert가 안됨
    var userid = request.params.userid;
    var userpw = request.params.userpw;
    db.query(
        `SELECT * FROM member WHERE mId=?`,
        [userid],
        function (error, results) {
            db.query(
                `SELECT * FROM admin WHERE aId=?`,
                [userid],
                function (error2, admin) {
                    if (!results[0]) {
                        if (!admin[0]) {
                            response.send(
                                '<script>alert("아이디 또는 비밀번호가 일치하지 않습니다."); window.location.href = `/login`;</sc' +
                                'ript>'
                            );
                        } else {
                            if (userpw != admin[0].aPwd) {
                                response.send(
                                    '<script>alert("아이디 또는 비 밀번호가 일치하지 않습니다."); window.location.href = `/login`;</s' +
                                    'cript>'
                                );
                            } else {
                                request.session.is_logined = true;
                                request.session.name = admin[0].aId;
                                request.session.pw = admin[0].aPwd;

                                request
                                    .session
                                    .save(function () {
                                        response.render('mainPage_admin', {
                                            name: admin[0].aId,
                                            is_logined: true
                                        });
                                    });
                                response.redirect(`/admin`);
                            }
                        }
                    } else if (userpw != results[0].mPwd) {
                        response.send(
                            '<script>alert("아이디 또는 비밀번호가 일치하지 않습니다."); window.location.href = `/login`;</sc' +
                            'ript>'
                        );
                    } else if (error) {
                        console.log(error);
                    } else {
                        request.session.is_logined = true;
                        request.session.name = results[0].mName;
                        request.session.ID = results[0].mId;
                        request.session.pw = results[0].mPwd;

                        request
                            .session
                            .save(function () {
                                response.render('mainPage', {
                                    name: results[0].mName,
                                    ID: results[0].mId,
                                    is_logined: true
                                });
                            });
                        response.redirect(`/`);
                    }
                }
            );
        }
    );
}

function check() { //db.query가 안됨
    var objId = document.getElementById("userid");
    var objPw = document.getElementById("userpw");

    if (objId.value == "") {
        alert("ID를 입력해 주세요.");
        return false;
    } else if (objPw.value == "") {
        alert("PW를 입력해 주세요.");
        return false;
    } else {
        return true;
    }
}