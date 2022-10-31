
    //Game Modes "p" elements
    const lernenMode = document.getElementById("lernenModeP");
    const testMode = document.getElementById("testModeP");
    const übenMode = document.getElementById("übenModeP");

    //Register and Sign up buttons
    const logoutBtn = document.getElementById("logoutBtn");

    const modeList = [lernenMode, testMode, übenMode];
    
    //call function to chabge game mode if the "p" element is pressed
    lernenMode.addEventListener('click', GameModeChangerLernen);
    testMode.addEventListener('click', GameModeChangerTest);
    übenMode.addEventListener('click', GameModeChangerÜben);
    
    //the next 3 function make that the bkg color of "p" is changing and call 
    //another function that remove bkg color green if an element has it
    function GameModeChangerLernen() {
        LoopGameMode();
        lernenMode.style.backgroundColor = "green";
        };

    function GameModeChangerTest() {
        LoopGameMode();
        testMode.style.backgroundColor = "green";
        };

    function GameModeChangerÜben() {
        LoopGameMode();
        übenMode.style.backgroundColor = "green";
        };

    //check if one game mode is grenn and removes the color
    function LoopGameMode() {
        for (let i = 0; i < modeList.length; i++)
        {
            if(modeList[i].style.backgroundColor == "green"){
                modeList[i].style.backgroundColor = "rgb(173, 181, 189)";
            }
        }
    }

    logoutBtn.addEventListener('click' , () => {
        window.location.href = "/logout"; 
    });



    function GoToGameMode(){
        if(modeList[0].style.backgroundColor == "green"){
            //location.href = "";
            alert("Noch nicht fertig. Wir arbeiten daran");
        }else if(modeList[1].style.backgroundColor == "green") {
            //location.href = "";
            alert("Noch nicht fertig. Wir arbeiten daran");
        }else if(modeList[2].style.backgroundColor == "green") {
            location.href = 'uben';
        }
    }
    
    //document.getElementById("startBtn").addEventListener("click", function(){GoToGameMode()});