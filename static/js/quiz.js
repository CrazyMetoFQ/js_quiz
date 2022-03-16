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

    let ans = document.querySelector(".opt-opt:checked");

    try{
      ans = ans.value;
    } catch {
      ans = null;
    }

    // document.querySelector("#output").textContent = ans;

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
        element.className = "opt";
    })

    el.className = "opt checked-opt";

}


function reloadQuestion() {

    let qs = getQuestion()

    let qt = qs[0][0][0];
    let opts = qs[0][0][1];
    let ans = qs[0][0][2]
    let id_is = qs[0][1];

    loadQuestion(qt, opts, id_is);

    bind2opts();
    // document.querySelector("#output").textContent = qs

    let q = question(qt, opts, ans)
    return q

}


function checkAnswer() {

    let id_is = document.querySelector("#question-id-id");
    id_is = id_is.textContent;
    let g_ans = JSON.stringify(loadAnswer());
    let ans = document.querySelector("#answer");
  
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `/ans?i=${id_is}`, false);
    xhttp.send();

    let res = xhttp.responseText;

    console.log(id_is);
    console.log(res);
    console.log(g_ans);

    if (g_ans == res){
      let mark = "Correct";
      ans.textContent = mark;
      ans.className = "answer-correct";
      console.log("damn daniel");
      setScore()
      
    }
    else {
      let mark = "Wrong";
      ans.textContent = mark;
      ans.className = "answer-wrong";
      console.log("no way daniel");
    }

    
    
    return res 


}


function setScore() {
    score = window.localStorage.score
    window.localStorage.score = parseInt(score)+1   

    score = window.localStorage.score
    document.querySelector("#Score").textContent = score

    console.log(window.localStorage.score)
    console.log(score)
    console.log()
    
    
}


function main_fnc() {

    let q = reloadQuestion();
    loadQuestion(q.q, q.opts)

    bind2opts();

    window.localStorage.setItem("score", 0)
}

function resetQuestion(params) {
  console.log(1212123231232);

  document.querySelector(".checked-opt").classList.remove("checked-opt");
  document.querySelector("#answer").className = "";
  document.querySelector("#answer").textContent = "Not Answer";

  
}

// document.onload = main_fnc()

document.querySelector("#Score").textContent = 0
var q = reloadQuestion();

bind2opts();

window.localStorage.setItem("score", 0);