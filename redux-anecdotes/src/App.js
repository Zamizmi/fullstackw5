import React from 'react';


class App extends React.Component {
  klik = (nappi) => () => {
    this.props.store.dispatch({ type: nappi })
  }

  generateId = () => Number((Math.random() * 1000000).toFixed(0))

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: this.generateId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  voteAnecdote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id }
    })
  }

  compareByVotes = (a1, a2) => {
    if (a1.votes > a2.votes)
      return -1
    if (a1.votes < a2.votes)
      return 1
    return 0
  }

  render() {
    const anecdotes = this.props.store.getState()
    const sortedAnecdotes = anecdotes.sort(this.compareByVotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>Vote</button>
              <br/>
              <br/>
            </div>
          </div>
        )}
        <h2>Create new</h2>
        <form onSubmit={this.addAnecdote}>
          <input name="anecdote" />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default App
