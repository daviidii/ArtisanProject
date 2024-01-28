import Hero from "../Components/Hero";
import Categories from "../Components/Categories";
import About from "../Components/About";
import Questions from "../Components/Questions";
import Blogs from "../Components/Blogs";
import Newsletter from "../Components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <About />
      <Questions />
      <Blogs />
      <Newsletter />
    </>
  );
}
