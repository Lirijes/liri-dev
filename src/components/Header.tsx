import { Mail, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const HeaderLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    {children}
  </a>
);

const Header = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#" 
          className="font-display text-2xl text-foreground"
        >
          Lirije<span className="text-primary">.</span>
        </motion.a>
        
        <nav className="hidden md:flex items-center gap-8">
          <HeaderLink href="#about">About</HeaderLink>
          <HeaderLink href="#experience">Experience</HeaderLink>
          <HeaderLink href="#skills">Skills</HeaderLink>
          <HeaderLink href="#education">Education</HeaderLink>
          <HeaderLink href="#contact">Contact</HeaderLink>
        </nav>

        <div className="flex items-center gap-4">
          <motion.a 
            href="https://github.com/lirijes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/lirijes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text transition-colors"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a 
            href="mailto:Lirije11@hotmail.com"
            className="text-muted-foreground hover:text transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
