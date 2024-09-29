// const express = require("express");
// const mongoose = require("mongoose");
// require('dotenv').config(); 

// // const URL = "mongodb://127.0.0.1:27017/get_your_book";


// // MongoDB connection URL
// // const URL = "mongodb://127.0.0.1:27017/get_book";
// const URL= process.env.MONGODB_URL;
// // const URL= "mongodb+srv://ashwanisingh46572:zWYKjX5TSmKidkn8@ashwani.h9jvfdt.mongodb.net/get_your_book?retryWrites=true&w=majority";



// const app = express();
// const port = 3000;

// // Connect to MongoDB
// const connection = async () => {
//     try {
//         await mongoose.connect(URL);
//         console.log(`Connection Successful with MONGO`);
//     } catch (err) {
//         console.log("Connection Failed with MONGO", err);
//     }
// };

// connection();

// // Define the book schema and model
// const bookSchema = new mongoose.Schema({
//     bookName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     shelfNumber: {
//         type: Number,
//         required: true,
//         min: 1
//     }
// });

// const Book = mongoose.model("Book", bookSchema);



// // Function to add a sample book
// const addSampleBook = async () => {
//     const sampleBook = new Book({
//         bookName: "The Great Gatsby",
//         shelfNumber: 1
//     });

//     try {
//         const existingBooks = await Book.countDocuments();
//         if (existingBooks === 0) {
//             await sampleBook.save();
//             console.log('Sample book added:', sampleBook);
//         } else {
//             console.log('Sample book already exists.');
//         }
//     } catch (error) {
//         console.error('Error adding sample book:', error);
//     }
// };

// // Add sample book on server start
// addSampleBook();






// // Middleware
// app.use(express.json());

// // API endpoint to fetch all books
// app.get("/books", async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.json(books);
//     } catch (error) {
//         res.status(500).send("Error fetching books: " + error.message);
//     }
// });



// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });










// ---------------------------------------------------------------------------



const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config(); 

// MongoDB connection URL
// const URL = process.env.MONGODB_URL;
const URL= "mongodb+srv://ashwanisingh46572:zWYKjX5TSmKidkn8@ashwani.h9jvfdt.mongodb.net/get_your_book?retryWrites=true&w=majority";

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

// Connect to MongoDB
const connection = async () => {
    try {
        await mongoose.connect(URL);
        console.log(`Connection Successful with MONGO`);
    } catch (err) {
        console.log("Connection Failed with MONGO", err);
    }
};

connection();

// Define the book schema and model
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true
    },
    shelfNumber: {
        type: Number,
        required: true,
        min: 1
    }
});

const Book = mongoose.model("Book", bookSchema);

// Function to add a sample book
const addSampleBook = async () => {
    const sampleBook = new Book({
        bookName: "The Great Gatsby",
        shelfNumber: 1
    });

    try {
        const existingBooks = await Book.countDocuments();
        if (existingBooks === 0) {
            await sampleBook.save();
            console.log('Sample book added:', sampleBook);
        } else {
            console.log('Sample book already exists.');
        }
    } catch (error) {
        console.error('Error adding sample book:', error);
    }
};

// Add sample book on server start
addSampleBook();

// Middleware
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
    res.send("Welcome to the Book API! You can access the books at /books.");
});

// API endpoint to fetch all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).send("Error fetching books: " + error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
