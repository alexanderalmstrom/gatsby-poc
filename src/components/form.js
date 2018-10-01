import React from 'react'
import { navigateTo } from 'gatsby-link'

import styles from './form.module.scss'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const form = e.target

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    const { name, email, message } = this.state

    return (
      <form
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            <div className={styles.label}>Name:</div>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            <div className={styles.label}>Email:</div>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            <div className={styles.label}>Message:</div>
            <textarea
              className={styles.textarea}
              name="message"
              value={message}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <button className={styles.btn} type="submit">
            Send
          </button>
        </p>
      </form>
    )
  }
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default Form
