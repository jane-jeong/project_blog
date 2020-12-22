// router > main.js 
'use strinct';

var mysql = require('mysql'); 
var connection = mysql.createConnection({
  host: 'localhost',          // DB가 위치한 IP주소
  port: 3306,                 // DB와 연결할 포트번호
  user: 'root',               // 계정이름
  password: 'turing623$',     // 계정 비밀번호
  database: 'project_blog'    // 데이터베이스 이름
});

module.exports = function(app, fs){ // router에서 fs 모듈 사용할 수 있도록 인자로 추가해준다

    // 홈페이지 + 게시판 글 목록 
    app.get('/',function(req,res,next){
        var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board order by idx desc',function(err,rows){
        if(err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
        console.log('rows :' +  rows);
        res.render('pretty_home', { title: "home", rows: rows });
        });
    });

    // 어드민 페이지 (velopert 블로그 참고)
    app.get('/admin',function(req,res){
        var sess = req.session;
        res.render('admin', {
            title: "admin",
            length: 3,
            name: sess.name,         // 세션을 조회할 수 있도록 세션 변수를 EJS 엔진에 전달
            username: sess.username
        });
    });

    // 커스텀 404 페이지 (404, 500 페이지는 app.use 메서드 사용)
    // app.use는 미들웨어 추가할 때 쓰는 메서드 (우선 지금은 라우트와 일치하지 않는 모든 것을 처리하는 폴백 핸들러라고 생각)
    // 중요한 것은 익스프레스에서는 미들웨어 앞에 라우트를 두어야 한다는 점이다
    app.use(function(req, res){
        res.type('text/plain');
        res.status(404); 
        res.send('404 - Not Found');
    }); 

    // 커스텀 500 페이지 
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500); 
        res.send('500 - Server Error');
    }); 

};