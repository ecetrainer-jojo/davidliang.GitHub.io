import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { FloatingNav } from './components/FloatingNav';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <FloatingNav />
      <Hero />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}