// server.js 
// 서버 실행 명령: node server.js

'use strinct';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")
var mysql = require('mysql'); 

var connection = mysql.createConnection({   // query를 실행할 때 connection 사용한다
  host: 'localhost',          // DB가 위치한 IP주소
  port: 3306,                 // DB와 연결할 포트번호
  user: 'root',               // 계정이름
  password: 'turing623$',     // 계정 비밀번호
  database: 'project_blog'    // 데이터베이스 이름
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 3000); 
var server = app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

// 라우터 코드는 가장 아래에 배치한다 
var router_board = require('./router/board')(app);
var router_user = require('./router/user')(app, fs);
var router_login = require('./router/login')(app, fs);
var router_main = require('./router/main')(app, fs); // main.js에 404, 500 미들웨어가 있기 때문에 가장 아래에 배치한다.