// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
// from website!
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

let entryCount = 1;
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        // set entry number for url
        newPost.id = entryCount;
        entryCount++;

        newPost.addEventListener("click", () => {
          setState({state: "entry", id: newPost.id});
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});

// back button listener
window.onpopstate = function(event) {
  setState(event.state);
};

// home page listener
document.querySelector("header h1").addEventListener("click", () => {
  setState({state: "home"});
});

// settings page listener
document.querySelector("header img").addEventListener("click", () => {
  setState({state: "settings"});
});