const AuthorModel = require("./models/author.model");
const BookModel = require("./models/book.model");

async function createAuthorWithBooks() {
  try {
    const author = new AuthorModel({
      name: "Hassan Mousa ",
      age: 40,
    });
    await author.save();

    const author2 = new AuthorModel({
        name: "Not Not Hassan Mousa ",
        age: 23,
      });
      await author2.save();

      const author3 = new AuthorModel({
        name: "Khalid",
        age: 40,
      });
      await author3.save();

    const book1 = new BookModel({
      title: "Java",
      genre: "cs",
      author: author._id,
    });
    await book1.save();

    const book2 = new BookModel({
      title: "calc 2",
      genre: "math",
      author: author._id,
    });
    await book2.save();

    const book3 = new BookModel({
        title: "keep calm",
        genre: "History",
        author: author3._id,
      });
      await book3.save();

    console.log("Author and associated books created successfully.");
  } catch (error) {
    console.error("Error creating author and books:", error);
  }
}

createAuthorWithBooks();
