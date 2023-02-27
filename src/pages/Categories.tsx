import BookSlider from '../components/BookSlider';

const Categories = () => {
  return (
    <div className="section-categories section-mt">
      <p className="section-categories-header">
        Don't know what to read? Here are some cool categories listed for you!
      </p>
      <div className="section-categories-slides">
        <BookSlider category="Korku" />
        <BookSlider category="Aksiyon" />
        <BookSlider category="Bilim & Kurgu" />
        <BookSlider category="Gerilim" />
        <BookSlider category="Biyografi" />
        <BookSlider category="Sosyoloji" />
      </div>
    </div>
  );
};

export default Categories;
