import { Amplify, Auth } from '@aws-amplify/auth'

Amplify.configure({
  Auth: {
    region: 'YOUR_AWS_REGION',
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_USER_POOL_WEB_CLIENT_ID',
    identityPoolId: 'YOUR_IDENTITY_POOL_ID',
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