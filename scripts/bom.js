// References to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Create a list item to hold the chapter title and its delete button
const li = document.createElement('li');

// Create the delete button
const deleteButton = document.createElement('button');

// Populate the list item with the input value
li.textContent = input.value;

// Set the delete button's text and give it an accessible label for screen readers
deleteButton.textContent = '❌';
deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

// Append the delete button to the list item
li.append(deleteButton);

// Append the list item to the unordered list
list.append(li);
