//Defining character objects
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

//array of character objects
var listChars=[yodaChar,darthChar,chewbaccaChar,wedgeChar] ;

// variable definations
var enemiesList=[];
var defender;
var yourCharObj;
var attemptCount=0;


// initialize function 
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

// function to update the Status of the fight win or lost
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

// function to add character object in specific division dynamically
function addCharacter(characterObj,divId) 
{
    var divObj=$("<div>")
    divObj.addClass("charDiv")
    divObj.attr('id',characterObj.objname);
    var selectCharImg = $("<img>");
    
    selectCharImg.addClass("imgChar");
   
    selectCharImg.attr("src",characterObj.url);

    
    //Header part of the character object
    var charHeader =$("<div>");
    charHeader.addClass("content top");
    var charname=$("<h3>");
    charname.text(characterObj.name);
    charHeader.append(charname);

    //Footer part of the character object
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


//Main Process
$(document).ready(function() {
    initializeGame();

    // on click event to identify your character and enemies
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

    // on click event to select enemiey for the fight and move it to defender section
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

    //Attack button click event
    $("#attack").on("click",function(e){

        //log your attackpower for debugging
        console.log("ur character attack power: " + yourCharObj.attackPower);

        //use attemptcount to multiply with to increase the attackpower on every attempt
        attemptCount=attemptCount + 1;
        var urAttackpower = yourCharObj.attackPower * attemptCount
        defender.healthPoints = defender.healthPoints - urAttackpower;

        $("#defender").empty();
        addCharacter(defender,'defender');
        console.log("defender health points: " + defender.healthPoints);
        $("#attack").prop('disabled', true);

        //use setTimeout function for counter attack within specified time and diable attack button till that time
        setTimeout(function() {
            $("#attack").prop('disabled', false);
            statusMsg.innerHTML ="You attacked " + defender.name + " for " +  urAttackpower + " damage. <br/>"  +
            defender.name + " attacked you back for " + defender.attackPower + " damage.";
            updateStatus();
        }, 200);
    
    });

    //Restart button to restart the game
    $("#restart").on("click",function(e){
        initializeGame();
    });

});

