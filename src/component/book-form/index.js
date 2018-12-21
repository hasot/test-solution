import React, { Component } from 'react';
import './style.css';
import { throws } from 'assert';

class BookForm extends Component {

  constructor(props) {
    super(props);
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.cancelBook = this.cancelBook.bind(this);
    this.onInputTextChange = this.onInputTextChange.bind(this);
}


  onInputTextChange(parameter, value) {
    this.props.onInputTextChange(parameter, value);
}

  cancelBook(){
    this.props.cancelBook();
  }

  editBook(){
    this.props.editBook();
  }

  addBook(){
    this.props.addBook();
  }

  disabledButton(){
    if (!(this.props.book.author.trim() && this.props.book.name.trim()
    && this.props.book.year.trim() && this.props.book.pages.trim())){
      return  true;
    } 
    return false
  }
  openMenu(){
    this.props.openMenu();
  }

  formInput(){
    return(
      <div >
      <h3>Добавить книгу</h3>
      <div>
        <div>Автор</div>
        <input type="text" value={this.props.book.author} 
          onChange={(event) => this.onInputTextChange('author', event.target.value)}
        />
      </div>
      <div>
      <div>Название</div>
        <input type="text"value={this.props.book.name}
          onChange={(event) => this.onInputTextChange('name', event.target.value)}
        />
      </div>
      <div>
        <div>Год издания</div>
        <input  type="number" name="quantity" min="0" max="3000"value={this.props.book.year}
            onChange={(event) => this.onInputTextChange('year', event.target.value)}
        />
      </div>
      <div>
        <div>Количество страниц</div>
        <input type="number" name="quantity" min="0" max="10000" value={this.props.book.pages}
            onChange={(event) => this.onInputTextChange('pages', event.target.value)}
        />
      </div>
      <div className="button-div">
        <button  onClick={() =>this.cancelBook()}>Отмена</button>
        {this.props.edit && <button onClick={() =>this.editBook()} disabled={this.disabledButton()}>Редактировать</button>}
        {!this.props.edit &&  <button onClick={() =>this.addBook()} disabled={this.disabledButton()}>Добавить</button>}  
      </div>
      </div>
    );
  }

  render() {
    console.log('this.props.showMenu',this.props.showMenu);
    return (
      <div>
        <div className="form">
        {this.formInput() }
        </div>
        <div className="menudown"  onClick={() => this.openMenu()}>
          <div> Добавить книгу</div>
        </div>
        {
              this.props.showMenu && <div className="divForm">
                {this.formInput()}
              </div>
          }
      </div>
    );
  }
}

export default BookForm;