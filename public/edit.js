let queryParams = new URLSearchParams(window.location.search);
let id = queryParams.get("id");
// Endpoint
const GET_POST_BY_ID = `http://localhost:4000/routes/get-by-id/?id=${id}`;
const UPDATE_POST = `http://localhost:4000/routes/update/?id=${id}`;

let updateForm = document.getElementById("post-update-form");

async function getPost() {
    try {
        const response = await fetch(GET_POST_BY_ID);
        const data = await response.json();
        let post = 
        `<!-- Form Field Title -->
        <label for="title">Title</label>
        <input type="text" name="title" id="title" value="${data.post.title}" />
        <!-- Form Field Author -->
        <label for="author">Author</label>
        <input type="text" name="author" id="author" value="${data.post.author}"/>
        <!-- Form Field Body -->
        <label for="body">Body</label>
        <input type="text" name="body" id="body" value="${data.post.body}" />
        <!-- Form Sumbit -->
        <input type="submit" value="UPDATE" />`;
        updateForm.innerHTML = post;

    } catch (error) {
        console.error(error.message);
    };
};

getPost();

updateForm.addEventListener("submit", updatePost);

async function updatePost(event) {
    try {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let titleElement = document.getElementById("title");
        let authorElement = document.getElementById("author");
        let bodyElement = document.getElementById("body");
        let bodyObject = {
            title: titleElement.value,
            author: authorElement.value,
            body: bodyElement.value,
        }
        let requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(bodyObject)
        }
        let response = await fetch(UPDATE_POST, requestOptions);
        window.location.href = window.location.origin;
    } catch (error) {
        console.error(error.message);
    };
};