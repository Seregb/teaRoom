const { commentForm } = document.forms;
const commentPhrase = document.querySelector('#dataID');
console.log(commentPhrase);

function addComment(text, id, name) {
  return `
  <figure class="text-end">
    <blockquote class="blockquote">
      <p>${text}</p>
    </blockquote>
    <figcaption class="blockquote-footer">
      ${name}</cite>
    </figcaption>
  </figure>
  `;
}

commentForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const comment = e.target.comment.value;
  const response = await fetch('/tea/1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  });
  const data = await response.json();
  // console.log(data.userComm.text, data.userComm.id, data.user.name);

  commentPhrase.insertAdjacentHTML('afterbegin', addComment(data.userComm.text, data.userComm.id, data.user.name));
});
