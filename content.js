let lookupButton = null;
let selectedText = '';

function createLookupButton() {
  lookupButton = document.createElement('div');
  lookupButton.textContent = 'Look up';
  lookupButton.style.cssText = `
      position: absolute;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      z-index: 1000;
  `;
  lookupButton.addEventListener('mousedown', (e) => e.preventDefault());
  lookupButton.addEventListener('click', lookupWord);
  document.body.appendChild(lookupButton);
  console.log('Lookup button created and added to the page');
}

function lookupWord(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log('Lookup button clicked');
  console.log('Selected text (from global variable):', selectedText);

  if (selectedText) {
    const url = `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(selectedText)}`;
    console.log('Opening URL:', url);
    window.open(url, '_blank');
  } else {
    console.error('No text selected for lookup');
    alert('Please select some text before clicking the lookup button.');
  }
}

function showLookupButton(event) {
  const selection = window.getSelection();
  console.log('Selection object:', selection);
  
  selectedText = selection.toString().trim();
  console.log('Text selected:', selectedText);

  if (selectedText.length > 0) {
    console.log('Selection length > 0, proceeding to show button');
    const range = selection.getRangeAt(0);
    console.log('Selection range:', range);
    
    const rect = range.getBoundingClientRect();
    console.log('Selection rectangle:', rect);
    
    if (!lookupButton) {
      console.log('Creating lookup button');
      createLookupButton();
    }

    lookupButton.style.left = `${rect.left + window.scrollX}px`;
    lookupButton.style.top = `${rect.bottom + window.scrollY}px`;
    lookupButton.style.display = 'block';
    console.log('Lookup button shown');
  } else {
    console.log('No text selected');
    if (lookupButton) {
      lookupButton.style.display = 'none';
      console.log('Lookup button hidden');
    }
  }
}

document.addEventListener('mouseup', showLookupButton);
console.log('content.js loaded');