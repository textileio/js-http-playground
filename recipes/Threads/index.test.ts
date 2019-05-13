import textile from '@textile/js-http-client'
import { createLocationDataThread, locationDataThreadKey } from '../Threads/index'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

describe('Threads API Recipes', () => {
  it('Create a thread using one of the default schemas', async (done) => {
    const threadKey = 'io.textile.playground-blobSchema-v0.0.1'
    const blobSchema = (await textile.schemas.defaults()).blob
    const schema = await textile.schemas.add(blobSchema)
    await textile.threads.add('Example Blobs', schema.hash, threadKey, 'public', 'invite_only')

    const thread = await textile.threads.getByKey(threadKey)
    if (!thread) {
      console.info('Example locations thread does not exist')
      return done()
    }
    await textile.threads.remove(thread.id)
    done()
  })

  it('Create a thread a custom JSON schema', async (done) => {
    // See the createLocationDataThread example in index.ts
    await createLocationDataThread()
    const thread = await textile.threads.getByKey(locationDataThreadKey)
    if (!thread) {
      console.info('Example locations thread does not exist')
      return done()
    }
    await textile.threads.remove(thread.id)
    done()
  })
})
