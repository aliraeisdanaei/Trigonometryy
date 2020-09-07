var questions=[
 ["pi/6",1],
  ["4pi/3",3],
  ["3pi/4",2],
  ["7pi/8",4]
];

var questionNum=0;

window.onload=function () {
$("q1").onclick=verifyQ1;
$("q2").onclick=verifyQ2;
$("q3").onclick=verifyQ3;
$("q4").onclick=verifyQ4;

askQuestion();
}

function askQuestion() {
  $("asker").innerHTML="Which quadrant is "+questions[questionNum][0]+" is in?";

}

function verifyQ1() {
  if(questions[questionNum][1]==1){
    alert("right");
  }else{
    alert("false");
  }
  questionNum++;
  askQuestion();
}

function verifyQ2() {
  if(questions[questionNum][1]==2){
    alert("right");
  }else{
    alert("false");
  }
  questionNum++;
  askQuestion();
}
function verifyQ3() {
  if(questions[questionNum][1]==3){
    alert("right");
  }else{
    alert("false");
  }
  questionNum++;
  askQuestion();
}
function verifyQ4() {
  if(questions[questionNum][1]==4){
    alert("right");
  }else{
    alert("false");
  }
  questionNum++;
  askQuestion();

}
