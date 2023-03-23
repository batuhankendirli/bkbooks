import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { BookProps } from '../../Types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export const signInUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success(`Welcome back${auth.currentUser?.displayName == null ? '' : ` ${auth.currentUser.displayName}`}!`, {
      autoClose: 5000,
    });
    return {
      displayName: userCredential.user.displayName,
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error: any) {
    if (error.code === 'auth/invalid-email') {
      toast.error('The provided value for the email is invalid.', {
        toastId: 'invalid-email',
      });
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      toast.error('Incorrect email or password.', {
        autoClose: 5000,
        toastId: 'incorrect',
      });
    } else if (error.code === 'auth/too-many-requests') {
      toast.error(
        'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
        {
          autoClose: 10000,
          toastId: 'disabled',
        }
      );
    } else {
      toast.error(error.message);
    }
  }
};

export const registerUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    toast.success('Hurrayy! Welcome to BKMovies!', { autoClose: 7500 });
    return {
      displayName: userCredential.user.displayName,
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error: any) {
    if (error.code === 'auth/invalid-email') {
      toast.error('The provided value for the email is invalid.', {
        toastId: 'invalid-email',
      });
    } else if (error.code === 'auth/weak-password') {
      toast.error('The password must be 6 characters long or more.', {
        autoClose: 7500,
        toastId: 'weak-password',
      });
    } else if (error.code === 'auth/email-already-in-use') {
      toast.error('The email address is already in use by another account.', {
        autoClose: 7500,
        toastId: 'already-in-use',
      });
    } else {
      toast.error(error.message);
    }
  }
};

export const logOutUser = async () => {
  try {
    if (auth.currentUser) {
      toast.success(`${auth.currentUser.email} signed out.`);
      await signOut(auth);
    }
  } catch (error: any) {
    toast.error(`${error.message}`);
  }
};

export const addBook = async (data: BookProps) => {
  try {
    if (auth.currentUser) {
      await setDoc(doc(db, `${auth.currentUser.uid}/${data.id}`), {
        ...data,
        createdAt: new Date().getTime(),
      });
      toast.success('Added to My Books');

      return true;
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const removeBook = async (data: BookProps) => {
  try {
    if (auth.currentUser) {
      await deleteDoc(doc(db, auth.currentUser.uid, data.id));
      toast.error('Removed from My Books.');
      return true;
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

type UpdateUserDataType =
  | {
      displayName: string;
      photoURL: string;
    }
  | false;

export const updateUserData = async (displayName: string, photoURL = ''): Promise<UpdateUserDataType> => {
  try {
    if (auth.currentUser) {
      const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
      if (!urlRegex.test(photoURL) && photoURL !== '') {
        throw new Error('Invalid photo URL');
      }
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      toast.success('Profile updated!');
      return { displayName, photoURL };
    }
    return false;
  } catch (error: any) {
    if (error.code === 'auth/invalid-profile-attribute') {
      toast.error('Photo URL is too long.');
    } else if (error.message === 'Invalid photo URL') {
      toast.error('Please enter a valid photo URL.');
    } else {
      toast.error(error.message);
    }
    return false;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success(`A password reset link has been sent to ${email}.`, {
      autoClose: 10000,
    });
  } catch (error: any) {
    if (error.code === 'auth/missing-email' || error.code === 'auth/invalid-email') {
      toast.error('The provided value for the email is invalid.', {
        toastId: 'invalid-email',
      });
    } else if (error.code === 'auth/user-not-found') {
      toast.error('There is no user record corresponding to this email. The user may have been deleted.', {
        autoClose: 7500,
        toastId: 'not-found',
      });
    } else {
      toast.error(error.message);
    }
  }
};
