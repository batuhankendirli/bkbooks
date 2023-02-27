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

const App = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#b7b7b7" highlightColor="#c8c8c8">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>

        <GoTop />
        <Footer />
      </SkeletonTheme>
    </div>
  );
};

export default App;
