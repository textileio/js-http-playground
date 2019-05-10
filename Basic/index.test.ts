import textile, { Peer } from '@textile/js-http-client'

describe('Explore connected profile', () => {
  let name: string // Set by your profile name
  let profile: Peer
  it('Get the profile name', async () => {
    name = await textile.profile.name()
    expect(name).toBeTruthy()
    console.info('Your are connected:', name)
  })
  it('Get the full profile', async () => {
    profile = await textile.profile.get()
    expect(profile.name).toEqual(name)
    console.info('Your ID is:', profile.id)
  })
})
