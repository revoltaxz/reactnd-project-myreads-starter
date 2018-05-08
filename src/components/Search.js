import React from 'react'
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import Book from './Book';

class Search extends React.Component {
  state = {
    all_books: [],
    query: '',
    search_error: false
  }

  updateQuery = (event) => {
    const query = event.target.value;
    this.setState({ query: query })

    if (query) {
      BooksAPI.search(query,20).then((books) => { 
        const searchBooks = books.map(queryBooks => {
          const findBook = this.props.books.find( book => book.id === queryBooks.id);
          queryBooks.shelf = findBook ? findBook.shelf : 'none';
        })
        books.length > 0 ? this.setState({all_books: books, search_error: false}) : 
        this.setState({all_books: [], search_error: true });
      })
    } else this.setState({all_books: [], search_error: false})
  }

  handleUpdate = (book,shelf) => {
    this.props.onChangeSelf(book,shelf);
  }
  


  render() {
    const { books, onChangeSelf  } = this.props
    const { query, all_books,search_error } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput minLength={1} debounceTimeout={500} value={query} onChange={this.updateQuery} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          {all_books.length > 0 && (
            <div>
              <h3>{`Search results: ${all_books.length} books`}</h3>
            </div>
          )}
          <ol className="books-grid">
            {all_books.map((book,index) => (
              <Book book={book} key={index} onChangeSelf={(shelf) => {this.handleUpdate(book,shelf)}}/>
            ))}
            {search_error && (
              <div>
                <h3>Search results: 0 books</h3>
              </div>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;