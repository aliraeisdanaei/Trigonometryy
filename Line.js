class Line{

    constructor(fraction, color, type, buttonClass){
        this.fraction=fraction;
        this.color=color;
        this.type=type;
        this.buttonClass=buttonClass;
      }

      makeButtons(){
        var id1;
        var id2;
        var text1;
        var text2;
        var holder;
        if(this.type=="pointer"){
          id1=this.color+"SpinNeg";
          id2=this.color+"SpinPos";
          text2="Spin +";
          text1="Spin -";
          holder="pointerButtonHolder";
        }else if(this.type=="slider"){
          id1=this.color+"MoveNeg";
          id2=this.color+"MovePos";
          text2="Move +";
          text1="Move -";
          holder="sliderButtonHolder";
        }
       this.makeOneButton(id1, holder, text1, this.buttonClass);
       this.makeOneButton(id2, holder, text2, this.buttonClass);

      }

       makeOneButton( id, holder,text, myClass) {
        var button=document.createElement("button");
        button.setAttribute("id",id);
        button.setAttribute("class", myClass);
        button.innerHTML=text;
        $(holder).appendChild(button);
        $(holder).innerHTML+="\n";
      }

 incremPositive(end, restart){
  var pos=this.fraction;
  if(pos==2||pos==8||pos==14||pos==20||pos==26||pos==32||pos==38||pos==44){
      pos+=1;
    }else if(pos==3||pos==9||pos==15||pos==21||pos==27||pos==33||pos==39||pos==45){
      pos+=1;
    }else{
      pos+=2;
    }
  if(pos==end){
        pos=restart;
    }
    this.fraction=pos;
}
 incremNegative( end, restart){
  var pos=this.fraction;
  if(pos==4||pos==10||pos==16||pos==22||pos==28||pos==34||pos==40||pos==46){
    pos-=1;
  }else if(pos==3||pos==9||pos==15||pos==21||pos==27||pos==33||pos==39||pos==45){
    pos-=1;
  }else{
    pos-=2;
  }
  if(pos==end){
    pos=restart;
  }
  this.fraction=pos;
}



}
