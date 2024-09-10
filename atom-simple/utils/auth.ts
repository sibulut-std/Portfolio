import { Amplify } from 'aws-amplify';
import { signUp as amplifySignUp, signIn as amplifySignIn, signOut, getCurrentUser } from 'aws-amplify/auth';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-west-1_JFYogeWyV',
      userPoolClientId: '4tu1jhb0bo762g1k5ra5l1e40p',
      identityPoolId: 'us-west-1:f321bc60-ae42-4d1b-a9a1-e684e4bca005',
    }
  },
});

export async function signUp(email: string, password: string) {
  try {
    const result = await amplifySignUp({
      username: email,
      password,
    });
    return result;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const user = await amplifySignIn({ username: email, password });
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function getCurrentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}