import textile from '@textile/js-http-client'
import * as schemas from '../data/schemas.json'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

const locationDataThreadKey = 'io.textile.playground-locationData-v0.0.1'
const blobDataThreadKey = 'io.textile.playground-blobData-v0.0.1'

jest.setTimeout(25000)

beforeAll(async (done) => {
  // Setting up the required Threads for Files API examples below

  // Location Thread
  const locationDataThreadSchema = schemas[locationDataThreadKey]
  // Ensure the schema is available to the node
  const locationSchema = await textile.schemas.add(locationDataThreadSchema)
  // Create the thread with the supplied schema, only if it doesn't exist
  const locationThread = await textile.threads.getByKey(locationDataThreadKey)
  if (!locationThread) {
    await textile.threads.add('My Places', locationSchema.hash, locationDataThreadKey, 'private', 'invite_only')
  }

  // Blob Thread
  const blobSchema = await textile.schemas.defaultByName('blob')
  // Create the thread with the supplied schema, only if it doesn't exist
  const blobThread = await textile.threads.getByKey(blobDataThreadKey)
  if (!blobThread) {
    // Also test adding a Thread with schema _object_
    await textile.threads.add('Blobs', blobSchema, blobDataThreadKey, 'private', 'invite_only')
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
                      { latitude: 33.968333, longitude: -105.243333 },
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

  it('Add and retrieve blob data to a /blob schema Thread', async (done) => {
    const thread = await textile.threads.getByKey(blobDataThreadKey)
    if (!thread) {
      console.info('Example blob thread does not exist')
      return done()
    }
    try {
      const added = await textile.files.add(
        Buffer.from('some data!'), // Should support strings, Buffers, Files, Blobs, objects, etc
        'a blob of data',
        thread.id
      )
      const files = await textile.files.list()
      const match = files.items.find((file) => file.block === added.block)
      const status = match ? 'success' : 'failure'
      console.info(`File add was a ${status}!`)
    } catch (error) {
      console.info('blob example failed with error:', error)
    }
    done()
  })
})

afterAll(async (done) => {
  // Removing the Threads used in the Files API examples
  for (const key of [locationDataThreadKey, blobDataThreadKey]) {
    const thread = await textile.threads.getByKey(key)
    if (thread) {
      await textile.threads.remove(thread.id)
    }
  }
  done()
})
