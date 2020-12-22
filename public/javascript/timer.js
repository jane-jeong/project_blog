/* Today */
var x = setInterval(function() {
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.toLocaleString('en-EN', { month: 'short' }) // 문자 월
    let date = today.getDate();  // 날짜
    // let day = today.getDay();  // 요일
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초
    // let milliseconds = today.getMilliseconds(); // 밀리초
    document.getElementById("today").innerHTML = 'Time now : ' + year + ' ' + month + ' ' + date + '   ' + hours + ':' + minutes + ':' + seconds 
}, 1000);

/* Countup Timer */
// Set the date we're counting down to
let countDownDate = new Date("Jun 8, 1993 09:05:00").getTime();

// Update the count down every 1 second
let xx = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = now - countDownDate;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = "Since my birth : " + days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(xx);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);