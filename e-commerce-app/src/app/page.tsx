import HeroSlider from "./_components/HeroSlider/HeroSlider";
import HomeFeatureCards from "./_components/HomeFeatureCards/HomeFeatureCards";
import HomeCategories from "./_components/HomeCategories/HomeCategories";
import PromoBanners from "./_components/PromoBanners/PromoBanners";
import FeaturedProducts from "./_components/FeaturedProducts/FeaturedProducts";
import NewsletterApp from "./_components/NewsletterApp/NewsletterApp";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <HomeFeatureCards />

      <HomeCategories />

      <PromoBanners />

      <FeaturedProducts />

      <NewsletterApp />
    </>
  );
}
