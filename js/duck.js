window.onload = function() {
  // Get the modal
  var modal = document.getElementById('duckModal');

  // Get the button that opens the modal
  var btn = document.getElementById('acknowledge');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

  // When the user loads the page, open the modal 
  modal.style.display = 'block';

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = 'none';
  }

  // When the user clicks on "ACKNOWLEDGE" button, close the modal
  btn.onclick = function() {
    modal.style.display = 'none';
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
}
