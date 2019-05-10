import textile, { Peer } from '@textile/js-http-client'

/**
 * INFO:
 * All tests require that you have a locally running Textile Daemon
 * or a locally running Textile Desktop application. These examples
 * Also require that you have your local Textile node running on the
 * default ports.
 */

describe('Explore connected profile', () => {
  let profile: Peer
  let name: string
  let success: boolean
  it('1. Get your profile name', async () => {
    name = await textile.profile.name()
    await expect(name).toBeTruthy()
    console.info('Your are connected:', name)
  })
  it('2. Get your full profile', async () => {
    profile = await textile.profile.get()
    await expect(profile).toBeTruthy()
    await expect(profile.name).toEqual(name)
    console.info('Your ID is:', profile.id)
  })
  it('3. Update your profile name', async () => {
    success = await textile.profile.setName('Anonymous')
    await expect(success).toBeTruthy()
    let updatedProfile = await textile.profile.get()
    console.info('Profile name updated to:', updatedProfile.name)
    await expect(updatedProfile.name).toEqual('Anonymous')
  })
  it('4. Set your profile name back to original', async (done) => {
    success = await textile.profile.setName(name)
    await expect(success).toBeTruthy()
    console.info('Your name is now back to:', name)
    await expect((await textile.profile.get()).name).toEqual(name)
    done()
  })
})
