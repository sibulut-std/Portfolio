import { Amplify, Auth } from '@aws-amplify/auth'

Amplify.configure({
  Auth: {
    region: 'us-west-1',
    userPoolId: 'us-west-1_JFYogeWyV',
    userPoolWebClientId: '4tu1jhb0bo762g1k5ra5l1e40p',
    identityPoolId: 'us-west-1:f321bc60-ae42-4d1b-a9a1-e684e4bca005',
  },
})

export async function signUp(email: string, password: string) {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
    })
    return user
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    const user = await Auth.signIn(email, password)
    return user
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export async function signOut() {
  try {
    await Auth.signOut()
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const user = await Auth.currentAuthenticatedUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    throw error
  }
}