import React from 'react'
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import './App.css'

import ListBooks from './components/ListBooks';
import Shelf from './components/Shelf'
import Search from './components/Search';


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (book, newShelf) => {
    BooksAPI.update(book,newShelf).then( response => {
      book.shelf = newShelf
      this.setState({
        books: this.state.books.filter(b => b.id !== book.id).concat([book])
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({history}) => (
          <div className="list-books">
            <ListBooks books={this.state.books} onChangeSelf={this.updateShelf}/>
          </div>
        )} />     
        <Route path="/search" render={() => (
          <Search books={this.state.books} onChangeSelf={this.updateShelf} />
        )}/>
      </div>
    )
  }
}
export default BooksApp