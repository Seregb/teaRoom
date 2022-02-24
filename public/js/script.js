const { postForm } = document.forms;
postForm.addEventListener('submit', async (event) => {
  console.log('=====');
  event.preventDefault();
  const formData = new FormData(postForm);
  const response = await fetch('/admin', {
    method: 'POST',
    body: formData,
  });
});
