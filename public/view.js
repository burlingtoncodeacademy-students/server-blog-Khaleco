
let queryParams = new URLSearchParams(window.location.search);
let id = queryParams.get("id");
// ENDPOINT
const GET_POST_BY_ID = `http://localhost:4000/routes/get-by-id/?id=${id}`;

async function GetPostById() {
    try {
        const response = await fetch(GET_POST_BY_ID);
            const data = await response.json();
        let div = document.querySelector("div");
        let post =
            `<h1 id="view-h1">${data.post.title}</h1>
            <h2 id="view-h2">${data.post.author}</h2>
            <p id="view-p">${data.post.body}</p>`
            div.innerHTML = post;
    } catch(error) {
        console.error(error.message);
    }
}

GetPostById();