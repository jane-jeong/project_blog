# project_blog 

# Memo

## Tech Stack 
- BE : node.js / express 
- FE : ejs 
- DB : MariaDB 

## Database
- db name: project_blog 
- table: board, user 

## References
- express : Velopert 
- 게시판 만들기 : https://develtraining.tistory.com/category/%EC%9B%B9%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/Node%20+%20Express%20+%20Mysql%20%EC%9D%84%20%EC%9D%B4%EC%9A%A9%ED%95%9C%20%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EB%A7%8C%EB%93%A4%EA%B8%B0

## 메모 
- app.get 메서드는 라우트를 추가하는 메서드다.
- app.VERB* (VERB* : get, post, put, delete, ...)

### MariaDB에서 databse 생성하고 조회
CREATE DATABASE PROJECT_BLOG default character set utf8mb4;
USE PROJECT_BLOG; 
show tables; 

### MariaDB에서 database 삭제 
DROP DATABASE PROJECT_BLOG; 

### ejs 에서 아래처럼 loop 돌릴 수 있다. (length는 js 파일에서 정의해준다)
<h1>Loop it!</h1>
<ul>
    <% for(var i=0; i<length; i++){ %>
        <li> <%= "LOOP" + i %> </li>
    <% } %>
</ul>

-----length가 3이라면 결과는 아래처럼 나온다-----
- LOOP0
- LOOP1
- LOOP2 



