import { FirebaseError, initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_F_API_KEY}`,

	authDomain: `${process.env.NEXT_PUBLIC_F_AUTH_DOMAIN}`,

	projectId: `${process.env.NEXT_PUBLIC_F_PROJ_ID}`,

	storageBucket: `${process.env.NEXT_PUBLIC_F_STORAGE_BUCKET}`,

	messagingSenderId: `${process.env.NEXT_PUBLIC_F_MESSAGE_SEND_ID}`,

	appId: `${process.env.NEXT_PUBLIC_F_APP_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const registerWithEmailAndPass = async (
	email: string,
	pass: string
): Promise<string> => {
	const res = await createUserWithEmailAndPassword(auth, email, pass);
	const uid = res.user.uid;

	return uid;
};

const sendPassReset = async (email: string) => {
	await sendPasswordResetEmail(auth, email);
};

const logInWithGoogle = async () => {
	const res = await signInWithPopup(auth, googleProvider);
	const uid = res.user.uid;
	const email = res.user.email;

	return { uid, email };
};

const logInWithEmailAndPass = async (email: string, pass: string) => {
	await signInWithEmailAndPassword(auth, email, pass);
};

const logout = () => {
	signOut(auth);
};

export {
	auth,
	googleProvider,
	registerWithEmailAndPass,
	logInWithEmailAndPass,
	logInWithGoogle,
	sendPassReset,
	logout,
};
