import textile, { Peer } from '@textile/js-http-client'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

jest.setTimeout(25000)

describe('Profile API Recipes', () => {
  it('Get your profile and display name', async (done) => {

    // Simply get your display name
    const name = await textile.profile.name()
    console.info('Your are connected:', name)

    // Get your full profile record
    const profile = await textile.profile.get()
    console.info('Your ID is:', profile.id)

    done()
  })
})
