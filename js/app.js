
//this will be used to set up the roulette table board, allowing the player the place their bets and spin

/*----- constants -----*/ 
const numOrder = [
    {num:0, color:'green'},
    {num:3, color:'red'},
    {num:6, color:'black'},
    {num:9, color:'red'},
    {num:12, color:'red'},
    {num:15, color:'black'},
    {num:18, color:'red'},
    {num:21, color:'red'},
    {num:24, color:'black'},
    {num:27, color:'red'},
    {num:30, color:'red'},
    {num:33, color:'black'},
    {num:36, color:'red'},
    {num:2, color:'black'},
    {num:5, color:'red'},
    {num:8, color:'black'},
    {num:11, color:'black'},
    {num:14, color:'red'},
    {num:17, color:'black'},
    {num:20, color:'black'},
    {num:23, color:'red'},
    {num:26, color:'black'},
    {num:29, color:'black'},
    {num:32, color:'red'},
    {num:35, color:'black'},
    {num:1, color:'red'},
    {num:4, color:'black'},
    {num:7, color:'red'},
    {num:10, color:'black'},
    {num:13, color:'black'},
    {num:16, color:'red'},
    {num:19, color:'red'},
    {num:22, color:'black'},
    {num:25, color:'red'},
    {num:28, color:'black'},
    {num:31, color:'black'},
    {num:34, color:'red'},
];

// class rouletteBoard {
//     constructor(game) {
//         this.selection = selection;
//         this.bet = bet;
//         this.payout = payout;
//         this.chips = chips
//     };
// };

class Player {
    constructor() {
        this.bets = []
        this.money = 100
    }
};

const player = new Player()
let vegasNum = null;

/*----- app's state (variables) -----*/ 

let redBet = null;


let pastNumbers =[]


/*----- cached element references -----*/ 

const board = document.querySelector('.board')
const numbercontainer = document.querySelector('.number-container')
const zerocontainer = document.querySelector('.zero-container')
const zerodiv = document.createElement('div')
zerodiv.innerText = numOrder[0].num
zerodiv.className = `green num`
zerocontainer.append(zerodiv)

for (let i = 1; i < numOrder.length; i++){
    const div = document.createElement('div')
    div.innerText = numOrder[i].num
    div.className = `${numOrder[i].color} num ${numOrder[i].num}`
    numbercontainer.append(div)
};


const text = ["1-18", "EVEN", "<span class='red-diamond'>&#9830;</span>", "<span class='black-diamond'>&#9830;</span>", "ODD", "19-36"]

for(let i = 0; i < 6; i++) {
    const div = document.createElement('div')
    div.className = 'bottom-bet'
    if(i === 2 || i === 3) {
        div.innerHTML = text[i]
    } else {
        div.innerText = text[i]
    }
    // div.className = text[i]
    numbercontainer.append(div)
};

/*----- event listeners -----*/ 

document.querySelector('#spin-wheel').addEventListener('click', () => {
    vegasNum = numOrder[Math.floor(Math.random() * numOrder.length)]
    console.log(vegasNum)
    pastNumbers.push(vegasNum.num)
    betResults()
    logHistory()
});

document.querySelector('.colors').addEventListener('click', event => {
    console.log(event.target.innerText)
    const color = event.target.innerText.toLowerCase()
    if(player.bets.includes(color)){
        return 
    }
player.bets.push(color)
player.money -= 5

})

board.addEventListener('click', event => {
    const num = Number(event.target.innerText)
    if(player.bets.includes(num)) {
        return 
    }
    player.bets.push(num)
    player.money -= 5
    console.log(player)
    updateBets()
    // placeBets = Number(event.target.innerText)
    // console.log(placeBets)
});

function placeChip() {
    for(let i = 0; i < player.bets.length; i++) {
        const num = document.getElementsByClassName(`${player.bets[i]}`)
        return num
    }
}

/*----- functions -----*/

makeRow()

function makeRow() {
    for(let i = 0; i < 4; i++) {
        const div = document.createElement('div')
        console.log(i)
        if(i === 3) {
            div.className = 'break'
            numbercontainer.append(div)
            return 
        } else {
            const text = i === 0 ? "1st 12" : i === 1 ? "2nd 12" : "3rd 12"
            div.className = 'bottom-bet'
            div.innerText = text
            numbercontainer.append(div)
        }
    }

};

function updateBets () {
    const betsDiv = document.querySelector('.bets')
    betsDiv.innerText = ''
    player.bets.forEach(e => betsDiv.innerText += ` ${e} `)
};

function betResults(){
    if (player.bets.includes(vegasNum.num)) {
        player.money += 35 * 5
        player.bets = []
        console.log("You are a winner!!!")
    } else if(player.bets.includes(vegasNum.color)) {
        player.money += 2 * 5
        player.bets = []
        console.log("You are a winner!!")
    } else {
        console.log("Sorry, better luck next time.")
        player.bets = []
    }
    removeBets()
};

function removeBets() {
    const nums = document.querySelectorAll('.active')
    nums.forEach(e => {
        console.log(e)
    })
};

function logHistory() {
    const numHistory = document.querySelector('#num-history')
    numHistory.innerText = 'History: '
    pastNumbers.forEach((pastNumber)=>{numHistory.innerText += ` ${pastNumber}`})
        
}


//------------------------------------------------------------------------------------------------------//
//creating a function that places the players bet(s) before they are able to select spin the wheel btn
// const placeBets ={


// }

// const player = new Player()
// let vegasNum = null;

// document.querySelector('#spin-wheel').addEventListener('click', () => {
//     vegasNum = numOrder[Math.floor(Math.random() * numOrder.length)]
//     console.log(vegasNum)
//     betResults()
// })

// const player = {
//     player: null,
//     chips: 100,
// }
// let placeBets = null
// const board = document.querySelector('.board')

// const numbercontainer = document.querySelector('.number-container')
// const zerocontainer = document.querySelector('.zero-container')
// const zerodiv = document.createElement('div')
// zerodiv.innerText = numOrder[0].num
// zerodiv.className = `green num`
// zerocontainer.append(zerodiv)


// for (let i = 1; i < numOrder.length; i++){
//     const div = document.createElement('div')
//     div.innerText = numOrder[i].num
//     div.className = `${numOrder[i].color} num ${numOrder[i].num}`
//     numbercontainer.append(div)
// }

// makeRow()

// function makeRow() {
//     for(let i = 0; i < 4; i++) {
//         const div = document.createElement('div')
//         console.log(i)
//         if(i === 3) {
//             div.className = 'break'
//             numbercontainer.append(div)
//             return 
//         } else {
//             const text = i === 0 ? "1st 12" : i === 1 ? "2nd 12" : "3rd 12"
//             div.className = 'bottom-bet'
//             div.innerText = text
//             numbercontainer.append(div)
//         }
//     }

// }



//const text = ["1-18", "EVEN", "<span class='red-diamond'>&#9830;</span>", "<span class='black-diamond'>&#9830;</span>", "ODD", "19-36"]


// for(let i = 0; i < 6; i++) {
//     const div = document.createElement('div')
//     div.className = 'bottom-bet'
//     if(i === 2 || i === 3) {
//         div.innerHTML = text[i]
//     } else {
//         div.innerText = text[i]
//     }
//     // div.className = text[i]
//     numbercontainer.append(div)
// }




// document.querySelector('#place-bets').addEventListener('click', () => {
//     placeBets = board.event;
// })

// function updateBets () {
//     const betsDiv = document.querySelector('.bets')
//     betsDiv.innerText = ''
//     player.bets.forEach(e => betsDiv.innerText += ` ${e} `)
// }

//let redBet = null;

// document.querySelector('.colors').addEventListener('click', event => {
//     console.log(event.target.innerText)
//     const color = event.target.innerText.toLowerCase()
//     if(player.bets.includes(color)){
//         return 
//     }
// player.bets.push(color)
// player.money -= 5

// if(vegasNum.color.inlcudes('red'))

// })

// board.addEventListener('click', event => {
//     const num = Number(event.target.innerText)
//     if(player.bets.includes(num)) {
//         return 
//     }
//     player.bets.push(num)
//     player.money -= 5
//     console.log(player)
//     updateBets()
//     // placeBets = Number(event.target.innerText)
//     // console.log(placeBets)
// })




//lines 87-92 are meant to produce the outcome of the bet in the console
// function betResults(){
//     if (player.bets.includes(vegasNum.num)) {
//         player.money += 35 * 5
//         player.bets = []
//         console.log("You are a winner!!!")
//     } else if(player.bets.includes(vegasNum.color)) {
//         player.money += 2 * 5
//         player.bets = []
//         console.log("You are a winner!!")
//     } else {
//         console.log("Sorry, better luck next time.")
//         player.bets = []
//     }
//     removeBets()
// }

// function removeBets() {
//     const nums = document.querySelectorAll('.active')
//     nums.forEach(e => {
//         console.log(e)
//     })
// }



// the code below is creating the divs for the board, allow the number to be clicked, moving up to try and solve issue of
//producing win/lose outcome in console
// numOrder.forEach(ele => {
//     const div = document.createElement('div')
//     div.innerText = ele.num
//     div.className = ele.color
//     board.append(div)
// })

// either map out game to show a roulette wheel spinning with ball
// or have the numbers in order shown 1 at a time as the wheel spins
