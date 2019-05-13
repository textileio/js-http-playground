import textile, { Peer } from '@textile/js-http-client'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

jest.setTimeout(25000)

describe('Profile API Examples', () => {
  it('Get your profile, change your name, revert it back to current name', async (done) => {
    let profile: Peer
    let name: string
    let success: boolean

    // Simply get your display name
    name = await textile.profile.name()
    console.info('Your are connected:', name)

    // Get your full profile record
    profile = await textile.profile.get()
    console.info('Your ID is:', profile.id)

    // Set your display name to 'Anonymous'
    success = await textile.profile.setName('Anonymous')
    const updatedProfile = await textile.profile.get()
    console.info('Profile name updated to:', updatedProfile.name)

    success = await textile.profile.setName(name)
    console.info('Your name is now reverted to:', name)

    // Jest Tests to ensure your account reverted successfully
    await expect(success).toBeTruthy()
    await expect((await textile.profile.get()).name).toEqual(name)
    done()
  })
})
