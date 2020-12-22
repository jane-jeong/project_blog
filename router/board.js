// router > board.js
'use strinct';

var mysql = require('mysql'); 
var connection = mysql.createConnection({
  host: 'localhost',          // DB가 위치한 IP주소
  port: 3306,                 // DB와 연결할 포트번호
  user: 'root',               // 계정이름
  password: 'turing623$',     // 계정 비밀번호
  database: 'project_blog'    // 데이터베이스 이름
});

module.exports = function(app){ 

    // 게시판 리스트 페이지
    app.get('/boardlist', function(req, res, next) {
            var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board order by idx desc',function(err,rows){
            if(err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            console.log('rows :' +  rows);
            res.render('board_list', { title:'Board List',rows: rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
            });
        });


    // 게시판 글 읽기 페이지
    app.get('/boardlist/read/:idx',function (req,res,next) {
        var idx = req.params.idx;
        console.log("idx : "+idx);
            connection.beginTransaction(function(err){
            if(err) console.log(err);
            connection.query('update board set hit=hit+1 where idx=?', [idx], function (err) {
                if(err) {
                console.log(err);
                connection.rollback(function () {
                    console.error('rollback error1');
                })
                }
                connection.query('select idx,title,content,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T")' +
                    ' as moddate,DATE_FORMAT(regdate, "%Y/%m/%d %T") as regdate from board where idx=?',[idx],function(err,rows)
                {
                if(err) {
                    console.log(err);
                    connection.rollback(function () {
                    console.error('rollback error2');
                    })
                }
                else {
                    connection.commit(function (err) {
                    if(err) console.log(err);
                    console.log("row : " + rows);
                    res.render('pretty_board_read',{title:rows[0].title , rows : rows});
                    })
                }
                })
            })
        })
    })

    // 글쓰기 페이지
    // GET 방식의 요청이 들어왔을 때 /board/write 페이지로 이동한다
    app.get('/board/write',function (req,res,next) {
      var sess = req.session;
      res.render('board_write',{
        title:'글 쓰기 페이지',
        name: sess.name,         // 세션을 조회할 수 있도록 세션 변수를 EJS 엔진에 전달한다
        username: sess.username
      })
    })

    // POST 방식의 요청은 URL에 데이터가 포함되지 않고 BODY에 포함되어 전송된다.
    // 그렇기 때문에 request 객체를 통해 body에 접근 후 데이터를 가지고 온다.
    app.post('/board/write',function (req,res,next) {
      var body = req.body;
      var writer = body.writer;
      var title = req.body.title;
      var content = req.body.content;
      var password = req.body.password;
      connection.beginTransaction(function(err) {
        if(err) console.log(err);
        connection.query('insert into board(title,writer,content,password) values(?,?,?,?)'
            ,[title,writer,content,password]
            ,function (err) {
              if(err) {
                // 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백
                console.log(err);
                connection.rollback(function () {
                  console.error('rollback error1');
                })
              }
              connection.query('SELECT LAST_INSERT_ID() as idx',function (err,rows) {
                if(err) {
                  // 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백
                  console.log(err);
                  connection.rollback(function () {
                    console.error('rollback error1');
                  })
                }
                else
                {
                  connection.commit(function (err) {
                    if(err) console.log(err);
                    console.log("row : " + rows);
                    var idx = rows[0].idx;
                    res.redirect('/boardlist/read/'+idx); 
                    // 데이터를 DB에 저장하고 해당하는 DB의 IDX 값을 가지고 온 후 Read 페이지로 이동한다.
                  })
                }
              })
        })
      })
    })

    // 게시판 리스트 관리자 페이지
    // 글 목록을 확인하고, 수정(PUT), 삭제(DELETE)가 가능한 페이지 
    app.get('/boardlist/admin', function(req, res, next) {
      var sess = req.session;
      var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board order by idx desc',function(err,rows){
      if(err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시
      console.log('rows :' +  rows);
      res.render('board_list_admin', { 
          title:'Board List Admin',
          rows: rows,
          name: sess.name,
          username: sess.username
        }); 
      });
  });

};
