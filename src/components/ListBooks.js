import React from 'react'
import { Link } from 'react-router-dom';

import ListTitle from './ListTitle';
import Shelf from './Shelf';

class ListBooks extends React.Component {
  state = {
    shelves: [{title: 'Currently Reading', value: 'currentlyReading'},
              {title: 'Read', value: 'read'},
              {title: 'Want to Read', value:'wantToRead'}],
  }
  
  render () {
    return (
      <div>
        <ListTitle title="My Reads" />
        <div className="list-books">
          <div className="list-books-content">
              {this.state.shelves.map( shelf => (
                <Shelf 
                  title={shelf.title} 
                  key={shelf.value} 
                  books={this.props.books.filter(book => book.shelf === shelf.value)}
                  onChangeSelf={this.props.onChangeSelf}
                />
              ))}  
          </div>
        </div>

        <div className="open-search">
          <Link to="/create">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks