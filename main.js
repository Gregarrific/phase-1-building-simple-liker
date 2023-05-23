// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const hidden = document.querySelector('div#modal');
hidden.classList.toggle('hidden');
document.addEventListener('click', like);

function like(event) {
  let location = event.target;
  if (location.className === 'like-glyph') {
    mimicServerCall()
    .then(response => {
      location.classList.replace('like-glyph', 'activated-heart');
      location.innerHTML = FULL_HEART;
    })
    .catch(error => {
      hidden.querySelector('p#modal-message').innerHTML = error;
      hidden.classList.replace('hidden', 'visible');
      setTimeout(showError, 3000);
    });
  } else if (location.className === 'activated-heart') {
    mimicServerCall()
    .then(response => {
      location.classList.replace('activated-heart', 'like-glyph');
      location.innerHTML = EMPTY_HEART;
    })
    .catch(error => {
      hidden.querySelector('p#modal-message').innerHTML = error;
      hidden.classList.replace('hidden', 'visible');
      setTimeout(showError, 3000);
    });
  }
}

function showError() {
  return hidden.classList.replace('visible', 'hidden');
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}