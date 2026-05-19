import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Services from "./components/Services";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Services />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
