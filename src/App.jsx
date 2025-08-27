
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { initAnalytics, trackEvent, trackPageView } from './lib/analytics';
import Home from './components/Home';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import NotFound from './components/NotFound';

const pulse = keyframes`
  0%, 100% { opacity: 0.55; filter: blur(30px); }
  50% { opacity: 0.85; filter: blur(36px); }
`;

// Global styles for accessibility and modern look
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', Arial, sans-serif;
    background: #f8f9fa;
    color: #222;
    min-height: 100vh;
    background: radial-gradient(1200px 500px at 10% 0%, #eef3ff 0%, rgba(238,243,255,0) 50%),
              radial-gradient(800px 400px at 100% 10%, #e6f7f2 0%, rgba(230,247,242,0) 50%),
              #f8fafc;
    
    /* soft patterned grid */
    &::before {
      content: '';
      position: absolute;
      inset: -2px;
      background: radial-gradient(1200px 600px at -10% -20%, rgba(99,102,241,0.14), transparent 60%),
                  radial-gradient(900px 600px at 120% -10%, rgba(45,212,191,0.18), transparent 55%);
      z-index: -1;
    }

    /* spotlight glow */
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 10%;
      width: 900px;
      height: 900px;
      transform: translateX(-50%);
      background: radial-gradient(circle at 50% 30%, rgba(14,165,233,0.16), rgba(124,58,237,0.12) 40%, transparent 65%);
      pointer-events: none;
      animation: ${pulse} 9s ease-in-out infinite;
      z-index: -1;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  /* Smooth scrolling for in-page links */
  html { scroll-behavior: smooth; }
`;

const blurIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.7);
  backdrop-filter: saturate(140%) blur(8px);
  -webkit-backdrop-filter: saturate(140%) blur(8px);
  border-bottom: 1px solid rgba(226,232,240,0.7);
  box-shadow: 0 6px 24px rgba(2,6,23,0.04);
`;

const NavBar = styled.nav`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${blurIn} 280ms ease-out both;
`;

const Brand = styled(Link)`
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: 1.15rem;
  background: linear-gradient(90deg, #0f172a, #0ea5e9 40%, #7c3aed 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  padding: 0;

  @media (max-width: 760px) {
    position: absolute;
    left: 0; right: 0;
    top: 60px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 0.75rem;
    width: min(92vw, 560px);
    background: rgba(255,255,255,0.96);
    border: 1px solid #e5e7eb;
    border-radius: 0.85rem;
    box-shadow: 0 16px 32px rgba(15,23,42,0.12);
    transform: translateY(${props => props['data-open'] ? '0' : '-12px'});
    opacity: ${props => props['data-open'] ? 1 : 0};
    pointer-events: ${props => props['data-open'] ? 'auto' : 'none'};
    transition: opacity 160ms ease, transform 180ms ease;
  }
`;

const MenuItem = styled.li``;

const MenuLink = styled(NavLink)`
  position: relative;
  display: inline-block;
  padding: 0.55rem 0.9rem;
  border-radius: 0.65rem;
  color: #0f172a;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: color 0.15s ease, background 0.15s ease, transform 0.1s ease;
  background: transparent;

  &:hover { background: #f1f5f9; transform: translateY(-1px); }

  &.active {
    background: linear-gradient(#ffffff,#ffffff) padding-box,
                linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
    border: 1.5px solid transparent;
    box-shadow: 0 10px 22px rgba(14,165,233,0.14);
  }

  /* Gradient underline indicator (desktop) */
  @media (min-width: 761px) {
    &::after {
      content: '';
      position: absolute;
      left: 12px; right: 12px; bottom: 6px;
      height: 2px;
      border-radius: 2px;
      background: linear-gradient(90deg, #06b6d4, #0ea5e9 45%, #7c3aed);
      opacity: 0;
      transform: translateY(3px);
      transition: opacity 160ms ease, transform 160ms ease;
    }
    &:hover::after, &.active::after { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 760px) { padding: 0.8rem 0.95rem; }
`;

const Burger = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  border-radius: 0.6rem;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 180ms ease;
  box-shadow: 0 6px 16px rgba(2,6,23,0.08);

  &:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(2,6,23,0.12); }
  &:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }

  @media (max-width: 760px) { display: inline-flex; }

  span, span::before, span::after {
    content: '';
    display: block;
    width: 18px; height: 2px;
    background: #0f172a;
    border-radius: 2px;
    transition: transform 180ms ease, opacity 160ms ease;
    position: relative;
  }
  span::before { position: absolute; top: -6px; }
  span::after { position: absolute; top: 6px; }

  &[aria-expanded='true'] span { background: transparent; }
  &[aria-expanded='true'] span::before { transform: translateY(6px) rotate(45deg); }
  &[aria-expanded='true'] span::after { transform: translateY(-6px) rotate(-45deg); }
`;

const MobileBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.28);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 90;
  opacity: ${props => props['data-open'] ? 1 : 0};
  pointer-events: ${props => props['data-open'] ? 'auto' : 'none'};
  transition: opacity 180ms ease;

  @media (min-width: 761px) { display: none; }
`;

const Main = styled.main`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

// Tracks route changes for GA4 page_view events
function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);
  return null;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { initAnalytics(); }, []);
  return (
    <Router>
      <GlobalStyle />
      <Header>
        <NavBar aria-label="Main navigation">
          <Brand to="/">AG</Brand>
          <Burger
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span />
          </Burger>
          <Menu id="site-menu" data-open={menuOpen}>
                <MenuItem>
            <MenuLink to="/" end onClick={() => { setMenuOpen(false); trackEvent('nav_click', { label: 'Home' }); }}>Home</MenuLink>
                </MenuItem>
                <MenuItem>
            <MenuLink to="/about" onClick={() => { setMenuOpen(false); trackEvent('nav_click', { label: 'About' }); }}>About Me</MenuLink>
                </MenuItem>
                <MenuItem>
            <MenuLink to="/resume" onClick={() => { setMenuOpen(false); trackEvent('nav_click', { label: 'Resume' }); }}>Resume</MenuLink>
                </MenuItem>
                <MenuItem>
            <MenuLink to="/projects" onClick={() => { setMenuOpen(false); trackEvent('nav_click', { label: 'Projects' }); }}>Projects</MenuLink>
                </MenuItem>
          </Menu>
        </NavBar>
        <MobileBackdrop data-open={menuOpen} onClick={() => setMenuOpen(false)} />
      </Header>
      <RouteChangeTracker />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
