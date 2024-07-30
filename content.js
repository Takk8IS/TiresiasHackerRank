// content.js
(async () => {
  const response = await fetch(window.location.href);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const questions = Array.from(doc.querySelectorAll('div.grouped-mcq__scroll-window h1.disable-text-selection.question-view__title'));
  const instructions = Array.from(doc.querySelectorAll('section.question-view__instruction p'));
  const optionsLists = Array.from(doc.querySelectorAll('form div.d-flex.solution__options-list'));

  let result = '';

  questions.forEach((question, index) => {
    const title = question?.textContent.trim() || 'Title not found';
    const instruction = instructions[index]?.textContent.trim() || 'Instruction not found';
    const options = Array.from(optionsLists[index]?.querySelectorAll('label'))
      .map(opt => opt.textContent.trim())
      .filter(opt => opt !== '')
      .map(opt => `- [ ] ${opt}`)
      .join('\n') || 'Options not found';

    result += `
## ${title}

${instruction}

${options}
`;
  });

  console.log(result);

  // Copy to clipboard using a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = result;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // Uncomment the following lines to enable download functionality
  // const blob = new Blob([result], { type: 'text/plain' });
  // const url = URL.createObjectURL(blob);
  // const link = document.createElement('a');
  // link.href = url;
  // link.download = 'hackerrank_question.md';
  // link.click();
})();
