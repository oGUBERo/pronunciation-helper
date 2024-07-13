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
    const url = `https://dictionary.cambridge.org/pronunciation/english/${encodeURIComponent(selectedText)}`;
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
    
    const rects = range.getClientRects();
    console.log('Selection rectangles:', rects);
    
    if (!lookupButton) {
      console.log('Creating lookup button');
      createLookupButton();
    }

    // Find the topmost point of the selection
    let topMost = Infinity;
    for (let i = 0; i < rects.length; i++) {
      topMost = Math.min(topMost, rects[i].top);
    }

    // Calculate position relative to the viewport
    const buttonTop = topMost - lookupButton.offsetHeight - 5;
    const buttonLeft = rects[0].left;

    // Adjust for scroll position and ensure the button stays within the viewport
    lookupButton.style.position = 'fixed';
    lookupButton.style.left = `${Math.max(0, buttonLeft)}px`;
    lookupButton.style.top = `${Math.max(0, buttonTop)}px`;
    lookupButton.style.display = 'block';
    console.log('Lookup button shown');
  } else {
    // ... rest of the function remains unchanged ...
  }
}

document.addEventListener('mouseup', showLookupButton);
console.log('content.js loaded');