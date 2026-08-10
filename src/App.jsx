import { Header, Hero, About, Skills, Projects, Experience, Contact, Footer } from '@/components';
import { useTheme } from '@/hooks';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
