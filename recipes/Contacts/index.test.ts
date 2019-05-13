import textile, { Peer, QueryResult } from '@textile/js-http-client'
import { ReadResult } from 'web-streams-polyfill'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

jest.setTimeout(15000)
describe('Contacts API Examples', () => {
  it('Search contacts for Andrew', async (done) => {
    const stream = await textile.contacts.search('Andrew')
    const reader = stream.getReader()
    let resultCount = 0
    const read = (result: ReadResult<QueryResult>) => {
      if (result.done) {
        return
      }
      try {
        console.info('New search result', result.value.value.name)
        resultCount += 1
      } catch (err) {
        reader.cancel('error')
        done()
        return
      }
      reader.read().then(read)
    }
    reader.read().then(read)

    // Wait 10s for search results to stream in
    await (new Promise((resolve) => setTimeout(resolve, 10000)))
    reader.cancel('timeout')
    console.info('Ending search after 10s')
    console.info('Contact search found:', `${resultCount} results`)
    return done()
  })
})
