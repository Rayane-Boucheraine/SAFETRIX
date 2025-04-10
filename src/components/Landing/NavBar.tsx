import React from "react";

const NavBar = () => {
  // Array of navigation items with updated hrefs
  const navItems = [
    // Consider adding '/' or '#home' if you have a distinct Hero section ID
    { id: 1, name: "Home", href: "/#home" }, // Link to top or specific home section
    { id: 2, name: "About", href: "/#about" },
    { id: 3, name: "Services", href: "/#services" },
    { id: 4, name: "Bug Bounty", href: "/#bug-bounty" }, // Give your bug bounty section this ID
    { id: 5, name: "Pricing", href: "/#pricing" },
    { id: 6, name: "Contact", href: "/#contact" }, // Points to the footer/contact section
  ];

 
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-8 lg:gap-12">
        {navItems.map((item, index) => (
          <li
            key={item.id}
           
            className={`animate-fade-in-down`}
            style={{ animationDelay: `${100 + index * 75}ms` }} 
          >
            <a
              href={item.href}
              className="relative text-[#E0E0E0] text-[16px] transition-colors duration-300 ease-in-out hover:text-[#0ACF83] after:content-[''] after:w-0 after:h-[2px] after:bg-[#0ACF83] after:absolute after:left-0 after:bottom-[-6px] after:rounded-[10px] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    
  );
};

export default NavBar;
