import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './components/reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palautteita = store.getState().all
  const hyvia = store.getState().good
  const neutraaleja = store.getState().ok
  const huonoja = store.getState().bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>Hyvä: {hyvia}</td>
            <td></td>
          </tr>
          <tr>
            <td>Neutraaleja: {neutraaleja}</td>
            <td></td>
          </tr>
          <tr>
            <td>Huonoja: {huonoja}</td>
            <td></td>
          </tr>
          <tr>
            <td>Keskiarvo: {(hyvia-huonoja)/palautteita}</td>
            <td></td>
          </tr>
          <tr>
            <td>Positiivisia: {(hyvia/palautteita)*100} %</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>Hyvä</button>
        <button onClick={this.klik('OK')}>Neutraali</button>
        <button onClick={this.klik('BAD')}>Huono</button>
        <Statistiikka />
        <button onClick={this.klik('ZERO')}>Nollaa</button>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)
