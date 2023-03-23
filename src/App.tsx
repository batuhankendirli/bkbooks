import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import MyBooks from './pages/MyBooks';
import BookDetails from './pages/BookDetails';
import GoTop from './components/GoTop';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Slide } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { setBooks, setLoading, setUser } from './store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './store/thunks/firebase';
import { collection, DocumentData, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { BookProps } from './Types';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(
        setUser({
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          email: currentUser?.email,
          photoURL: currentUser?.photoURL,
        })
      );
    });

    if (auth.currentUser) {
      const q = query(collection(db, auth.currentUser?.uid), orderBy('createdAt'));

      const handleBooksSnapshot = (querySnapshot: QuerySnapshot<DocumentData>) => {
        const books = querySnapshot.docs.map((doc) => doc.data() as BookProps);
        dispatch(setBooks(books));
        dispatch(setLoading(false));
      };
      const unsub = onSnapshot(q, handleBooksSnapshot);
      return () => {
        unsub();
      };
    } else {
      dispatch(setBooks(null));
    }
    return () => {
      unsubscribe();
    };
  }, [user.uid, user.displayName, user.photoURL]);

  return (
    <div>
      <SkeletonTheme baseColor="#b7b7b7" highlightColor="#c8c8c8">
        <ToastContainer
          position="top-right"
          style={{
            fontSize: '1.6rem',

            lineHeight: '1.3',
          }}
          transition={Slide}
          theme="colored"
          closeOnClick={true}
          pauseOnFocusLoss={false}
          autoClose={3000}
          toastStyle={{
            animationDuration: '.3s',
            fontFamily: 'Inter',
            fontWeight: '400',
          }}
          draggablePercent={30}
        />

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/my-books"
            element={
              <ProtectedRoute>
                <MyBooks />
              </ProtectedRoute>
            }
          />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
        <GoTop />
        <Footer />
      </SkeletonTheme>
    </div>
  );
};

export default App;
