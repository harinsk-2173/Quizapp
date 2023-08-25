const questions = [
    {
        question: 'What does ありがとう mean ?',
        answers: [
            {text: 'Sorry',correct: false}, 
            {text: 'Thankyou',correct: true},
            {text: 'Good',correct: false},
            {text: 'Bye',correct: false}
        ]
    },
    {
        question: 'Select the correct word for COLLEGE in japanese.',
        answers: [
            {text: 'がっこう',correct: false}, 
            {text: 'おてら',correct: false},
            {text: 'だいがく',correct: true},
            {text: 'トイレ',correct: false}
        ]
    },
    {
        question: 'Does はし means bridge or chopsticks ?',
        answers: [
            {text: 'Chopsticks',correct: false}, 
            {text: 'Bridge',correct:false },
            {text: 'Both',correct: true},
            {text: 'None',correct: false}
        ]
    },
    {
        question: 'Pick the odd-one out ?',
        answers: [
            {text: 'ぼうし',correct: true}, 
            {text: 'あかい',correct: false},
            {text: 'しろい',correct: false},
            {text: 'くろい',correct: false}
        ]
    },
    {
        question: 'What does おげんき です か translate to ?',
        answers: [
            {text: 'What is your name ?',correct: false}, 
            {text: 'How are you ?',correct: true},
            {text: 'What is your age ?',correct: false},
            {text: 'All of the above',correct: false}
        ]
    },
    {
        question: 'かぞく translates to FAMILY. True or False ?',
        answers: [
            {text: 'False',correct: false}, 
            {text: 'True',correct: true}
        ]
    }
];
const questionElement=document.getElementById('question')
const answerButtons=document.getElementById('answer-btns')
const nextButton=document.getElementById('next-btn')

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1
    questionElement.innerHTML=questionNo+'. '+currentQuestion.question

    currentQuestion.answers.forEach(answer =>{
       const button=document.createElement('button')
       button.innerHTML=answer.text 
       button.classList.add('btn')
       answerButtons.appendChild(button)
       if (answer.correct){
        button.dataset.correct=answer.correct
       }
       button.addEventListener('click',selectAnswer)
    })
}

function resetState(){
    nextButton.style.display='none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect=selectedBtn.dataset.correct==='true'
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==='true'){
            button.classList.add('correct')
        }
        button.disabled=true;
    })
    nextButton.style.display='block'
}

function showScore(){
    resetState();
    questionElement.innerHTML='You scored '+score+' out of '+questions.length;
    nextButton.innerHTML='Attempt again'
    nextButton.style.display='block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz();
  