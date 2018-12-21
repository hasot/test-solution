import React, { Component } from 'react';
import './style.css';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.removeBook = this.removeBook.bind(this);
    this.editBook = this.editBook.bind(this);
}
  editBook(book){
    this.props.editBook(book);
  }
  removeBook(book){
      this.props.removeBook(book);
  }

  render() {
    let { books } = this.props;
    return (
      <div className="container">
        <div className="book-container">
       {
          books && books.map((element, key) => {
              return( 
              <div className="book-info" key={key}> 
                <div>  {element.name}</div>
                <div>  {element.author}</div>
                <div className="buttons">
                  <button onClick={() =>this.removeBook(element)}>Remove</button>
                  <button onClick={() =>this.editBook(element)}>Edit</button>
                </div>
              </div>); 
          })
        }
        </div>
      </div>
    );
  }
}

export default BookList;