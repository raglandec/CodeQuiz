$(document).ready(function () {

    // removes "start" button once we click it to start the quiz and loads the first question
    $("#start").on("click", function () {
        $("#start").remove();
        quiz.loadQuestion();
    })
    
    // click event for clicking the answer-key buttons
    $(document).on("click", ".answer-button", function (e) {
        quiz.clicked(e);
    })

    // click event for resetting the quiz
    $(document).on("click", "#reset", function () {
        quiz.reset();
    })

    //create and array of objects for the questions and answers/correct answers
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

    // object of quiz
    var quiz = {
        // properties 
        questions: questions, // call upon the question array
        currentQuestion: 0, // what question we are currently on
        counter: 30, // how many seconds per question
        correct: 0, // keeps track of how many correct answers
        incorrect: 0, // keeps track of incco
        unanswered: 0, // keeps track of how many questions we didn't answer

        countdown: function () { // draws upon on the counter
            quiz.counter--; // starts the timer
            $("#counter").html(quiz.counter); // display the counter from html decreasing
            if (quiz.counter <= 0) { // condition once the timer <= 0, calls the timeeUp method
                console.log("Your time is up!");
                quiz.timeUp();
            }
        },
        // loads the question onto the page; first step after I setup the countdown() method
        loadQuestion: function () {
            timer = setInterval(quiz.countdown, 1000);
            $("#subwrapper").html("<h2> REMAINING TIME <span id='counter'>30</span> Seconds</h2>");
            $("#subwrapper").append("<h2>" + questions[quiz.currentQuestion].question + "<h2>");
            for (i = 0; i < questions[quiz.currentQuestion].answers.length; i++) {
                $("#subwrapper").append('<button class="answer-button" id= "button- ' + i + '"data-name="' + questions[quiz.currentQuestion].answers[i] + '">' + questions[quiz.currentQuestion].answers[i] + '</button>');
                // spacing is imperative when making the data name element for tying the correct answer with the correct button
            }
        },
        // method for going to the next question
        nextQuestion: function () {
            quiz.counter = 30; // restarts the counter
            $('#counter').html(quiz.counter);
            quiz.currentQuestion++;
            quiz.loadQuestion();
        },

        // method for the timer ending
        timeUp: function () {
            clearInterval(timer);
            quiz.unanswered++;
            $("#subwrapper").html("<h2>OUT OF TIME!</h2>");
            $("#subwrapper").append("<h3>The Correct Answer Was: " + questions[quiz.currentQuestion].correctAnswer + "</h3>");
            // create loop for as long as there is another question, the quiz will go on, other go to results
            if (quiz.currentQuestion == questions.length - 1) {
                setTimeout(quiz.results, 3 * 1000);
            } else {
                setTimeout(quiz.nextQuestion, 3 * 1000);
            }
        },

        // method for showing the result page
        results: function () {
            clearInterval(timer);
            $("#subwrapper").html("<h2>Quiz Over!</h2>");
            $("#subwrapper").append("<h3>Correct: " + quiz.correct + "</h3>");
            $("#subwrapper").append("<h3>Incorrect: " + quiz.incorrect + "</h3>");
            $("#subwrapper").append("<h3>Unanswered:  " + quiz.unanswered + "</h3>");
            // adds new result button to restart the quiz
            $("#subwrapper").append("<button id='reset'> RESET </button>")
        },

        // method for clicking the answer key buttons
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
            $("#subwrapper").html("<h2>Good Job!</h2>");
            // create loop for as long as there is another question, the quiz will go on, other go to results
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
            $("#subwrapper").html("<h2>Maybe Next Time!</h2>");
            $("#subwrapper").append("<h3>The correct answer was: " + questions[quiz.currentQuestion].correctAnswer + "</h3>");
            // create loop for as long as there is another question, the quiz will go on, other go to results
            if (quiz.currentQuestion == questions.length - 1) {
                setTimeout(quiz.results, 3 * 1000);
            } else {
                setTimeout(quiz.nextQuestion, 3 * 1000);
            }
        },

        // method for resetting the quiz
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