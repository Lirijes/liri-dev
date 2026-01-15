const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-xl text-foreground">
            Lirije<span className="text-primary">.</span>
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lirije Shabani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
