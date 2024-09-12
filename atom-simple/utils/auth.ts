// utils/auth.ts

import { Amplify } from 'aws-amplify';
import { signUp as amplifySignUp, signIn as amplifySignIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-west-1_JFYogeWyV',
      userPoolClientId: '4tu1jhb0bo762g1k5ra5l1e40p',
      identityPoolId: 'us-west-1:f321bc60-ae42-4d1b-a9a1-e684e4bca005',
    }
  },
});

export const signUp = async (email: string, password: string) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email, // Required attribute
      },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function signIn(email: string, password: string) {
  try {
    const { isSignedIn, nextStep } = await amplifySignIn({ username: email, password });
    return { isSignedIn, nextStep };
  } catch (error) {
    console.error('Error signing in:', error);
    if (error instanceof Error && 'name' in error) {
      switch (error.name) {
        case 'NotAuthorizedException':
          throw new Error('Incorrect email or password.');
        case 'UserNotFoundException':
          throw new Error('User does not exist.');
        case 'UserNotConfirmedException':
          throw new Error('User is not confirmed. Please confirm your account.');
        case 'InvalidParameterException':
          throw new Error('Invalid parameters provided. Please check your input.');
        default:
          throw new Error(`Authentication failed: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred during authentication.');
    }
  }
}

export async function signOutUser() {
  try {
    await signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    if (error instanceof Error) {
      throw new Error(`Sign out failed: ${error.message}`, { cause: error });
    } else {
      throw new Error('An unknown error occurred during sign out.');
    }
  }
}

export async function getCurrentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    return {
      username: user.username,
      // Add any other properties you need from the user object
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get current user: ${error.message}`, { cause: error });
    } else {
      throw new Error('An unknown error occurred while getting the current user.');
    }
  }
}