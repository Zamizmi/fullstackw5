import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    if (!this.state.visible) {
      return(
        <div style={hideWhenVisible}>
          <p onClick={this.toggleVisibility}>{this.props.buttonLabel}</p>
        </div>
      )} else {
        return (
          <div style={showWhenVisible}>
            <p onClick={this.toggleVisibility}>{this.props.buttonLabel}</p>
            {this.props.children}
          </div>
        )
      }
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
