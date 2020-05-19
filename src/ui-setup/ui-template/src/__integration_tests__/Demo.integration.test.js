const React = require('react')
import waait from 'waait'
import { fireEvent, within, act, wait } from '@testing-library/react'
import { renderAndWait } from '../utils'
import { runConductorWithFixtures } from '../utils/integration-testing/runConductorWithFixtures'
import { HApp } from '../index.js'

// scenario('Book Endpoints', async (scenario, jest) => {
//   await scenario.players({alice: conductorConfig}, true)
//   const { getByText } = await renderAndWait(<HApp />)
//   fireEvent.click(getByText('Book'))
//   await scenario.consistency()
//   await waait(0)
//   jest.expect(getByText('Book Entry')).toBeInTheDocument()
// })

describe('Book Endpoints', () => {
  // it('Renders Book Page and List of Book Entries', runConductorWithFixtures(async () => {
  //   const { getByText } = await renderAndWait(<HomePage />)
  //   const welcomeMsg = 'Welcome to your generated Happ UI'
  //   expect(getByText(welcomeMsg)).toBeInTheDocument()
  //
  //   // fireEvent.click(getByText('Book'))
  //   // await waait(0)
  //   // expect(getByText('Book Entry')).toBeInTheDocument()
  // }), 15000)

  it('Creates new Book Entries', runConductorWithFixtures(async () => {
    const { getByText, getByLabelText } = await renderAndWait(<HApp />)

    await act(async () => {
      fireEvent.click(getByText('Book'))
    })
    await waait(0)
    await wait(() => getByText('Book Entry'))

    const newBook = {
      author: 'ut nulla quam',
      title: 'ipsam nobis cupiditate',
      topic: 'sed dignissimos debitis'
    }

    act(() => {
      fireEvent.change(getByLabelText('author'), { target: { value: newBook.author } })
      fireEvent.change(getByLabelText('title'), { target: { value: newBook.title } })
      fireEvent.change(getByLabelText('topic'), { target: { value: newBook.topic } })
    })

    await act(async () => {
      fireEvent.click(getByText('Submit'))
      await waait(0)
    })

    await waait(5000)

    expect(getByText(newBook.author)).toBeInTheDocument()
    expect(getByText(newBook.title)).toBeInTheDocument()
    expect(getByText(newBook.topic)).toBeInTheDocument()
  }), 60000)

})
