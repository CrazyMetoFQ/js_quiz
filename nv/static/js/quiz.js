function getValue(s) {

    // gets value of element

    var x = document.getElementById(s);
    console.log(x.value);

    return x.value

}

function getQuestion() {

    // quiz args

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/q", false);
    xhttp.send();

    return JSON.parse(xhttp.responseText)

}

class question {

    constructor(q, opts, ans) {

        this.q = q;
        this.opts = opts;
        this.ans = ans;

        if (typeof(ans) == typeof(1)) {
            this.answer = opts[ans];
        } else if (typeof(ans) == typeof('') && opts.includes(ans)) {

            this.ans = opts.indexOf(ans);
            this.answer = ans;
        } else {
            this.answer = null;
        }

    }

    check(g_ans) {

        if (g_ans == self.answer) {

            return true

        } else {

            return false
        }
    }

}

q = new question("TITLE", [11, 21, 31, 41], 21)

function loadQuestion(q_title, opts_array) {

    let qt = document.querySelector("#question-title");

    let opt_text = document.querySelectorAll(".opt-text");
    let opt_opt = document.querySelectorAll(".opt-opt");

    qt.textContent = q_title;

    opt_text.forEach(function(element, index) {

        element.textContent = opts_array[index];
    });

    opt_opt.forEach(function(element, index) {

        element.value = opts_array[index];
    })

}


function loadAnswer(nm) {

    ql = `input[name=${nm}]:checked`;
    let ans = document.querySelector(ql).value;

    document.querySelector("#output").textContent = ans;

    return ans
}

function bind2opts() {

    let opt_opt = document.querySelectorAll(".opt-opt");

    opt_opt.forEach(function(element, index) {

        element.addEventListener("click",
            function() {
                loadAnswer("opts");
            })
    })


    let opts = document.querySelectorAll(".opt");
    // console.log(opts)

    opts.forEach(function(element, index) {

        element.addEventListener("click",
            function() {
                cbclr(element);
            })
    })

}

function cbclr(el) {

    let opts = document.querySelectorAll(".opt");

    opts.forEach(function(element, index) {
        element.style.color = "inherit";
        element.style.backgroundColor = "inherit";
    })

    el.style.color = 'slateblue';
    el.style.backgroundColor = 'lightgray';


}


function reloadQuestion() {

    let qs = getQuestion()

    let qt = qs[0][0][0];
    let opts = qs[0][0][1];
    let ans = qs[0][1];


    // console.log(qt)
    // console.log(opts)

    loadQuestion(qt, opts);

    bind2opts();
    // document.querySelector("#output").textContent = qs

    let q = new question(qt, opts, ans)
    return q

}


function checkAnswer() {

    console.log(q)
}


function sl() {

    console.log('click')
    navigator.clipboard.writeText("wodasdasdasdasdah");

}

function sl2() {

    window.open("http://google.com")

}


// function main_fnc() {

//     let q = reloadQuestion();
//     loadQuestion(q.q, q.opts)

//     bind2opts();
// }


// document.onload = main_fnc()


var q = reloadQuestion();
loadQuestion(q.q, q.opts)

bind2opts();