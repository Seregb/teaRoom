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

// async function getPosts() {
//   const posts = await (await fetch('/')).json();
//   const postContainer = document.querySelector('#post-container');
//   postContainer.innerHTML = '';
//   posts.forEach((post) => {
//     postContainer.insertAdjacentHTML(
//       'beforeend',
//       `
//     <div
//           data-id=${post.id}
//           class='card'
//           style='width: 18rem; border:solid 2px; border-color:rgb(188, 23, 230)'
//         >
//           <img src=${post.img} class='card-img-top' alt=${post.name} />
//           <div class='card-body'>
//             <h5 class='card-title'>${post.name}</h5>
//             <h4 class='card-text'>${post.text}</h4>
//             ${post.tags
//               .map((tag) => `<span class='card-text'>${tag.name}</span>`)
//               .join(' ')}
//             <div>
//               <button
//                 id='delete-button'
//                 type='button'
//                 class='btn btn-danger'
//               >delete</button>
//               <button
//                 id='edit-button'
//                 type='button'
//                 class='btn btn-warning'
//               >edit</button>
//             </div>
//           </div>
//         </div>
//     `
//     );
//   });
// }

const postContainer = document.querySelector('#post-container');
postContainer.addEventListener('click', async (event) => {
  event.preventDefault();
  // console.log(event.target);
  if (event.target.id === 'delete-button') {
    const teaCard = event.target.closest('[data-id]');
    const teaId = teaCard.dataset.id;
    console.log(teaId);
    // console.log(postId);
    const response = await fetch(`/admin/tea/${teaId}`, {
      method: 'DELETE',
      // headers: {
      //   'Content-type': 'application/json', // не нужен в данный момент тк удаление и нет body
      // },
    });
    if (response?.ok) {
      console.log('jiji');
      // await getPosts();
      teaCard.remove();
    }
  }
});


const allimg = document.querySelector('#wrapper');
console.log(allimg);
allimg.addEventListener('click', (e) => {
  // console.log(e.target.closest('div'));
  const teaId = e.target.closest('div').dataset.id;
  window.location.replace(`/tea/${teaId}`);
})
