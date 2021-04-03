const button = document.getElementById('submitBtn');
const body = document.querySelector('main');
async function onCreateSubmit(e, form) {
  e.preventDefault();
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, 3500);
  const jsonFormData = {};
  for (const pairs of new FormData(form)) jsonFormData[pairs[0]] = pairs[1];
  const res = await fetch('/s/create', {
    method: 'POST',
    body: JSON.stringify(jsonFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const content = await res.json();
  if (content.slug && content.fullUrl && content.url) {
    const newLink = document.createElement('p');
    const shortLink = document.createElement('a');
    shortLink.setAttribute('href', content.fullUrl);
    shortLink.innerText = `Shortened Link: ${content.fullUrl}`;
    newLink.classList.add('success');
    newLink.append(shortLink);
    body.appendChild(newLink);
  }
  if (content.prettyMessage || content.success !== true) {
    const errorText = document.createElement('p');
    if (content.prettyMessage === undefined) {
      errorText.innerHTML = content.response.prettyMessage;
    } else {
      errorText.innerHTML = content.prettyMessage;
    }
    errorText.classList.add('error');
    body.appendChild(errorText);
    setTimeout(() => {
      body.removeChild(errorText);
    }, 4000);
  }
}
document.getElementById('form').addEventListener('submit', function (e) {
  onCreateSubmit(e, this);
});
