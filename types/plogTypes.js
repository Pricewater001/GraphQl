module.exports = `

type Query {
  Plogs (filter:PlogFilter ):[Plog],
  Users:[User],
  Companies:[Company],
  PlogById(id: ID): Plog
}

type Company {
  id: ID
  name: String
  Company: String
  rank :Int
}

type Plog {
  id: ID
  title: String
  description: String
  isTrue: Boolean
  age: Int
  country: String
  comments: [Comment]
  user: User
}

input PlogFilter {
  country: String
  age: Int
}



type User {
  id: ID
  name: String
  age: Int
  major: String
  company: Company
}

type Company {
  id: ID
  name: String
  location: String
  rank: Int
}

type Comment {
  id: ID
  content: String
}

input CommentInput {
  id: ID
  content: String
}

type Mutation {
  createPlog(title: String, description: String, isTrue: Boolean, age: Int, country: String, comments: [CommentInput], userId: ID): Plog
}


`;
