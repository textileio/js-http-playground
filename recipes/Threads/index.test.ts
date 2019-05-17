import textile from '@textile/js-http-client'
import * as slateSchema from '../data/slatejs.json'
import { createLocationDataThread, locationDataThreadKey, blobThreadKey, removeBlobThread, removeLocationDataThread, slateNotesThreadKey } from '../Threads/index'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

jest.setTimeout(10000)

beforeAll(async (done) => {
  await removeBlobThread() // <- only remove it, since test below test will create new one
  done()
})

describe('Threads API Recipes', () => {
  it('Create a thread using one of the default schemas', async (done) => {

    await textile.threads.add('Example Blobs', 'blob', blobThreadKey, 'public', 'invite_only')

    const thread = await textile.threads.getByKey(blobThreadKey)
    if (!thread) {
      console.info('Example locations thread does not exist')
      return done()
    }
    console.info('Custom location data thread success!')
    done()
  })

  it('Create a thread a custom JSON schema', async (done) => {
    await createLocationDataThread()
    // See the createLocationDataThread example in index.ts
    const thread = await textile.threads.getByKey(locationDataThreadKey)
    if (!thread) {
      console.info('Example locations thread does not exist')
      return done()
    }
    console.info('Custom JSON thread success!')
    done()
  })

afterAll(async (done) => {
  // Removing the Threads used in the Files API examples
  await removeLocationDataThread()
  await removeBlobThread()
  done()
})
