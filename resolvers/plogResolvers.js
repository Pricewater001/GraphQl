const DataLoader = require('dataloader');
const AuthorModel = require('../models/author.model');
const BookModel = require('../models/book.model');

const bookLoader = new DataLoader(async (authorIds) => {
  try {
    const books = await BookModel.find({ author: { $in: authorIds } });
    const booksByAuthor = {};
    
    books.forEach((book) => {
      if (booksByAuthor[book.author]) {
        booksByAuthor[book.author].push(book);
      } else {
        booksByAuthor[book.author] = [book];
      }
    });
    
    const sortedBooks = authorIds.map((authorId) => booksByAuthor[authorId] || []);
    
    return sortedBooks;
  } catch (error) {
    console.error('Tokken:', error);
        throw new Error('error in fetching autohere not Authrized');
  }

});

module.exports = {
  Query: {
    Books: async (_, args) => {
      try {
        const documents = await BookModel.find();
        return documents;
      } catch (error) {
        console.error('Error retrieving documents:', error);
        throw new Error('Failed to retrieve documents.');
      }
    },

    Authors: async (parent, args, { user }) => {
      try {
        if (!user.isLogged) {
          throw new Error('Not Authorized');
        }
        const documents = await AuthorModel.find();
        return documents;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {

    createAuthor: async (_, { name, age }) => {
      try {
        const newAuthor = await AuthorModel.create({ name, age });
        return newAuthor;
      } catch (error) {
        console.error('Error creating author:', error);
        throw new Error('Failed to create author.');
      }
    },
    createBook: async (_, { title, genre, authorId }) => {
      try {
        const book = await BookModel.create({ title, genre, author: authorId });
        return book;
      } catch (error) {
        console.error('Error creating book:', error);
        throw new Error('Failed to create book.');
      }
    },

    deleteBook: async (_, { id }) => {
      try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
          throw new Error('Book not found.');
        }
        return deletedBook;
      } catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('Failed to delete book.');
      }
    },
  },
  Author: {
    books: async (parent, args, { user }) => {
      try {

        if (!user.isLogged) {
          throw new Error('Not Authorized');
        }
        
        const books = await bookLoader.load(parent._id.toString());

        return books;

      } catch (error) {
        console.error('Error retrieving books for author:', error);
        throw new Error('Failed to retrieve books for author.');
      }
    },
  },
};
