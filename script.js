/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function resetQuiz(event){
    const result = document.querySelector("#result");
    result.classList.add('hidden');

    for(const box of boxes){
        box.addEventListener('click', select);
        box.classList.remove('opacity');
        box.querySelector('.checkbox').src = "./images/unchecked.png";
        box.classList.remove('selected')
    }

    for(const key in finalAnswers){
        delete finalAnswers[key];
    }

    console.log(finalAnswers);

}

function choosePersonality(){
    if(finalAnswers.one === finalAnswers.two || finalAnswers.one === finalAnswers.three)
        return finalAnswers.one;
    if(finalAnswers.two === finalAnswers.one || finalAnswers.two === finalAnswers.three)
        return finalAnswers.two;
    if(finalAnswers.three === finalAnswers.one || finalAnswers.three === finalAnswers.two)
        return finalAnswers.three;
    return finalAnswers.one;
}

function finalAnswersLenght(){
    let s = 0;
    for(const i in finalAnswers)
        s++;
    return s;
}

function addAnswer(selectedImg){
    finalAnswers[selectedImg.dataset.questionId] = selectedImg.dataset.choiceId;

    if(finalAnswersLenght() == 3){
        for(const box of boxes){
            box.removeEventListener('click', select);
        }

        const personality = choosePersonality();

        const result = document.querySelector('#result');
        result.querySelector('h1').textContent = RESULTS_MAP[personality].title;
        result.querySelector('p').textContent = RESULTS_MAP[personality].contents;
        result.classList.remove('hidden');

        const button = result.querySelector('#button');
        button.addEventListener('click', resetQuiz);
        
    }
}

function opacity(selectedImg){
    const selectedAnswer = selectedImg.dataset.choiceId;

    const answers = selectedImg.parentNode.querySelectorAll('div');

    for (const unselectedAnswer of answers){
        if(unselectedAnswer.dataset.choiceId !== selectedAnswer){
            unselectedAnswer.classList.add('opacity');
            unselectedAnswer.querySelector('.checkbox').src = './images/unchecked.png';
            unselectedAnswer.classList.remove('selected');
        }
    }
}

function select(event){
    const selectedImg = event.currentTarget;
    selectedImg.classList.add('selected');
    selectedImg.classList.remove('opacity')

    const check = selectedImg.querySelector('.checkbox');
    check.src = "./images/checked.png";

    opacity(selectedImg);
    addAnswer(selectedImg);
}

const finalAnswers = {};

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes)
{
    box.addEventListener('click', select);
}