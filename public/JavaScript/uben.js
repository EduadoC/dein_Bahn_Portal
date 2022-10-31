
window.onload = function(){
    QuestionMaker();
    MakeItGreen(buttonA);
    HeaderController();
}
const buttonA = document.getElementById('answerA');
const buttonB = document.getElementById('answerB');
const buttonC = document.getElementById('answerC');
const buttonD = document.getElementById('answerD');

const confirmBtn = document.getElementById("confirmBtn");

var wrongCounter = 0;
var rightCounter = 0;
var questionCounter = 1; 

const questionArray = [
    "Am Signal Hp 0 oder am gestörten Lichthauptsignal ohne schriftlichen Befehl vorbeifahren.",
    "Die Fahrstraße führt in die angezeigte Richtung.",
    "Richtungsanzeiger (Zs 2) erwarten.",
    "Die durch die Kennziffer angezeigte Geschwindigkeit darf vom Signal ab im anschließenden Weichenbereich nicht überschritten werden.",
    "Geschwindigkeitsanzeiger (Zs 3) erwarten.",
    "Der Fahrweg führt in das Streckengleis entgegen der gewöhnlichen Fahrtrichtung.",
    "Am Signal Hp 0 oder am gestörten Lichthauptsignal ohne schriftlichen Befehl vorbeifahren! Weiterfahrt auf Sicht.",
    "Am Halt zeigenden oder gestörten Hauptsignal vorbeifahren, der Fahrweg führt in das Streckengleis entgegen der gewöhnlichen Fahrtrichtung.",
    "Nach dem zulässigen Vorbeifahren an dem Halt zeigenden oder gestörten Lichthauptsignal Halt vor dem Bahnübergang! Weiterfahrt nach Sicherung.",
    "Ende der Geschwindigkeitsbeschränkung.",
    "Am Halt zeigenden oder gestörten Hauptsignal auf mündlichen oder fernmündlichen Auftrag vorbeifahren.",
    "Fahrt in ein Stumpfgleis oder in ein Gleis mit verkürztem Einfahrweg.",
    "Das Halt zeigende Hauptsignal gilt nicht für Rangierabteilungen.",
    "Nachschieben einstellen.",
    "Halt für zurückkehrende Schiebelokomotiven und Sperrfahrten.",
    "Weiterfahrt für zurückkehrende Schiebelokomotiven und Sperrfahrten.",
    "Es folgt eine vorübergehende Langsamfahrstelle, auf der die angezeigte Geschwindigkeit nicht überschritten werden darf.",
    "Anfang der vorübergehenden Langsamfahrstelle.",
    "Ende der vorübergehenden Langsamfahrstelle.",
    "Es folgt eine ständige Langsamfahrstelle, auf der die angezeigte Geschwindigkeit nicht überschritten werden darf.",
    "Die auf der Geschwindigkeitstafel (Lf 4) angezeigte Geschwindigkeitsbeschränkung muss durchgeführt sein.",
    "Ein Geschwindigkeitssignal (Lf 7) ist zu erwarten.",
    "Die angezeigte Geschwindigkeit darf vom Signal ab nicht überschritten werden.",
    "Halt! Fahrverbot.",
];
const answerArray = [
    "Zs1", "Zs2", "Zs2v", "Zs3", "Zs3v", "Zs6", "Zs7", "Zs8", "Zs9", "Zs10", "Zs12", "Zs13", "Zs103", "Ts1", "Ts2",
    "Ts3", "Lf1", "Lf2", "Lf3", "Lf4", "Lf5", "Lf6", "Lf7", "Sh0"
];

const buttonArray = [buttonA, buttonB, buttonC, buttonD];

buttonA.addEventListener('click', function() {MakeItGreen(buttonA)});
buttonB.addEventListener('click', function() {MakeItGreen(buttonB)});
buttonC.addEventListener('click', function() {MakeItGreen(buttonC)});
buttonD.addEventListener('click', function() {MakeItGreen(buttonD)});

confirmBtn.addEventListener("click", function() {ConfirmFunction()});

//change the color of the buttons(p) by clicking
function MakeItGreen(button){
    if(button.style.backgroundColor == 'white'){
        CheckForSelections();
        button.style.backgroundColor = 'green';
    }else {
        button.style.backgroundColor = 'white';
    }    
};

//makes all Elements white
function CheckForSelections(){
    buttonArray.forEach(element => {
        element.style.backgroundColor = 'white';
    });
}

//this is the question Object
let Question = {
   questionTxt: "",
   answerTxt: "",
   image: "", //remember to add here the img on the constructor
   questionConstructor: function(question, answer) {
        this.questionTxt = question;
        this.answerTxt = answer;
   }
}

//this function shows the question randomly
function QuestionMaker(){
    const randomNr = Math.floor(Math.random() * questionArray.length);
    const questionField = document.getElementById("questionTxtField");

    Question.questionConstructor(questionArray[randomNr], answerArray[randomNr]);

    questionField.innerText = Question.questionTxt;

    AnswersListMaker();
}

//this function shows the answer list
function AnswersListMaker() {
    var listOfAnswers = [
        Question.answerTxt,
        answerArray[Math.floor(Math.random() * answerArray.length)],
        answerArray[Math.floor(Math.random() * answerArray.length)],
        answerArray[Math.floor(Math.random() * answerArray.length)]
    ]

    shuffle(listOfAnswers);

    buttonArray[0].innerText = listOfAnswers[0];
    buttonArray[1].innerText = listOfAnswers[1];
    buttonArray[2].innerText = listOfAnswers[2];
    buttonArray[3].innerText = listOfAnswers[3];
     
}

//this function Randomize arrays
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
//check if the right answer is selected and if so call a new question and change the score
function ConfirmFunction() {  
    var rightIsSelected = false;
    for(var x = 0; x < buttonArray.length; x++){
        if (buttonArray[x].style.backgroundColor == "green" && buttonArray[x].innerText == Question.answerTxt){
            QuestionMaker(); //make a new Question
            CheckForSelections();//make all answer white again
            rightCounter++;
            questionCounter++;
            document.getElementById("_rightAnswerCounter").innerText = rightCounter;
            document.getElementById("_questionNummer").innerText = "Fragenummer: " + questionCounter;
            rightIsSelected = true;
        }
    };
    if(!rightIsSelected){
        wrongCounter++;
        document.getElementById("_wrongAnswerCounter").innerText = wrongCounter;
    }
}

function HeaderController(){
    const homeBtn = document.getElementById("homeBtn");
    const signoutBtn = document.getElementById("logoutBtn");

    homeBtn.addEventListener("click", () => {
        if (confirm("Bist du dir sicher?")) location.href = '/';    
    });
    signoutBtn.addEventListener('click', () => {
        if(confirm("Bist du dir sicher??")) location.href = '/logout';
    });
}
