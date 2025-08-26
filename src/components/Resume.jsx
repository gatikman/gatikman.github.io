import { useRef, useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PrintStyles = createGlobalStyle`
  @media print {
    @page { size: A4; margin: 16mm; }
    nav { display: none !important; }
    a[href]:after { content: " (" attr(href) ")"; font-weight: normal; font-size: 0.9em; }
    body { background: #fff !important; }
    #resume-sheet { box-shadow: none !important; border: none !important; }
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.55; filter: blur(30px); }
  50% { opacity: 0.85; filter: blur(36px); }
`;

const Page = styled.section`
  position: relative;
  display: grid;
  gap: 1rem;
  background: radial-gradient(1000px 400px at 0% -10%, #eef3ff 0%, rgba(238,243,255,0) 55%),
              radial-gradient(800px 500px at 110% 0%, #e6f7f2 0%, rgba(230,247,242,0) 55%);
  border-radius: 1.25rem;
  padding: 1rem;
  isolation: isolate;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: -20%;
    width: 900px;
    height: 900px;
    transform: translateX(-50%);
    background: radial-gradient(circle at 50% 30%, rgba(14,165,233,0.16), rgba(124,58,237,0.12) 40%, transparent 65%);
    pointer-events: none;
    animation: ${pulse} 9s ease-in-out infinite;
    z-index: -1;
  }
`;

const Header = styled.header`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
  letter-spacing: -0.02em;
  font-weight: 900;
  background: linear-gradient(90deg, #0f172a, #0ea5e9 40%, #7c3aed 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  margin: 0.25rem 0 0;
  color: #1f2937;
  opacity: 0.95;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 0.6rem;
`;

const Button = styled.button`
  appearance: none;
  border: 1px solid transparent;
  background: linear-gradient(90deg, #06b6d4, #0ea5e9 45%, #7c3aed);
  color: #fff;
  padding: 0.6rem 0.9rem;
  border-radius: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: 0 10px 22px rgba(14,165,233,0.18);
  transition: transform 0.1s ease, filter 0.2s ease;
  &:hover { transform: translateY(-1px); filter: brightness(0.98) saturate(110%); }
  &:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
`;

const LinkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.58rem 0.85rem;
  border-radius: 0.7rem;
  border: 1px solid transparent;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  color: #111827;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(2,6,23,0.08); }
  &:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
`;

const Sheet = styled.article`
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #eef2f7;
  box-shadow: 0 8px 22px rgba(0,0,0,0.06);
  padding: 1.25rem;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 880px) {
    padding: 1.75rem 2rem;
  }

  /* Typography for markdown */
  & h2, & h3, & h4 { margin: 1rem 0 0.5rem; line-height: 1.2; }
  & p { margin: 0.4rem 0; color: #374151; }
  & ul { margin: 0.4rem 0 0.6rem 1.2rem; }
  & li { margin: 0.25rem 0; }
  & hr { border: none; border-top: 1px solid #e5e7eb; margin: 1rem 0; }
  & a { color: #0ea5e9; text-decoration: underline; }
`;

export default function Resume() {
  const sheetRef = useRef(null);
  const [resumeMd, setResumeMd] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/files/resume.md')
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error('Failed to load resume.md'))))
      .then((text) => { if (active) setResumeMd(text); })
      .catch((err) => { console.error(err); });
    return () => { active = false; };
  }, []);

  const handlePrint = () => {
    // Print the page (CSS hides everything but the resume sheet)
    window.print();
  };

  return (
    <Page aria-labelledby="resume-title">
      <PrintStyles />
      <Header>
        <Title id="resume-title">Resume</Title>
        <Subtitle>Experience, projects, languages, and contact details.</Subtitle>
        <Actions>
          <Button as="a" href="/files/resume.pdf" download aria-label="Download resume as PDF">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M12 14V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M9 11l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="14" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.6"/></svg>
            Download PDF
          </Button>
          <LinkBtn href="/files/resume.md" target="_blank" rel="noopener">            
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5"/><path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 13h8M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            View Markdown
          </LinkBtn>
        </Actions>
      </Header>

      <Sheet id="resume-sheet" ref={sheetRef} aria-label="Printable resume">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resumeMd}</ReactMarkdown>
      </Sheet>
    </Page>
  );
}