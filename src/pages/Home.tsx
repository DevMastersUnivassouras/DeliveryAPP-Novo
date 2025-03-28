
import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

const Home = () => {
  return (
    <div className="page-transition">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
