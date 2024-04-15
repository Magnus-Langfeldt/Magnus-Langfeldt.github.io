let btnEl = document.getElementById('btnEl')
let riddleEl = document.getElementById('riddle')
let inputEl = document.getElementById('inputEl')
let imgEl = document.querySelectorAll("img")
let quizContainerEl = document.querySelector('.quiz-container')
let questionContainerEl = document.querySelector('.question-container')
let refreshKnapp = document.getElementById ('refresh-knapp')

btnEl.addEventListener('click', questions)
refreshKnapp.addEventListener('click', sjekkSvar)

let data = []
let poeng = 0
let i = 0
let j = 0

async function getRiddle(){
    let url = "https://the-trivia-api.com/v2/questions"
    console.log(url)

    let response = await fetch(url)
    console.log(response)

    data = await response.json()
    console.log(data)
    questions()
}

function questions(){
    if (j===3 || i===10) {
        gameOver()
        return
    }
    if (i===9) {
        btnEl.innerHTML = "Fullfør Quizen!"
    }
    document.querySelector("h3").innerHTML = `${i+1}/10`

    let categoryEl = data[i]

    document.getElementById("difficulty").innerHTML = `Difficulty: ${categoryEl["difficulty"]}`
    // Lager spørsmålsobjekt

    let question = {
        query: categoryEl["question"].text,
        options: categoryEl["incorrectAnswers"],
        solution: categoryEl["correctAnswer"]
    }

    console.log(question)

    console.log(`Riktig svar: ${question.solution}`)

    // Tømmer HTML til quiz containeren
    // Henter spørsmålene
    let query = question.query

    // Henter alternativene
    let options = question.options

    // Henter fasit
    let solution = question.solution

    // setter svaret inn i alternativene
    options.splice(Math.floor(Math.random()*(options.length+1)), 0, solution)

    // Tømmer HTML til quiz containeren
    quizContainerEl.innerHTML = ''

    // Fyller quiz-containeren med spørsmålet
    quizContainerEl.innerHTML = `
    <div class="question-container" id="question">
        <h3>- ${query}</h3>
    </div> 
    `

    // Skriver kode som fyller inn alternativene i HTML
    // Henter elementet alternativene skal skrives i
    let questionEl = document.querySelector(`#question`)

    // Går gjennom alternativene
    for (let j=0;j<options.length;j++) {
        // Lager label element
        let labelEl = document.createElement('label')

        //Lager et input element  
        let radioEl = document.createElement('input')

        // setter typen til input elementet til radio
        radioEl.type = "radio"

        // sørger for at alle alternativene til spørsmålet er i samme gruppe
        radioEl.name = `q1`

        radioEl.style.marginRight = "10px"

        //setter verdi til elementet basert på om alternativet er lik fasit 
        if (options[j] === solution) {
            radioEl.value = "c" // correct
        }
        else {
            radioEl.value = "w" // wrong
        }

        // legger input-elementet med type radio i label elementet
        labelEl.appendChild(radioEl)
        
        // skriver alternativene til HTML
        labelEl.innerHTML += options[j]

        // legger label elementet inn i question elementet
        questionEl.appendChild(labelEl)
    }

    let radioEls = document.querySelectorAll('input[type="radio"]')

    radioEls[0].checked = true

    refreshKnapp.style.display = "block"
    btnEl.style.display = "none"
    quizContainerEl.style.backgroundColor = "whitesmoke"
    quizContainerEl.style.color = "black"

    i++
}

function sjekkSvar() {
    // Henter alle radio elementene 
    let radioEls = document.querySelectorAll('input[type="radio"]')

    // Traverserer radio elementene
    for (let i=0; i<radioEls.length; i++) {
        // Sjekker om alternativet er krysset av 
        if (radioEls[i].checked) {
            // Sjekker om alternativet er korrekt 
            if (radioEls[i].value==="c"){
                quizContainerEl.style.backgroundColor = "green"
                quizContainerEl.style.color = "white"
                poeng++
                console.log(`Du har ${poeng} poeng`)
            }
            else {
                quizContainerEl.style.backgroundColor = "darkred"
                quizContainerEl.style.color = "white"
                j++
                if (j>=1) {
                    imgEl[0].style.filter = "grayscale(0%)"
                    if(j>=2) {
                        imgEl[1].style.filter = "grayscale(0%)"  
                        if (j===3) {
                            imgEl[2].style.filter = "grayscale(0%)"
                            btnEl.innerHTML = "Game Over!"
                        }
                    }
                }
            }
        }
    }

    refreshKnapp.style.display = "none"
    btnEl.style.display = "block"
}

function gameOver() {
    quizContainerEl.innerHTML = `<h3 id="resultat">${kontroll()}</h3>
    <h3 id=kommentar>Trykk på knappen under for å prøve på nytt.`

    document.getElementById("resultat").style.padding = "30px"
    document.getElementById("resultat").style.paddingBottom = "0px"
    document.getElementById("kommentar").style.padding = "30px"
    document.getElementById("resultat").style.textShadow = "2px 2px 2px darkgreen"
    document.getElementById("resultat").style.fontSize = "50px"

    btnEl.innerHTML = "Prøv på nytt"

    btnEl.removeEventListener("click", questions)
    btnEl.addEventListener("click", function(){
        location.reload()
    })
}
function kontroll() {
    if (j===3) {
        console.log("Du tapte")
        document.getElementById("difficulty").innerHTML = 'Try harder next time!!!'

        return "Du Tapte!"
    }
    else if (i===10) {
        console.log("Du vant")
        document.getElementById("difficulty").innerHTML = 'Well done!!!!!'

        quizContainerEl.style.backgroundColor = "green"
        quizContainerEl.style.color = "white"

        return `Du har kommet gjennom alle spørsmålene! Du klarte ${poeng} av 10 spørsmål!`
    }
}

getRiddle()