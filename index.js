// Questions for this quiz were taken fro: https://yourbrainmatters.org.au/node/5201/take?quizkey=24f80c4fcf29b8b5df991d67f3c56eb4
const flashCards = [
    {
        question: "The first sheep was successfully cloned in 1996, what was the sheep’s name?",
        answer: "Dolly",
        options: [
            "Peggy",
            "Donna"
        ]
    },
    {
        question: "In what year was the search engine “Google” founded?",
        answer: "1998",
        options: [
            "1995",
            "1999"
        ]
    },
    {
        question: "In what year was Nelson Mandela released from prison and became the leader of the African National Congress?",
        answer: "1990",
        options: [
            "1991",
            "1992"
        ]
    },
    {
        question: "What actor starred and directed the cult movie \“Reality Bites\"?",
        answer: "Ben Stiller",
        options: [
            "Tom Cruise",
            "Will Ferrell"
        ]
    },
    {
        question: "How many Oscars did the film Titanic win??",
        answer: "11",
        options: [
            "10",
            "12"
        ]
    },
    {
        question: "What song had the most weeks at number one during the 90’s on Australian charts?",
        answer: "Gangta’s Paradise – Coolio",
        options: [
            "I will do anything for love (But I Won’t Do That) – Meatloaf",
            "I will always love you – Whitney Houston"
        ]
    },
    {
        question: "What year did the sitcom Friends screen to air??",
        answer: "1994",
        options: [
            "1995",
            "1996"
        ]
    },
    {
        question: "Who won the Men’s final at Wimbledon in 1993?",
        answer: "	Pete Sampras",
        options: [
            "Boris Becker",
            "Andre Agassi"
        ]
    },
    {
        question: "Who lit the Olympic torch at the opening ceremony in the 1996 summer Olympics?",
        answer: "Muhammad Ali",
        options: [
            "Michael Jordon",
            "Ben Johnson"
        ]
    },
    {
        question: "The lyrics “But I'm a million different people from one day to the next “are featured in which hit song released in 1997?",
        answer: "Bittersweet Symphony – The Verve",
        options: [
            "Wannabe – Spice Girls",
            "Torn – Natalie Imbruglia"
        ]
    }
];

const answerScore = {};

$(function () {
    answerScore.myScore = 0;
    var $answerValue = 0;
    var flashCardsCopy = [...flashCards]

    function arrayLength(array) {
        let arrayLen = array.length;
        return arrayLen;
    }

    function quesAnsSelector(array) {
        const randomNum = Math.floor(Math.random() * array.length)
        const selection = array[randomNum];
        array.splice(randomNum, 1)
        return selection;
    }

    const shuffleAnswers = (option1, option2) => {
        const arrayOptions = Object.values(option1);
        arrayOptions.push(option2);
        arrayOptions.sort();
        return arrayOptions;
    }

    function gettingQandA(param1) {
        const quesAnsSet = quesAnsSelector(param1)
        const question = quesAnsSet.question;
        const answer = quesAnsSet.answer;
        const answerOptions = shuffleAnswers(quesAnsSet.options, answer);
        $('#question').text(question)
        $('#option1').text(answerOptions[0]);
        $('#option2').text(answerOptions[1]);
        $('#option3').text(answerOptions[2]);
        $('input[name="answerOptions"]').prop('checked', false);
        $actualAnswer = quesAnsSet.answer;
    }

    function correctAnswerAction() {
        answerScore.myScore = answerScore.myScore + 1;
        ($('input[name=answerOptions]:checked').parent('label')).addClass('green-background')
    }

    function incorrectAnswerAction() {
        ($('input[name=answerOptions]:checked').parent('label')).addClass('red-background')
    }

    function answerMatch(selectedOption, correctAnser) {
        if (selectedOption === correctAnser) {
            correctAnswerAction();
            return `<p class = "scoreDesc">Your score is ${answerScore.myScore}</p>`
        } else {
            incorrectAnswerAction();
            return `<p class = "scoreDesc">Your score is ${answerScore.myScore}</p>`
        }
    }

    function resetGame() {
        flashCardsCopy = [...flashCards]
        location.reload();
        $('#submitBtn').attr('disabled', true)
    }

    function removeAllBackground() {
        $('input[type=radio]').next().removeClass('yellow-background');
        $('label').removeClass('green-background');
        $('label').removeClass('red-background');
    }

    function gameOver() {
        alert(`Quiz Over! Your score is ${answerScore.myScore}`)
        location.reload();
    }

    function nextQuestion() {
        if (arrayLength(flashCardsCopy) > 0) {
            gettingQandA(flashCardsCopy);
            $('input[name="answerOptions"]').prop('checked', false);
            $("input[type=radio]").removeAttr('disabled');
            removeAllBackground();
        } else {
            gameOver();
        }
    }

    function submitAnswer() {
        $('input[type=radio]').next().removeClass('yellow-background');
        $("input[type=radio]").attr('disabled', true);
        score = answerMatch($answerValue, $actualAnswer);
        $('.scoreDesc').remove();
        $('#score').append(score);

    }

    gettingQandA(flashCardsCopy);

    $('input[type=radio]').on('click', function () {
        $('input[type=radio]').next().removeClass('yellow-background')
        $(this).next().addClass('yellow-background')
        $('#submitBtn').removeAttr('disabled')
        $answerValue = $('input[name=answerOptions]:checked').next().html();
    })

    $('#quizSection').on('submit', function (e) {
        e.preventDefault();
        if ($("input[type=radio]:checked").length === 0) {
            alert('Hey you forgot to pick an answer!');
            return;
        }
        submitAnswer();
        setTimeout(nextQuestion, 1000);
    })

    $('#skipBtn').on('click', nextQuestion)
    $('#resetBtn').on('click', resetGame)

})




