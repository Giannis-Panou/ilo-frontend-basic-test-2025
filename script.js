// Συνάρτηση για fetch 10 post και εμφάνιση λίστας
async function getPosts() {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/posts?_limit=10'
		);
		const posts = await response.json();
		const postsDiv = document.getElementById('posts');

		// Καθαρισμός προηγούμενων δεδομένων
		postsDiv.innerHTML = '';

		// Δημιουργία HTML για κάθε post και προσθήκη στο postsDiv
		const postsList = `
			<ul id="posts-list">
				${posts.map((post) => `
					<li onclick="showDetails(this, ${post.id})" class="post">
						<div class="post-header">
							<h2>${post.title}</h2>
							<span class='arrow'> &#11206 </span>
						</div>
							<p>${post.body}</p>
							<div id="details"></div>
					</li>
				`).join('')}
			</ul>
		`;

		postsDiv.innerHTML = postsList;
	} catch (error) {
		document.getElementById('posts').innerText = 'Error loading posts';
	}
}

// Συνάρτηση για εμφάνιση λεπτομερειών και σχολίων για ένα post
async function showDetails(post, id) {
	const detailsDiv = post.querySelector('#details');
	const arrow = post.querySelector('.arrow');

	// Ελέγχουμε αν το detailsDiv είναι ήδη ανοιχτό για να το κλείσουμε
	if (detailsDiv.classList.contains('active')) {
		detailsDiv.style.maxHeight = '0';
		detailsDiv.classList.remove('active');
		arrow.classList.remove('rotated');
		return;
	}

	// Κάνουμε fetch τα details εφοσον δεν υπαρχουν ηδη
	if (detailsDiv.innerHTML === '') {
		try {
			const postRes = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			);
			const post = await postRes.json();
			const commentsRes = await fetch(
				`https://jsonplaceholder.typicode.com/comments?postId=${id}`
			);
			const comments = await commentsRes.json();

			// Δημιουργία HTML για τα σχόλια
			detailsDiv.innerHTML = `
				<div>
				<h4>Title: </h4>
				<p> ${post.title}</p>
				</div>
				
				<div>
				<h4>Body: </h4>
				<p> ${post.body}</p>
				</div>

				<h4>Comments:</h4>
				<ul id="comments-list">
				${comments.map((comment) => `
						<li class='comments'><strong>${comment.name}:</strong> ${comment.body}</li>
					`).join('')}
				</ul>
    		`;
		} catch (error) {
			detailsDiv.innerText = 'Error loading post details or comments';
		}
	}

	// Εμφανιση των details εφοσον εχουν γινει ηδη fetch
	detailsDiv.style.maxHeight = detailsDiv.scrollHeight + 'px';
	detailsDiv.classList.toggle('active');
	arrow.classList.add('rotated');
}

document.addEventListener('DOMContentLoaded', getPosts);
