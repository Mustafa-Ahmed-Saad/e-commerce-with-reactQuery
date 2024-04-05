import "./Navbar.css";

import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useContextMain } from "../../contexts/MainContext";
import ToggleModeCheck from "../toggleModeCheck/ToggleModeCheck";
import { useRef } from "react";
import NavbarCollapse from "./navbarCollapse/NavbarCollapse";
import ResponsiveNavToggle from "./navbarToggle/ResponsiveNavToggle";
import Logo from "./logo/Logo";

export default function MainNavbar() {
  const { mode, setMode, mainColor } = useContextMain();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const inputRef = useRef();
  let scrollOffset = 0;

  const toggleMode = (isChecked) => {
    const htmlTag = document.documentElement;

    if (isChecked) {
      // isChecked = true = dark
      htmlTag.setAttribute("data-bs-theme", "dark");
      setMode("dark");
    } else {
      // isChecked = false = light
      htmlTag.setAttribute("data-bs-theme", "light");
      setMode("light");
    }
  };

  const handleScroll = () => {
    // true: remove class scroll up  |  false: add class scroll down
    scrollOffset > window.pageYOffset
      ? setIsScrollDown(false)
      : setIsScrollDown(true);

    scrollOffset = window.pageYOffset;

    window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
  };

  const handleModeInput = () => {
    if (mode) {
      if (mode === "light") {
        // set mode light = false
        if (inputRef.current.checked === true) {
          inputRef.current.checked = false;
        }
        toggleMode(false);
      } else {
        // set mode dark = true
        if (inputRef.current.checked === false) {
          inputRef.current.checked = true;
        }
        toggleMode(true);
      }
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // dark = true;
        inputRef.current.checked = true;
        toggleMode(true);
      } else {
        // light = false
        inputRef.current.checked = false;
        toggleMode(false);
      }
    }
  };

  useEffect(() => {
    handleModeInput();

    // change value of mainColor variable in html tag
    mainColor &&
      document.documentElement.style.setProperty("--main-color", mainColor);

    // add scroll event
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="xl"
      className={`main-navbar bg-body-tertiary position-fixed w-100 top-0 z-2 ${
        isScrolled ? "scrolled" : ""
      } ${isScrollDown ? "top-n65" : ""}`}
    >
      <Container>
        {/* logo */}
        <Logo />

        {/* toggle mode and collapce icon*/}
        <div className="mode-check-container ms-auto me-2 ms-xl-3 d-block d-xl-none">
          <ToggleModeCheck toggleMode={toggleMode} inputRef={inputRef} />
        </div>
        {/* Navbar.Toggle - toggle btn */}
        <ResponsiveNavToggle
          Toggle={Navbar.Toggle}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        {/* Navbar.Collapse - links */}
        <NavbarCollapse Collapse={Navbar.Collapse} />

        <div className="mode-check-container ms-auto me-2 ms-xl-3 d-none d-xl-block">
          <ToggleModeCheck toggleMode={toggleMode} inputRef={inputRef} />
        </div>
      </Container>
    </Navbar>
  );
}
