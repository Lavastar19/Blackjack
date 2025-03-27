function RUN(){
const suit = ["Spades", "Hearts", "Diamonds", "Clubs"]
const number = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
const NumVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
var DrawnCards = []
var PlayerValue = 0
var OppValue = 0
var winner = undefined
var crdLog = []
var Keep = true

function bttnDisable(){
  document.getElementById("HitBttn").removeEventListener("click", HIT)
  document.getElementById("StandBttn").removeEventListener("click", STAND)
  document.getElementById("StandBttn").classList.add("GreyOut")
  document.getElementById("HitBttn").classList.add("GreyOut")
}

function reset(){
  if(winner == "tie"){
    document.body.innerHTML = `<h1>It's a tie!</h1>`
  }else{
    if(OppValue > 21){
      OppValue += "(bust)"
    }else if(PlayerValue > 21){
      PlayerValue += "(bust)"
    }
  document.body.innerHTML = `
  <h1>${winner} wins!</h1>
  <br>
  <br>
  <h2>The score: ${PlayerValue} to ${OppValue}</h2>`
}
  setTimeout(() => {
    document.body.innerHTML = `
    <h2>Player hand:</h2>
    <div id="PHand"></div>
    <div id="PVal"></div>
    <button id="HitBttn">Hit</button>
    <button id="StandBttn">Stand</button>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h2>Bot hand:</h2>
    <div id="BHand"></div>
    <div id="BVal"></div>
    `
    RUN()
  }, 2500)
}

function convert(Num, Bot){
  if(Bot == true && Keep == true){
    crdLog = []
    Keep = false
   }
   var a = number.indexOf(Num)
   Num = NumVal[a]
   crdLog.push(Num)
      if(Num == 1){
        if(crdLog.length > 0){
        var Lngth = crdLog.length - 1
        var b = 0
        var Rest = 0
        while(b < Lngth){
          Rest += crdLog[b]
          b += 1
        }
        if(Rest + 11 > 21){
          Num = 1
        } else{
          Num = 11
          crdLog.length - 1
          crdLog.push(Num)
        }
        }else{
        var b = 0
        var Rest = 0
        while(b < Lngth){
          Rest += crdLog[b]
          b += 1
        }
        if(Rest + 11 > 21){
          Num = 1
        } else{
          Num = 11
          crdLog.length - 1
          crdLog.push(Num)
        }
      }
        }
        return Num
      }

function draw(Opp){
  var cardSuit = suit[Math.floor(Math.random() * suit.length)]
  var cardNum = number[Math.floor(Math.random() * number.length)]
  var CARD = cardNum + " of " + cardSuit
  
  while(DrawnCards.includes(CARD)){
    var cardSuit = suit[Math.floor(Math.random() * suit.length)]
    var cardNum = number[Math.floor(Math.random() * number.length)]
    var CARD = cardNum + " of " + cardSuit
  }
  DrawnCards.push(CARD)
  if(Opp == true){
    var Value = convert(cardNum, true)
  }else{
    var Value = convert(cardNum, false)
  }

  if(Opp == false){
    PlayerValue += Value
  } else{
    OppValue += Value
  }

  return {cardSuit, cardNum, CARD}
}

var Playerhand = draw(false).CARD + ", " + draw(false).CARD
var Opphand = draw(true).CARD + ", " + draw(true).CARD
document.getElementById("PHand").innerHTML = Playerhand
document.getElementById("PVal").innerHTML = PlayerValue
document.getElementById("BHand").innerHTML = Opphand
document.getElementById("BVal").innerHTML = OppValue
if(PlayerValue == 21){
bttnDisable()
PlayerValue += "(blackjack!)"
document.getElementById("PVal").innerHTML = PlayerValue
} else if(OppValue == 21){
OppValue += "(blackjack!)"
document.getElementById("BVal").innerHTML = PlayerValue
}

function HitStand(Hit){
    if(Hit == true){
      Playerhand += ", " + draw(false).CARD
      if(PlayerValue > 21){
         winner = "Bot"
         bttnDisable()
         setTimeout(reset, 1500)
      }
    }else{
      while(OppValue < 16){
          Opphand += ", " + draw(true).CARD
          document.getElementById("BHand").innerHTML = Opphand
          document.getElementById("BVal").innerHTML = OppValue
          if(OppValue > 21){
            winner = "Player"
            bttnDisable()
            setTimeout(reset, 1500) 
         }
      }
      if(PlayerValue > OppValue || winner == "Player"){
        if(PlayerValue > OppValue){
        winner = "Player"
        bttnDisable()
        setTimeout(reset, 1500)
        }
      } else{
        winner = "Bot"
        bttnDisable()
        setTimeout(reset, 1500)
      }
    }
    document.getElementById("PHand").innerHTML = Playerhand
    document.getElementById("PVal").innerHTML = PlayerValue
    if(PlayerValue == 21){
      bttnDisable()
      PlayerValue += "(blackjack!)"
      document.getElementById("PVal").innerHTML = PlayerValue
      } else if(OppValue == 21){
      OppValue += "(blackjack!)"
      document.getElementById("BVal").innerHTML = PlayerValue
      }
}
function HIT(){
setTimeout(() => {HitStand(true)})
}
function STAND(){
setTimeout(() => {HitStand(false), 700})
}
// above code is there because I can't remove the event listener later because of the anonymous function
document.getElementById("HitBttn").addEventListener("click", HIT)
document.getElementById("StandBttn").addEventListener("click", STAND)
}
RUN()
