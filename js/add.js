// 背景切り替え
$('#week').on('click', function () {
  $('#background').addClass('b-week');
  $('#background').removeClass('b-month');
});

$('#month').on('click', function () {
  $('#background').addClass('b-month');
  $('#background').removeClass('b-week');
});


// ふせん
function getNewNote() {
  return '<div class="note" style="position:fixed;">' +
    '<span class="batsu"></span>'
    +
    '<textarea type="text">'
    ;
}

// 追加
$('#add-btn').on('click', function () {
  var $note = $(getNewNote());
  $note.draggable();
  $('#background').append($note);

  $note.children(".batsu")
    .on('click', function () {
      $(this).parents('.note').remove();
    });

  const key = Date();
  var resultDiv = document.getElementById('result-div');
  const value = resultDiv.innerText;
  localStorage.setItem(key, value);

  $note.find('textarea').val(value);

  finalTranscript = '';
  resultDiv.innerHTML = '';

});

// 全消去
$('#clear-btn').on('click', function () {
  localStorage.clear();
  $('.note').remove();
});

// いままでのふせん
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  var $note = $(getNewNote());
  $note.draggable();
  $('#background').append($note);
  $note.children(".batsu")
    .on('click', function () {
      $(this).parents('.note').remove();
    });
  localStorage.getItem(key, value);

  $note.find('textarea').val(value);
}

// 録音
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = '';

recognition.onresult = (event) => {
  let interimTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript = transcript;
    }
  }
  resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';

}

$("#start-btn").on("click", function () {
  recognition.start();
});

$("#stop-btn").on("click", function () {
  recognition.stop();
});
