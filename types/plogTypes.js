module.exports = `
type Query {
  Books: [Book]
  Authors: [Author]
}

type Mutation {
  createAuthor(name: String, age: Int ): Author
  createBook(title: String, genre: String,  authorId:String): Book
  deleteBook(id: ID): Book
}

type Author {
  _id: ID
  name: String
  age: Int
  books: [Book] 
}
type Book {
  _id: ID
  title: String
  genre: String
  author : ID
}

`;


