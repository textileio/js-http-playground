import textile, { Thread } from '@textile/js-http-client'
import * as schemas from '../data/schemas.json'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

const locationDataThreadKey = 'io.textile.playground-locationData-v0.0.1'

jest.setTimeout(25000)

beforeAll(async (done) => {
  // Setting up the required Threads for Files API examples below
  const locationDataThreadSchema = schemas[locationDataThreadKey]
  // Ensure the schema is available to the node
  const locationSchema = await textile.schemas.add(locationDataThreadSchema)
  // Create the thread with the supplied schema, only if it doesn't exist
  const thread = await textile.threads.getByKey(locationDataThreadKey)
  if (!thread) {
    await textile.threads.add('My Places', locationSchema.hash, locationDataThreadKey, 'private', 'invite_only')
  }
  done()
})

describe('Files API Examples', () => {
  it('Add and retrieve JSON data to a /json schema Thread', async (done) => {
    const thread = await textile.threads.getByKey(locationDataThreadKey)
    if (!thread) {
      console.info('Example locations thread does not exist')
      return done()
    }
    try {
      const added = await textile.files.add(
                      JSON.stringify({ latitude: 33.968333, longitude: -105.243333 }),
                      'home',
                      thread.id
                    )
      const files = await textile.files.list()
      const match = files.items.find((file) => file.block === added.block)
      const status = match ? 'success' : 'failure'
      console.info(`File add was a ${status}!`)
    } catch (error) {
      console.info('JSON example failed with error:', error)
    }
    done()
  })
})

afterAll(async (done) => {
  // Removing the Threads used in the Files API examples
  const thread = await textile.threads.getByKey(locationDataThreadKey)
  if (thread) {
    await textile.threads.remove(thread.id)
  }
  done()
})
