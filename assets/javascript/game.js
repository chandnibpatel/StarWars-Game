// var newdiv = $( "<div id='object1'></div>" )
// $("#characterSelection").append(newdiv);


// var imageChar = $('<div id="Img1"><h3>Yoda</h3><img src="./assets/images/Yoda.jpg" height=200 width=200 /></div>');
// imageChar.addClass("imgChar");
// imageChar.attr("height","200","width","200");
// $("#object1").append(imageChar);

// var imageChar2 = $('<div id="Img2"><h3>Darth-vader</h3><img src="./assets/images/Darth-vader.jpg" height=200 width=200 /></div>');
// imageChar2.addClass("imgChar");
// imageChar2.attr("height","200","width","200");
// $("#object1").append(imageChar2);

// var imageChar3 = $('<div id="Img3"><h3>Chewbacca</h3><img src="./assets/images/Chewbacca.jpg" height=200 width=200 /></div>');
// imageChar3.addClass("imgChar");
// imageChar3.attr("height","200","width","200");
// $("#object1").append(imageChar3);

// var imageChar4 = $('<div id="Img4"><h3>Wedge-Antilles</h3><img src="./assets/images/Wedge-Antilles.jpg" height=200 width=200 /></div>');
// imageChar4.addClass("imgChar");
// imageChar4.attr("height","200","width","200");
// $("#object1").append(imageChar4);

var yodaChar ={
    name:"Yoda",
    objname: "yodaChar",
    url:"./assets/images/Yoda.jpg",
    healthPoints:"150",
    attackPower:0
};
var darthChar ={
    name:"Darth-Vader",
    objname: "darthChar",
    url:"./assets/images/Darth-vader.jpg",
    healthPoints:"150",
    attackPower:0
};
var chewbaccaChar ={
    name:"Chewbacca",
    objname: "chewbaccaChar",
    url:"./assets/images/Chewbacca.jpg",
    healthPoints:"150",
    attackPower:0
};
var wedgeChar ={
    name:"Wedge Antilles",
    objname: "wedgeChar",
    url:"./assets/images/Wedge-Antilles.jpg",
    healthPoints:"150",
    attackPower:0
};

var listChars=[yodaChar,darthChar,chewbaccaChar,wedgeChar]
var enemiesList=[];
var defender;
var yourCharObj;
var attemptCount=0;

function initializeGame(){

    $("#characterSelection").empty();
    for(var i=0;i<listChars.length;i++)
    {
        listChars[i].healthPoints = (Math.round(Math.random()*50)) + 150;
        listChars[i].attackPower = (Math.round(Math.random()*17)) + 8;
        addCharacter(listChars[i],'characterSelection'); 
    }
    $("#yourCharacter").empty();
    $("#defender").empty();
    $("#enemiesSelection").empty();
    $("#statusMsg").text("");
     enemiesList=[];
     attemptCount=0;
}

function updateStatus()
{
    yourCharObj.healthPoints = yourCharObj.healthPoints - defender.attackPower ;
    $("#yourCharacter").empty();
    addCharacter(yourCharObj,'yourCharacter');
    
    if( (yourCharObj.healthPoints <= 0)  )
    {
    statusMsg.innerText ="You lost !!";
     $("#attack").prop("disabled",true);
   }
    else if (defender.healthPoints <=0) 
    {
        statusMsg.innerText ="You defended!!";
        $("#attack").disabled= true;
        for (i=0;i<enemiesList.length;i++ )
        {
          if (defender.objname == enemiesList[i].objname)
            {
              enemiesList.splice(i,1);
           }
        }
        $("#defender").empty();
   }
}
function addCharacter(characterObj,divId) 
{
    var divObj=$("<div>")
    divObj.addClass("charDiv")
    divObj.attr('id',characterObj.objname);
    var selectCharImg = $("<img>");
    
    selectCharImg.addClass("imgChar");
   
    selectCharImg.attr("src",characterObj.url);

    
//Header
    var charHeader =$("<div>");
    charHeader.addClass("content top");
    var charname=$("<h3>");
    charname.text(characterObj.name);
    charHeader.append(charname);
//Footer
    var charFooter =$("<div>");
    charFooter.addClass("content bottom");
    var charhealth=$("<h5>");
    charhealth.text(characterObj.healthPoints)
    charFooter.append(charhealth);

//Adde to DIV
    divObj.append(charHeader);
    divObj.append(selectCharImg);
    divObj.append(charFooter);

//Add to Main Div
      $("#"+ divId).append(divObj);
}


$(document).ready(function() {
    initializeGame();

    $("#characterSelection").on("click",".charDiv",function(e){
        $('#characterSelection').empty();
        console.log($(this).attr("id"));

        var charIdString = ($(this).attr("id"));
    
        for (i=0;i<listChars.length;i++ )
        {
        if (charIdString == listChars[i].objname)
            {
            addCharacter(listChars[i],'yourCharacter');
            yourCharObj=listChars[i];
            }
        else {
            addCharacter(listChars[i],'enemiesSelection');
            enemiesList.push(listChars[i]);
        }
        }

    });

    $("#enemiesSelection").on("click",".charDiv",function(e){
    
        var charIdString = ($(this).attr("id"));
        $("#enemiesSelection").empty();
        $("#defender").empty();
        $("#statusMsg").text("");
        console.log(enemiesList);
        for (i=0;i<enemiesList.length;i++ )
        {
        if (charIdString == enemiesList[i].objname)
            {
            defender=enemiesList[i];
            $("#attack").prop('disabled', false);
            addCharacter(enemiesList[i],'defender');
        
            }
        else {
            addCharacter(enemiesList[i],'enemiesSelection');
        }
        }

    });
    $("#attack").on("click",function(e){
        console.log("ur character attack power: " + yourCharObj.attackPower);
        attemptCount=attemptCount + 1;
        var urAttackpower = yourCharObj.attackPower * attemptCount
        defender.healthPoints = defender.healthPoints - urAttackpower;
        $("#defender").empty();
        addCharacter(defender,'defender');
        console.log("defender health points: " + defender.healthPoints);
        $("#attack").prop('disabled', true);
        setTimeout(function() {
            $("#attack").prop('disabled', false);
            statusMsg.innerHTML ="You attacked " + defender.name + " for " +  urAttackpower + " damage. <br/>"  +
            defender.name + " attacked you back for " + defender.attackPower + " damage.";
            updateStatus();
        }, 200);
    
    });

    $("#restart").on("click",function(e){
        initializeGame();
    });

});

