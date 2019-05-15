import textile from '@textile/js-http-client'
import * as schemas from '../data/schemas.json'

export const locationDataThreadKey = 'io.textile.playground-locationData-v0.0.1'
export async function createLocationDataThread() {
  try {
    await removeLocationDataThread()
    // Setting up the required Threads for Files API examples below
    const locationDataThreadSchema = schemas[locationDataThreadKey]
    // Ensure the schema is available to the node
    const locationSchema = await textile.schemas.add(locationDataThreadSchema)
    // Create the thread with the supplied schema, only if it doesn't exist
    const thread = await textile.threads.getByKey(locationDataThreadKey)
    if (!thread) {
      await textile.threads.add('My Places', locationSchema.hash, locationDataThreadKey, 'private', 'invite_only')
    }
  } catch (error) {
    console.error('Location data thread setup failed')
  }
}
export async function removeLocationDataThread() {
  const thread = await textile.threads.getByKey(locationDataThreadKey)
  if (thread) {
    await textile.threads.remove(thread.id)
  }
}

export const blobThreadKey = 'io.textile.playground-blobExample-v0.0.1'
export async function createBlobThread() {
  try {
    await removeBlobThread()
    // Create the thread with the supplied schema, only if it doesn't exist
    const thread = await textile.threads.getByKey(blobThreadKey)
    if (!thread) {
      await textile.threads.add('My Files', 'blob', blobThreadKey, 'private', 'invite_only')
    }
  } catch (error) {
    console.error('Blob thread setup failed')
  }
}

export async function removeBlobThread() {
  const thread = await textile.threads.getByKey(blobThreadKey)
  if (thread) {
    await textile.threads.remove(thread.id)
  }
}