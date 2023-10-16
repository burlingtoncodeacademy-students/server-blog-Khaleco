const router = require("express").Router();
const fs = require("fs");
const DB_PATH = "./api/blog.json";

// ! -------------------------- Controllers --------------------------

// ? Get All Posts
router.get("/all", (req, res) => {
    try {
        let blogArray = read();
        res.json({message: "all blogs success", posts: blogArray});
    } catch (error) {
        res.status(500).json({message: "error", errorMessage: error.message,});
    }
});

// ? Get by Id
router.get("/get-by-id", (req, res) => {
    try{
        const id = req.query.id;
        let blogArray = read();
        let blog = blogArray.find((blog) => blog.post_id == id);

        if(!blog){
        throw new Error("Blog Not Found");
        }

        res.json({message: "blog by id success", post: blog});
    } catch(error){
        res.status(404).json({message: "error", errorMessage: error.message,});
    }
});

// ? Add blog
router.post("/add", (req, res) => {
    try {
        const {title, author, body} = req.body;
        let blogArray = read();
        let newBlog = {
            post_id: getId(),
            title,
            author,
            body
        };
        blogArray.push(newBlog);
        save(blogArray);
        res.json({message: "post added successfully", posts: blogArray});
    } catch (error) {
        res.status(500).json({message: "error", errorMessage: error.message,});
    }
})

// ? Update blog
router.patch("/update", (req, res) => {
    try {
        const id = req.query.id;
        let blogArray = read();
        let blogIndex = blogArray.findIndex((post) => post.post_id == id);

        if (blogIndex == -1) {
            throw new Error("Post not found.");
        }

        let updatedBlog = req.body;
        let orginalObject = blogArray[blogIndex];

        blogArray[blogIndex] = {...orginalObject, ...updatedBlog};
        
        save(blogArray);
        res.json({message: "post updated successfully", updatedPost: updatedBlog});
    } catch (error) {
        res.status(404).json({message: "error", errorMessage: error.message,});
    }
});

// ? Delete blog
router.delete("/delete/:id", (req, res) => {
    try {
        let blogArray = read();
        let filteredBlogArray = blogArray.filter((post) => post.post_id != req.params.id);
        if (blogArray.length == filteredBlogArray.length) {
            throw new Error("Post not found");
        }
        save(filteredBlogArray);
        res.json({message: "post deleted successfully", posts: filteredBlogArray});
    } catch (error) {
        res.status(404).json({message: "error", errorMessage: error.message,});
    }
});

// ! ------------------------- Helper Functions -------------------------

// ? Read Function for reading a file.
function read() {
    const file = fs.readFileSync(DB_PATH);
    return JSON.parse(file);
}

// ? save Function for writing to a file.
function save(data) {
    const file = fs.writeFileSync(DB_PATH, JSON.stringify(data));
}    

// ? Id function for getting the lowest possible integer
function getId() {
    let index = 1;
    let blogArray = read();
    blogArray.sort(function(a, b){
        return a.post_id - b.post_id;
    })
    blogArray.forEach(post => {
        console.log(index);
        if (post.post_id == index) {
            index++;
        }
    });
    return index;
}

module.exports = router;