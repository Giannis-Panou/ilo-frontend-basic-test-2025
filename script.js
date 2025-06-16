// Συνάρτηση για fetch των posts και εμφάνιση λίστας
async function getPosts() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts');
		const posts = await response.json();
		const postsDiv = document.getElementById('posts');

		// Καθαρισμός προηγούμενων δεδομένων
		postsDiv.innerHTML = '';

		// Δημιουργία HTML για κάθε post και  προσθήκη στο postsDiv
		const html = `
      <ul>
        ${posts
					.slice(0, 10)
					.map(
						(post) => `
          <li onclick="showDetails(this, ${post.id})" class="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <div id="details"></div>
          </li>
        `
					)
					.join('')}
      </ul>
    `;

		postsDiv.innerHTML = html;
	} catch (error) {
		document.getElementById('posts').innerText = 'Error loading posts';
	}
}

// Συνάρτηση για εμφάνιση λεπτομερειών και σχολίων για ένα post
async function showDetails(post, id) {
	const detailsDiv = post.querySelector('#details');

	// Toggle εμφάνισης του detailsDiv
	if (detailsDiv.style.display === 'block') {
		detailsDiv.style.display = 'none';
		return;
	} else if (!detailsDiv.innerHTML) {
		try {
			const postRes = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			);
			const post = await postRes.json();
			const commentsRes = await fetch(
				`https://jsonplaceholder.typicode.com/comments?postId=${id}`
			);
			const comments = await commentsRes.json();

			// Δημιουργία HTML για σχόλια
			detailsDiv.innerHTML = `
      <h5>Comments:</h5>
      <ul>
        ${comments
					.map(
						(comment) =>
							`<li class='comments'><strong>${comment.name}:</strong> ${comment.body}</li>`
					)
					.join('')}
      </ul>
    `;
		} catch (error) {
			detailsDiv.innerText = 'Error loading post details or comments';
		}
		detailsDiv.style.display = 'block';
	} else {
		detailsDiv.style.display = 'block';
	}
}

document.addEventListener('DOMContentLoaded', getPosts);
