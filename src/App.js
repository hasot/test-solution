import React, { Component } from 'react';
import './App.css';
import BookForm from './component/book-form';
import BookList from './component/book-list';

class App extends Component {

  constructor(props) {
    super(props);
    this.initState();
}

initState = () => {
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

componentDidMount = () => {
    let books =localStorage.getItem('book');
    let result =[];
    if(books){
       result = JSON.parse(books);
    }
    
    this.setState({books: result});
  
}

initDataState = (books) => {
  this.setItem(books);
  this.setState({
    books: books,
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

editBook = () => {
  let books  = this.state.books || [{
    id: '',
    author: '',
    name: '',
    year: '',
    pages: ''
  }];
  let indexElement =  books.map((element) => { return element.id; }).indexOf(this.state.book.id);
  books[indexElement] = this.initBookElement();
  this.initDataState(books);
}

addBook = () => {
  let books  = this.state.books || [];
  let book = this.initBookElement();
  books.push(book);
  this.initDataState(books);
}
initBookElement = () => {
  return {
    id: Math.floor( Math.random() *1000000),
    author: this.state.book.author,
    name: this.state.book.name,
    year: this.state.book.year,
    pages: this.state.book.pages
  }
}
cancelBook = () => {
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


onInputTextChange = (parameter, value) => {
  let book = Object.assign({}, this.state.book);
  book[parameter] = value;                        
  this.setState({book: book});
}

editButtonBook = (book) => {
  this.setState({edit: true, showMenu: true, book: book});
}
openMenu = () => {
  console.log('cl', this.state.showMenu);
  this.setState({showMenu: !this.state.showMenu})
}


removeBook = (book) => {
  let books = this.state.books;
  let indexElement =  books.map((element) => { return element.name; }).indexOf(book.name);
  books.splice(indexElement, 1);
  this.setItem(books);
  this.setState({books: books});
}

setItem = (books) => {
  try {
    localStorage.setItem('book',JSON.stringify(books));
  } catch (e) {
    if (e === 'QUOTA_EXCEEDED_ERR') {
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
