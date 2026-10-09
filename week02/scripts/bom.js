// References to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Load the saved chapters, or start with an empty array on a first visit
let chaptersArray = getChapterList() || [];

// Display every saved chapter when the page loads
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// Add a chapter when the Add Chapter button is clicked
button.addEventListener('click', () => {
  if (input.value != '') {           // make sure the input is not empty
    displayList(input.value);        // output the submitted chapter
    chaptersArray.push(input.value); // add the chapter to the array
    setChapterList();                // update localStorage with the new array
    input.value = '';                // clear the input
    input.focus();                   // set the focus back to the input
  }
});

// Build and append one list item with its delete button
function displayList(item) {
  let li = document.createElement('li');
  let deletebutton = document.createElement('button');
  li.textContent = item;
  deletebutton.textContent = '❌';
  deletebutton.classList.add('delete');
  deletebutton.setAttribute('aria-label', `Remove ${item}`);
  li.append(deletebutton);
  list.append(li);

  deletebutton.addEventListener('click', function () {
    list.removeChild(li);
    deleteChapter(li.textContent); // remove the chapter from the array and localStorage
    input.focus();
  });
}

// Save the array to localStorage as a string
function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Get the array back from localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Remove a chapter from the array and update localStorage
function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1); // slice off the ❌ at the end
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  setChapterList();
}
