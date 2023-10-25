console.log("Hello World!");
// ENDPOINTS
const GET_ALL_POSTS = "http://localhost:4000/routes/all";
const ADD_POST = "http://localhost:4000/routes/add";
const DELETE_POST = "http://localhost:4000/routes/delete/";


// ! ----------------------- GET ALL POSTS -----------------------

async function getAllPosts() {
    try {
        const response = await fetch(GET_ALL_POSTS);
        const data = await response.json();
        displayPosts(data.posts)
        populatePostDropdown(data.posts);
    } catch (error) {
        console.error(error.message);
    }
}

getAllPosts();

// ! ------------------ DORPDOWN SELECTOR POPULATOR ---------------

// TODO: fishing for dropdown menu
let postSelect = Array.from(document.getElementsByClassName("select-post"));

function populatePostDropdown(posts) {
    postSelect.forEach(selector => {
        selector.innerHTML = "";
    
        // TODO: Loop through the posts display Title - Author
        let postDropdown = "";
        posts.forEach((post) => {
            let newOption = `<option value="${post.post_id}">${post.title} - ${post.author}</option>`;
            postDropdown += newOption;
        })
        selector.innerHTML = postDropdown;

    })
}

// ! ------------------ DISPLAY POST FUCTION -----------------

function displayPosts(posts) {
    // TODO: Fishing for the table body
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    // TODO: Loop through the post array

    let tableRows = "";
    posts.sort(function(a, b){
        return a.post_id - b.post_id;
    })
    posts.forEach((post) => {
        let newPostRow = `
        <tr>
            <td>${post.post_id}</td>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${post.body}</td>
            <td><button onclick="goToViewURL('${post.post_id}')">View</button></td>
            <td><button onclick="goToEditURL('${post.post_id}')">Edit</button></td>
        </tr>
        `
        tableRows += newPostRow;
    });
    tableBody.innerHTML = tableRows;
}

// ! ------------------- VIEW POST --------------------

function goToViewURL(id) {
    window.location.href = "/view.html?id=" + id;
}

// ! -------------------- ADD POST --------------------

document.getElementById("post-add-form").addEventListener("submit", addNewPost);

async function addNewPost(event) {
    event.preventDefault();
    let titleElement = document.getElementById("title");
    let authorElement = document.getElementById("author");
    let bodyElement = document.getElementById("body");

    try {
        // TODO: prep our headers
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // TODO: prep the body
        let bodyObject = {
            title: titleElement.value,
            author: authorElement.value,
            body: bodyElement.value,
        }
        // TODO: setup the request options
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(bodyObject)
        }
        // TODO: create a variable for our fetch url
        // TODO: Fetch
        let response = await fetch(ADD_POST, requestOptions);

        // TODO: refresh table and dropdown
        getAllPosts();
    } catch (error) {
        console.error(error.message);
    }
}

// ! ---------------------- UPDATE POST ---------------------

function goToEditURL(id) {
    window.location.href = "/edit.html?id=" + id;
}

// ! ---------------------- DELETE POST --------------------- 

document.getElementById("remove").addEventListener("submit", removePost);

async function removePost(event) {
    event.preventDefault();

    try {
        // TODO: fishing for the id that is in the dropdown menu - done
        // TODO: Create variable for the delete endpoint - done
        // TODO: conduct the delete fetch
        const requestOptions = {
            method: "DELETE"
        }
        let removePostSelect = document.getElementById("remove-post-select");
        const id = removePostSelect.value;

        const response = await fetch(DELETE_POST + id, requestOptions);

        // TODO: refresh table and dropdown
        getAllPosts();

    } catch (error) {
        console.error(error.message);
    }
}