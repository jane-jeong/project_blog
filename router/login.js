// router > login.js 
'use strinct';

module.exports = function(app, fs){ // router에서 fs 모듈 사용할 수 있도록 인자로 추가해준다

    // GET 방식의 요청이 들어왔을 때 Login 페이지로 이동합니다.
    app.get('/login',function (req,res,next) {
        res.render('login',{title:'Login Page'})
      })

    app.post('/login/user',function (req,res,next) {
        var body = req.body;
        var username = body.username;
        var password = body.password;
        res.redirect('/login/'+username+'/'+password);
    })

    // LOGIN API 
    app.get('/login/:username/:password', function(req, res){
        var sess;
        sess = req.session;

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
            var users = JSON.parse(data);
            var username = req.params.username;
            var password = req.params.password;
            var result = {};

            if(!users[username]){
                // USERNAME NOT FOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            if(users[username]["password"] == password){
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.redirect('/admin');

            }else{
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        })
    });

    // LOGOUT API 
    app.get('/logout', function(req, res){
        sess = req.session;
        if(sess.username){
            req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/admin');
                }
            })
        }else{
            res.redirect('/admin'); // 로그아웃하고 admin 페이지로 redirect 
        }
    })
}

