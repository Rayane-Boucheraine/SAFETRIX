import React from "react";

const NavBar = () => {
  // Array of navigation items
  const navItems = [
    { id: 1, name: "Home", href: "#" },
    { id: 2, name: "About", href: "#" },
    { id: 3, name: "Services", href: "#" },
    { id: 4, name: "Bug Bounty", href: "#" },
    { id: 5, name: "Contact", href: "#" },
  ];

  return (
    <nav className="">
      <ul className="flex items-center gap-10">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="relative text-[#FFFFFF] text-[15px] duration-300 hover:text-[#0ACF83] after:w-0 after:h-[2px] after:bg-[#0ACF83] after:absolute after:left-0 after:bottom-[-6px] after:rounded-[10px] after:duration-300 hover:after:w-full"
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
