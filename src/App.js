import React, { Component } from 'react';
import './App.css';
import BookForm from './component/book-form';
import BookList from './component/book-list';

class App extends Component {

  constructor(props) {
    super(props);
    this.initState();
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.editBook = this.editBook.bind(this);
    this.editButtonBook = this.editButtonBook.bind(this);
    this.cancelBook = this.cancelBook.bind(this);
    this.openMenu = this.openMenu.bind(this);
}

initState(){
    this.state = {
        books:  [{
          id: '',
          author: '',
          name: '',
          year: '',
          pages: ''
        }],
        book:  {
          id: '',
          author: '',
          name: '',
          year: '',
          pages: ''
        },
        edit: false,
        showMenu: false,
    }
}

componentDidMount(){
    let books =localStorage.getItem('book');
    let result = JSON.parse(books);
    this.setState({books: result});
  
}

clearBook(){
  this.setState({
    book:  {
      id: '',
      author: '',
      name: '',
      year: '',
      pages: ''
    },
    edit: false,
    showMenu: false
  });
}

editBook() {
  let books  = this.state.books || [];
  let indexElement =  books.map((element) => { return element.id; }).indexOf(this.state.book.id);
  books[indexElement] = {
        id: Math.floor( Math.random() *1000000),
        author: this.state.book.author,
        name: this.state.book.name,
        year: this.state.book.year,
        pages: this.state.book.pages
  };
  this.clearBook();
  this.setItem(books);
  this.setState( {edit: false, books: books} )
}

addBook() {
  let books  = this.state.books || [];
  let book = {
    id: Math.floor( Math.random() *1000000),
    author: this.state.book.author,
    name: this.state.book.name,
    year: this.state.book.year,
    pages: this.state.book.pages
  }
  books.push(book);
  this.clearBook();
  this.setItem(books);
  this.setState( { books: books} )
}

cancelBook(){
  this.clearBook();
}


onInputTextChange(parameter, value) {
  let book = Object.assign({}, this.state.book);
  book[parameter] = value;                        
  this.setState({book: book});
}

editButtonBook(book){
  this.setState({edit: true, showMenu: true, book: book});
}
openMenu(){
  console.log('cl', this.state.showMenu);
  this.setState({showMenu: !this.state.showMenu})
}


removeBook(book){
  let books = this.state.books;
  let indexElement =  books.map((element) => { return element.name; }).indexOf(book.name);
  books.splice(indexElement, 1);
  this.setItem(books);
  this.setState({books: books});
}

setItem(books) {
  try {
    localStorage.setItem('book',JSON.stringify(books));
  } catch (e) {
    if (e == 'QUOTA_EXCEEDED_ERR') {
     alert('Превышен лимит');
    }
  }
}


  render() {
    let { books } = this.state;
    return (
      <div className="App">
        <BookForm 
        addBook = {this.addBook} 
        editBook = {this.editBook}
        showMenu={this.state.showMenu}
        edit={this.state.edit}
        book={this.state.book}
        openMenu={this.openMenu}
        onInputTextChange={this.onInputTextChange}
        cancelBook={this.cancelBook}
        />
        <BookList books= {books} 
        editBook={this.editButtonBook}
        removeBook={this.removeBook} />
      </div>
    );
  }
}

export default App;
