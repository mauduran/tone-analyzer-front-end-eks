
var button = document.getElementById("analizer-btn");
var clearBtn = document.getElementById("clear-btn");
console.log(clearButton);
var text = document.getElementById("text-to-analyze");
var resultDiv = document.getElementById("result");

const URL = 'http://tone-analyzer-app-mauduran.us-south.cf.appdomain.cloud/tone'

function getToneOfText() {
    content = text.value.trim();
    if (content == "") return
    resultDiv.innerHTML = `    
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" style="width: 4rem; height:4rem" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;

    fetch(URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    }).then((res) => res.json()
    ).then((result) => {


        if(result.tones.length){
            resultDiv.innerHTML = '<p class="h1" style="text-align:center">-Results- Your text\'s tone is:</p>';
    
            result.tones.forEach((tone)=>{
                resultDiv.innerHTML += `<p style="text-align:center" class="display-6">${tone.tone_name} - ${(tone.score*100).toFixed(2)}%<p>`
            })
        } else {
            resultDiv.innerHTML = 'Could not get tone of text. Did you write it in English?';
        }
    }).catch((err) => {
        resultDiv.innerHTML = 'Could not get tone analysis.'
        resultDiv.style = "color:red;"
    });

}

function clearButton() {
    text.value = "";
}
button.addEventListener("click", getToneOfText);
clearBtn.addEventListener("click", clearButton);
