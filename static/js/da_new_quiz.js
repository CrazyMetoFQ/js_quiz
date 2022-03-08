// class question {

//     constructor(q, opts, ans) {

//         this.q = q;
//         this.opts = opts;
//         this.ans = ans;

//         if (typeof(ans) == typeof(1)) {
//             this.answer = opts[ans];
//         } else if (typeof(ans) == typeof('') && opts.includes(ans)) {

//             this.ans = opts.indexOf(ans);
//             this.answer = ans;
//         } else {
//             this.answer = null;
//         }

//     }

// }

function question(q, opts, ans) {

    // let q = q;
    // let opts = opts;
    // let ans = ans;

    if (typeof(ans) == typeof(1)) {
        let answer = opts[ans];
    } else if (typeof(ans) == typeof('') && opts.includes(ans)) {

        ans = opts.indexOf(ans);
        answer = ans;
    } else {
        answer = null;
    }

    return {
        "q": q,
        "opts": opts,
        "ans": ans,
        "answer": answer
    }

}


function getQuestion() {

    // quiz args

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/q", false);
    xhttp.send();

    return JSON.parse(xhttp.responseText)

}



function sl() {

    console.log('click')
    navigator.clipboard.writeText("wodasdasdasdasdah");

}

function sl2() {

    window.open("http://google.com")

}


function main_fnc() {

    let q = reloadQuestion();
    loadQuestion(q.q, q.opts)

    bind2opts();
}


// document.onload = main_fnc()


class quiz {


    constructor() {
        console.log("start");

        // q = this.reloadQuestion();
        // this.loadQuestion(q.q, q.opts);

        // bind2opts();

        this.q = question("TITLE", [11, 21, 31, 41], 21)

        this.qt = document.querySelector("#question-title");
        this.opt_text = document.querySelectorAll(".opt-text");
        this.opt_opt = document.querySelectorAll(".opt-opt");
        this.opts = document.querySelectorAll(".opt");

        this.nm = "opts";
        this.ql = `input[name=${this.nm}]:checked`;

        try {
            this.ans = document.querySelector(this.ql).value;
        } catch (err) {

        }

    }


    setVars() {

        this.qt = document.querySelector("#question-title");
        this.opt_text = document.querySelectorAll(".opt-text");
        this.opt_opt = document.querySelectorAll(".opt-opt");
        this.opts = document.querySelectorAll(".opt");

        this.nm = "opts";
        this.ql = `input[name=${this.nm}]:checked`;
        try {
            this.ans = document.querySelector(this.ql).value;
        } catch (err) {

        }
    }

    loadQuestion() {

        this.qt.textContent = this.q["q"];

        q = this.q

        this.opt_text.forEach(function(element, index) {

            element.textContent = q["opts"][index];
        });

        this.opt_opt.forEach(function(element, index) {

            element.value = q["opts"][index];
        })

        this.setVars();

    }


    reloadQuestion() {

        var qs = getQuestion()

        var qt = qs[0][0][0];
        var opts = qs[0][0][1];
        var ans = qs[0][1];


        // console.log(qt)
        // console.log(opts)

        this.loadQuestion(qt, opts);

        this.bind2opts();
        // document.querySelector("#output").textContent = qs

        this.q = new question(qt, opts, ans)

        this.setVars();

        return this.q

    }


    cbclr(el) {

        this.opts.forEach(function(element, index) {

            console.log(element);
            element.style.color = "inherit";
            element.style.backgroundColor = "inherit";
        })

        el.style.color = 'slateblue';
        el.style.backgroundColor = 'lightgray';


    }

    loadAnswer() {

        document.querySelector("#output").textContent = this.ans;

        return this.ans
    }


    bind2opts() {

        let loadAnswer = this.loadAnswer;
        let cbclr = this.cbclr;
        let opts = document.querySelectorAll(".opt");


        this.opt_opt.forEach(function(element, index) {

            element.addEventListener("click",
                function() {
                    loadAnswer("opts");
                })
        })

        opts.forEach(function(element, index) {

            element.addEventListener("click",
                function() {
                    cbclr(element);
                })
        })

    }

    checkAnswer() {

        console.log(q)
    }

}


qu = new quiz()
var q = qu.reloadQuestion();
qu.loadQuestion(q.q, q.opts)

qu.bind2opts();