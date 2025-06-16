// Συνάρτηση για fetch των posts και εμφάνιση λίστας
async function getPosts() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts');
		const posts = await response.json();
		const postsDiv = document.getElementById('posts');
		postsDiv.innerHTML = '';
		posts.slice(0, 10).forEach((post) => {
			const postElement = document.createElement('div');
			postElement.className = 'post';
			postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button onclick="showDetails(${post.id})">Δείτε λεπτομέρειες</button>
      `;
			postsDiv.appendChild(postElement);
		});
	} catch (error) {
		document.getElementById('posts').innerText = 'Σφάλμα φόρτωσης δεδομένων';
	}
}

// Συνάρτηση για εμφάνιση λεπτομερειών και σχολίων για ένα post
async function showDetails(id) {
	const detailsDiv = document.getElementById('details');
	detailsDiv.innerHTML = '';
	try {
		const postRes = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${id}`
		);
		const post = await postRes.json();
		const commentsRes = await fetch(
			`https://jsonplaceholder.typicode.com/comments?postId=${id}`
		);
		const comments = await commentsRes.json();
		detailsDiv.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <h3>Σχόλια:</h3>
      <ul>
        ${comments
					.map(
						(comment) =>
							`<li><strong>${comment.name}:</strong> ${comment.body}</li>`
					)
					.join('')}
      </ul>
    `;
	} catch (error) {
		detailsDiv.innerText = 'Σφάλμα φόρτωσης λεπτομερειών';
	}
}

document.addEventListener('DOMContentLoaded', getPosts);
