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

q = { "q": "TITLE", "opts": [11, 21, 31, 41], "ans": 21 }

function loadQuestion(q_title, opts_array, id_is) {

    let qt = document.querySelector("#question-title");

    let opt_text = document.querySelectorAll(".opt-text");
    let opt_opt = document.querySelectorAll(".opt-opt");

    document.querySelector("#question-id-id").textContent = id_is

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
    let id_is = qs[0][1];

    loadQuestion(qt, opts, id_is);

    bind2opts();
    // document.querySelector("#output").textContent = qs

    let q = question(qt, opts, ans)
    return q

}


function checkAnswer() {

    let id_is = document.querySelector("#question-id-id");

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `/ans?i=${id_is}`, false);
    xhttp.send();

    return xhttp.responseText


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


var q = reloadQuestion();
loadQuestion(q.q, q.opts)

bind2opts();


// class quiz {


//     // static getQuestion() {

//     //     // quiz args

//     //     const xhttp = new XMLHttpRequest();

//     //     xhttp.open("GET", "/q", false);
//     //     xhttp.send();

//     //     return JSON.parse(xhttp.responseText)

//     // }


//     // static reloadQuestion() {

//     //     let qs = getQuestion()

//     //     let qt = qs[0][0][0];
//     //     let opts = qs[0][0][1];
//     //     let ans = qs[0][1];

//     //     loadQuestion(qt, opts);

//     //     bind2opts();

//     // }


//     constructor() {
//         console.log("start");

//         q = reloadQuestion();
//         loadQuestion(q.q, q.opts);

//         bind2opts();



//     }


//     setVars() {

//         this.qt = document.querySelector("#question-title");
//         this.opt_text = document.querySelectorAll(".opt-text");
//         this.opt_opt = document.querySelectorAll(".opt-opt");
//         this.opts = document.querySelectorAll(".opt");

//         this.nm = "opts";
//         this.ql = `input[name=${this.nm}]:checked`;
//         this.ans = document.querySelector(this.ql).value;
//     }




//     loadQuestion(q_title, opts_array) {

//         this.qt.textContent = q_title;

//         this.opt_text.forEach(function(element, index) {

//             element.textContent = opts_array[index];
//         });

//         this.opt_opt.forEach(function(element, index) {

//             element.value = opts_array[index];
//         })

//     }

//     cbclr(el) {

//         this.opts.forEach(function(element, index) {
//             element.style.color = "inherit";
//             element.style.backgroundColor = "inherit";
//         })

//         el.style.color = 'slateblue';
//         el.style.backgroundColor = 'lightgray';


//     }

//     loadAnswer() {

//         document.querySelector("#output").textContent = this.ans;

//         return ans
//     }


//     bind2opts() {

//         this.opt_opt.forEach(function(element, index) {

//             element.addEventListener("click",
//                 function() {
//                     loadAnswer("opts");
//                 })
//         })


//         // console.log(opts)

//         this.opts.forEach(function(element, index) {

//             element.addEventListener("click",
//                 function() {
//                     this.cbclr(element);
//                 })
//         })

//     }







//     checkAnswer() {

//         console.log(q)
//     }






// }