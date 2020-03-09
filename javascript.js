$(document).ready(function () {

    $("#start").on("click", function () {
        $("#start").remove();
        quiz.loadQuestion();
    })

    $(document).on("click", ".answer-button", function (e) {
        quiz.clicked(e);
    })

    $(document).on("click", "#reset", function () {
        quiz.reset();
    })

    var questions = [{
        question: "Which is NOT a programming language that we have learned?",
        answers: ["HTML", "CSS", "Javascript", "Java"],
        correctAnswer: "Java"
    }, {
        question: "A set of statements that performs a task or calculates a value is a _____________ .",
        answers: ["method", "class", "function", "variable"],
        correctAnswer: "function"
    }, {
        question: "Actions that can be performed on objects are called __________.",
        answers: ["classes", "strings", "methods", "variables"],
        correctAnswer: "methods"
    }, {
        question: "A ________ is a blueprint or prototype that defines the variables and the methods.",
        answers: ["function", "class", "string", "boolean"],
        correctAnswer: "class"
    }, {
        question: "A method used to generate a random number is __________.",
        answers: ["Math.pow()", "Math.max()", "Math.random()", "Math.sqrt()"],
        correctAnswer: "Math.random()"
    }
    ];

    var quiz = {

        questions: questions,
        currentQuestion: 0,
        counter: 30,
        correct: 0,
        incorrect: 0,
        unanswered: 0,

        countdown: function () {
            quiz.counter--;
            $('#counter').html(quiz.counter);
            if (quiz.counter <= 0) {
                console.log("Time Up!");
                quiz.timeUp();
            }
        },
        // loads the question onto the page; first step after I setup the countdown() method
        loadQuestion: function () {
            timer = setInterval(quiz.countdown, 1000);
            $("#subwrapper").html("<h2> TIME REMAINING <span id='counter'> 30 </span> Seconds</h2>");
            $("#subwrapper").append("<h2>" + questions[quiz.currentQuestion].question + "<h2>");
            for (i = 0; i < questions[quiz.currentQuestion].answers.length; i++) {
                $("#subwrapper").append('<button class="answer-button" id= "button- ' + i + ' " data-name= " ' + questions[quiz.currentQuestion].answers[i] + ' " > ' + questions[quiz.currentQuestion].answers[i] + ' </button>');
            }
        },

        nextQuestion: function () {
            quiz.counter = 30;
            $('#counter').html(quiz.counter);
            quiz.currentQuestion++
            quiz.loadQuestion();
        },

        timeUp: function () {
            clearInterval(timer);
            quiz.unanswered++;
            $("#subwrapper").html("<h2>OUT OF TIME!</h2>");
            $("#subwrapper").append("<h3>The Correct Answer Was: " + questions[quiz.currentQuestion].correctAnswer + "</h3>");
            if (quiz.currentQuestion == questions.length - 1) {
                setTimeout(quiz.results, 3 * 1000);
            } else {
                setTimeout(quiz.nextQuestion, 3 * 1000);
            }
        },

        results: function () {
            clearInterval(timer);
            $("#subwrapper").html("<h2>ALL DONE!</h2>");
            $("#subwrapper").append("<h3>Correct: " + quiz.correct + "</h3>");
            $("#subwrapper").append("<h3>Incorrect: " + quiz.incorrect + "</h3>");
            $("#subwrapper").append("<h3>Unanswered:  " + quiz.unanswered + "</h3>");
            // new update 
            $("#subwrapper").append("<button id='reset'> RESET </button>")
        },

        clicked: function (e) {
            clearInterval(timer);
            if ($(e.target).data("name") == questions[quiz.currentQuestion].correctAnswer) {
                quiz.answeredCorrectly();
            } else {
                quiz.answeredIncorrectly();
            }
        },

        answeredCorrectly: function () {
            console.log("YASSSSS!");
            clearInterval(timer);
            quiz.correct++;
            $("#subwrapper").html("<h2>YASSSS!</h2>");
            if (quiz.currentQuestion == questions.length - 1) {
                setTimeout(quiz.results, 3 * 1000);
            } else {
                setTimeout(quiz.nextQuestion, 3 * 1000);
            }
        },

        answeredIncorrectly: function () {
            console.log("Nah...");
            clearInterval(timer);
            quiz.incorrect++;
            $("#subwrapper").html("<h2>Nah...</h2>");
            $("#subwrapper").append("<h3>The correct answer was: " + questions[quiz.currentQuestion].correctAnswer + "</h3>");
            if (quiz.currentQuestion == questions.length - 1) {
                setTimeout(quiz.results, 3 * 1000);
            } else{
                setTimeout(quiz.nextQuestion, 3 * 1000);    
            }
        },

        reset: function () {
            quiz.currentQuestion = 0;
            quiz.counter = 0;
            quiz.correct = 0;
            quiz.incorrect = 0;
            quiz.unanswered = 0;
            quiz.loadQuestion();
        },
    }
})