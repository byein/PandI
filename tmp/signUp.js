var db = require('./db');

exports.create = function(request, response){
    var post = request.body;
    db.query(`SELECT mId FROM member WHERE mId=?`, [post.userid], function(error, mem){
        db.query(`SELECT aId FROM admin WHERE aId=?`, [post.userid], function(error2, admin){
            db.query(`SELECT mEmail FROM member WHERE mEmail=?`, [post.usermail], function(error3, email){
                if (!mem[0] && !admin[0]){
                    if (!email[0]) {
                        db.query(`INSERT INTO member (mId, mPwd, mEmail, mDate, mName, mPost_code, mRoad_address, mJibun_address, mDetail_address, mExtra_address) VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)`,
                        [post.userid, post.userpw, post.usermail, post.username, post.postcode, post.road, post.jibun, post.detail, post.extra], function(error, result){
                            if(error){
                                throw error;
                            }
                            response.send(`<script>alert("회원가입이 완료되었습니다.");  window.location.href="/login_create/`+post.userid+`/`+post.userpw+`";</script>`);
                        });
                    } else {
                        response.send('<script>alert("이미 등록된 이메일입니다."); window.location.href = `/signUp`;</script>'); 
                    }
                } else {
                    response.send('<script>alert("이미 등록된 아이디입니다."); window.location.href = `/signUp`;</script>');
                }
            });
        });
    });
}

function check() {
    var objName = document.getElementById("userName");//이름 id
    var regname = /^[가-힣]{2,}$/; //이름에 사용할 정규 표현식

    if (!IdPwCheck()) { //아이디 비밀번호 검사
        return false;
    } else if (!EmailCheck()) { //이메일 검사
        return false;
    } else if (!regname.test(objName.value)) { //이름 검사
        alert("이름을 잘못 입력하셨습니다.");
        return false;
    } else { //유효성 검사 완료시 회원가입 진행
        return true;
    }
}

function IdPwCheck() {
    var objId = document.getElementById("userid"); //아이디 id
    var objPw = document.getElementById("userpw"); //비밀번호 id
    var objPwCheck = document.getElementById("userpwcheck"); //비밀번호확인id
    var regId = /^[a-zA-Z0-9]{5,20}$/; //아이디에 사용할 정규표현식
    var regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //비밀번호에 사용할 정규표현식

    if (objId.value == "") { //ID가 공백일 경우 false 반환
        alert("ID를 입력해 주세요.");
        return false;
    } else if (!regId.test(objId.value)) { //아이디의 값을 검사해 true or false 반환
        alert("ID를 5~20자의 영문 대소문자와 숫자로만 입력해주세요.");
        objId.value == "";
        return false;
    } else if (objPw.value == "") {
        alert("PW를 입력해 주세요.");
        return false;
    } else if (objPwCheck == "") {
        alert("비밀번호 확인을 입력해 주세요.");
        return false;
    } else if (objPw.value != objPwCheck.value) { //비밀번호 확인이 다를 경우 false 반환
        alert("비밀번호와 비밀번호 확인이 다릅니다.");
        return false;
    } else if (objPw.value == objId.value) { //아이디 비밀번호가 같을 경우 false 반환
        alert("아이디와 비밀번호를 다르게 만들어주세요.");
        return false;
    } else if (!regPw.test(objPw.value)) { //비밀번호 정규표현식 검사
        alert("비밀번호를 8자 이상의 영문 대소문자와 숫자, 특수문자를 1자 이상 사용하여 입력해주세요.");
        return false;
    } else {
        return true;
    }
} //Id/Pw 검사 end

function EmailCheck() { //이메일 확인 함수
    var objEmail = document.getElementById("usermail"); //usermail text 할당
    var regEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regEmail.test(objEmail.value)) { //이메일 값을 정규표현식과 비교하여 true or false 반환
        alert("이메일을 다시 입력해주세요.");
        return false;
    } else { //검사 통과시 true 반환
        return true;
    }
} //이메일 검사 end


//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if (roadAddr !== '') {
                document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if (data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if (data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}