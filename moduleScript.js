var graphType="sin";

var cartImage=new Image();
cartImage.src="cartesianGraph.jpg";
var sinImage=new Image();
sinImage.src="sinGraph.jpg";
var cosImage=new Image();
cosImage.src="cosGraph.jpg";
var tanImage=new Image();
tanImage.src="tanGraph.jpg";

var answerKey=[0,1,2,3];

var qst1=[
   ["Now Show me 4pi/3.",14,38],
 ["Show me pi/6 by moving your red pointers in both graphs."
  +"When you have the answer click the submit answer button to the left.",2, 26],

];

var qst2=[
  ["Question",2,26]
];

var qst3=[
  ["Question",2,26]
];
var allQstArray=[];
//the questions arrays need to be added in reverse order,
//once a qst part is read through it will remove it from allQstArray
//the pop method can only remove the last elemnt from an array
allQstArray.push(qst3);
allQstArray.push(qst2);
allQstArray.push(qst1);
var totalNumParts=allQstArray.length;

var canvas=$("cartesianPlane");
var c1=canvas.getContext("2d");

var canvas2=$("graph");
var c2=canvas2.getContext("2d");

var redLine1=new Line(0, "red", "pointer","red");
var redLine2=new Line(24, "red", "slider","red");
redLine1.makeButtons();
redLine2.makeButtons();

var blueLine1=new Line(0, "blue", "pointer","blue");
var blueLine2=new Line(24, "blue", "slider","blue");


var allLines=[redLine1,redLine2];
/////////////////////////////////////////////////////////////////////////////////////////
  window.onload=function () {
      $("redSpinNeg").addEventListener("click",redSpinNeg);
      $("redSpinPos").addEventListener("click",redSpinPos);
      $("redMoveNeg").addEventListener("click",redMoveNeg);
      $("redMovePos").addEventListener("click",redMovePos);

      $("sin").addEventListener("click",chngToSin);
      $("cos").addEventListener("click",chngToCos);
      $("tan").addEventListener("click",chngToTan);

      $("bubble").addEventListener("click", cntinue);
      $("msgHolder").addEventListener("click", cntinue);



      drawCartesian();
      drawGraph();
      drawAllLines(0,allLines);
    }

    function cntinue() {
      console.log("message bubble was clicked");
      sendMessage("I will begin to ask you questions. "
         +"If you get them right, you'll get a cookie otherwise"
        +" This msg will self destruct in 3 seconds");
      setTimeout(askAllQsts,3000);

    }

    function askAllQsts() {
      if(allQstArray.length!==0){
        if(allQstArray[allQstArray.length-1].length!==0){
            //ask the question
              askQuestion(allQstArray[allQstArray.length-1][allQstArray[allQstArray.length-1].length-1]);
        }else{
          allQstArray.pop();
          if(totalNumParts-allQstArray.length==1){
            alert("welcome to part 2");
            addAllBlue();
          }else if(totalNumParts-allQstArray.length==1){
            alert("welcome to part 3");
          }
          askAllQsts();
        }
      }
    }

    function askQuestion (qst){
          $("msgHolder").innerHTML=qst[0];
          updateAnswerkey(qst);
          $("submitAns").addEventListener("click",verify);
    }

    function updateAnswerkey (qst){
      if(qst.length==3){
        answerKey=[qst[1],-1,qst[2],-1];
      }else{
        answerKey=[qst[1],qst[2],qst[3],qst[4]];
      }
    }

    function verify (){
      var redAngle=redLine1.fraction;
      var redPos=redLine2.fraction;
      if(redAngle==answerKey[0]&&redPos==answerKey[2]){
        cookieWindow = window.open("https://media.istockphoto.com/photos/chocolate-chip"
        +"-cookie-isolated-picture-id517109442?k=6&m=517109442&s=612x612&w=0&h=NvQ5y8EN"
        +"WZvpr84vEFWmxUgV2rCgtOGEsjJXa3IYsZ4=","", "width=100, height=100");
         $("msgHolder").innerHTML="Good Job! You got that one right! Here is your cookie.";
        $("submitAns").removeEventListener("click",verify);
        allQstArray[allQstArray.length-1].pop();
        setTimeout(askAllQsts, 3000);
      }else{
         coalWindow=window.open("https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iwqLq4eiBNBM/v1/-1x-1.jpg",
         "","width=100, height=100" );
         $("msgHolder").innerHTML="I AM FURIOUS YOU GOT THAT ONE WRONG HERE IS YOUR COAL! TRY AGAIN";

         setTimeout(askAllQsts, 3000);
      }

    }

    function sendMessage(msg) {
      $("msgHolder").innerHTML=msg;
    }

    function addAllBlue(){
      blueLine1.makeButtons();
      blueLine2.makeButtons();

      $("blueSpinNeg").addEventListener("click",blueSpinNeg);
      $("blueSpinPos").addEventListener("click",blueSpinPos);
      $("blueMoveNeg").addEventListener("click",blueMoveNeg);
      $("blueMovePos").addEventListener("click",blueMovePos);
      //for some reason the evenListen for the red buttons stop working
      //so they must be readded
      $("redSpinNeg").addEventListener("click",redSpinNeg);
      $("redSpinPos").addEventListener("click",redSpinPos);
      $("redMoveNeg").addEventListener("click",redMoveNeg);
      $("redMovePos").addEventListener("click",redMovePos);
      allLines.push(blueLine1);
      allLines.push(blueLine2);
      drawGraph();
      drawCartesian();
      drawAllLines(0,allLines);
    }



    function drawCartesian(){
      c1.drawImage(cartImage,0,0,canvas.width,canvas.height);
    }
    function drawAllLines(i, myLinesArray) {
      if(i<myLinesArray.length){
        var myLine=myLinesArray[i];
        if(myLine.type=="pointer"){
          drawPointer(myLine);
        }else{
          drawSlider(myLine);
        }
        drawAllLines(i+1,myLinesArray);
      }
    }
    function drawPointer(myLine) {
      var color=myLine.color;
      var angl=myLine.fraction;
      c1.fillStyle=color;
      c1.translate(149,74);

      c1.rotate(-angl/12*Math.PI);
      c1.fillRect(0,0,200,2);
      c1.rotate(angl/12*Math.PI);
      c1.translate(-149,-74);
    //  console.log("redAngle: "+angl);
    }
    function drawSlider(myLine) {
        var color=myLine.color;
        var pos=myLine.fraction;
        c2.fillStyle=color;
        if(pos/12*75==300){
          c2.fillRect(pos/12*75-2,0,2,160);
        }else{
          c2.fillRect(pos/12*75,0,2,160);
        }
      }
    function drawGraph(){
      if(graphType=="sin"){
          c2.drawImage(sinImage,0,0,canvas2.width,canvas2.height);
        }else if(graphType=="cos"){
          c2.drawImage(cosImage,0,0,canvas2.width,canvas2.height);
        }else{
          c2.drawImage(tanImage,0,0,canvas2.width,canvas2.height);
        }
      }

    function chngToCos(){
      graphType="cos";
      drawGraph();
      drawAllLines(0,allLines);
    }
    function chngToSin(){
      graphType="sin";
      drawGraph();
      drawAllLines(0,allLines);
    }
    function chngToTan(){
      graphType="tan";
      drawGraph();
      drawAllLines(0,allLines);
    }

    function redSpinPos() {
      redLine1.incremPositive( 26, 2);
      drawCartesian();
      drawAllLines(0,allLines);
    }
    function blueSpinPos() {
      // if(incremPositive(blueAngle, 26, 2)<redAngle){
        blueLine1.incremPositive( 26, 2);
        drawCartesian();
        drawAllLines(0,allLines);
      // }else{
      //   alert("The blue line cannot exceed the red!!!")
      // }
    }
    function redSpinNeg() {
      redLine1.incremNegative( -2,22);
      drawCartesian();
      drawAllLines(0,allLines);
    }
    function blueSpinNeg() {
      blueLine1.incremNegative( -2,22);
      drawCartesian();
      drawAllLines(0,allLines);
    }
    function redMoveNeg() {
      redLine2.incremNegative(-2,48);
      drawGraph();
      drawAllLines(0,allLines);
    }
    function blueMoveNeg() {
      blueLine2.incremNegative(-2,48);
      drawGraph();
      drawAllLines(0,allLines);
    }
    function redMovePos() {
      redLine2.incremPositive(50,0);
      drawGraph();
      drawAllLines(0,allLines);
    }
    function blueMovePos() {
      blueLine2.incremPositive(50,0);
      drawGraph();
      drawAllLines(0,allLines);
    }
