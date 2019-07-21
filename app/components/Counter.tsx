import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const routes = require('../constants/routes.json')
const styles = require('./Counter.css')

type Props = {
  increment: () => void
  incrementIfOdd: () => void
  incrementAsync: () => void
  decrement: () => void
  counter: number
}

export default class Counter extends Component<Props> {
  props: Props

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter,
    } = this.props
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <Button
            onClick={increment}
            data-tclass="btn"
            type="primary"
            icon="plus"
          />
          <Button
            onClick={decrement}
            data-tclass="btn"
            type="primary"
            icon="minus"
          />
          <Button onClick={incrementIfOdd} data-tclass="btn" type="primary">
            odd
          </Button>
          <Button
            onClick={() => incrementAsync()}
            data-tclass="btn"
            type="primary"
          >
            async
          </Button>
        </div>
      </div>
    )
  }
}
