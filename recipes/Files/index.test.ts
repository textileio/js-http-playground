import textile from '@textile/js-http-client'
import * as fs from 'fs'
import * as path from 'path'
import { createLocationDataThread, locationDataThreadKey, createBlobThread, removeLocationDataThread, removeBlobThread, blobThreadKey } from '../Threads/index'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */


jest.setTimeout(35000)

beforeAll(async (done) => {
  await createLocationDataThread()
  await createBlobThread()
  done()
})

describe('Files API Recipes', () => {
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

  it.only('Add and retrieve buffer data to a /blob schema Thread', async (done) => {
    const thread = await textile.threads.getByKey(blobThreadKey)
    if (thread) {
      try {
        const file = path.resolve(__dirname, '../assets/edba-3756.mp3')
        const data = await fs.readFileSync(file, { encoding: 'base64' })
        const added = await textile.files.add(
                        data,
                        'hello world',
                        thread.id
                      )
      } catch (error) {
        console.info('Blob example failed with error:', error)
      }
    }
    done()
  })
})

afterAll(async (done) => {
  // Removing the Threads used in the Files API examples
  await removeLocationDataThread()
  await removeBlobThread()
  done()
})
