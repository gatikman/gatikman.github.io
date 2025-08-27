import { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 0.55; filter: blur(30px); }
  50% { opacity: 0.85; filter: blur(36px); }
`;

const Page = styled.section`
  position: relative;
  display: grid;
  gap: 1.25rem;
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
    pointer-events: none;
    animation: ${pulse} 9s ease-in-out infinite;
    z-index: -1;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.6rem);
  margin: 0;
  letter-spacing: -0.02em;
  font-weight: 900;
  background: linear-gradient(90deg, #0f172a, #0ea5e9 40%, #7c3aed 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  margin: 0.25rem auto 0;
  color: #1f2937;
  opacity: 0.95;
  max-width: 70ch;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 0.75rem 0 0.25rem;
`;

const Tag = styled.button`
  appearance: none;
  border: 1px solid transparent;
  background: ${({ active }) => (active ? 'linear-gradient(90deg, #06b6d4, #0ea5e9 45%, #7c3aed)' : 'linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(120deg, #7c3aed, #0ea5e9) border-box')};
  color: ${({ active }) => (active ? '#fff' : '#0f172a')};
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(14,165,233,0.12); }
  &:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
  @media (min-width: 720px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`;

const Card = styled.article`
  background: rgba(255,255,255,0.85);
  border: 1px solid #eef2f7;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(0,0,0,0.01);
  display: grid;
  grid-template-rows: auto 1fr;
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-3px); box-shadow: 0 10px 10px rgba(15,23,42,0.12); }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: #f1f5f9;
  &::after {
    content: '';
    position: absolute; inset: 0;
  background: linear-gradient(0deg, rgba(2,6,23,0.22), rgba(2,6,23,0));
  pointer-events: none;
  }
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Carousel styles
const CarouselViewport = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  transform: translateX(${props => `-${props.index * 100}%`});
  transition: transform 280ms ease;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.dir === 'prev' ? 'left: 8px;' : 'right: 8px;')}
  display: grid; place-items: center;
  width: 36px; height: 36px;
  border-radius: 0.6rem;
  border: 1px solid transparent;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  box-shadow: 0 8px 16px rgba(2,6,23,0.14);
  cursor: pointer;
  transition: transform 120ms ease;
  z-index: 2;
  &:hover { transform: translateY(-50%) translateY(-1px); }
  &:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
`;

const Dots = styled.div`
  position: absolute;
  left: 50%; bottom: 8px;
  transform: translateX(-50%);
  display: flex; gap: 6px;
  z-index: 2;
`;

const Dot = styled.button`
  width: 8px; height: 8px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: ${props => (props['data-active'] ? 'linear-gradient(90deg, #06b6d4, #0ea5e9 45%, #7c3aed)' : 'linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(120deg, #7c3aed, #0ea5e9) border-box')};
  cursor: pointer;
  padding: 0; margin: 0;
`;

const Content = styled.div`
  padding: 1rem;
  display: grid;
  gap: 0.6rem;
`;

const PTitle = styled.h2`
  margin: 0;
  font-size: 1.15rem;
`;

const Desc = styled.p`
  margin: 0;
  color: #475569;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Chip = styled.span`
  font-size: 0.8rem;
  padding: 0.3rem 0.55rem;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  color: #0f172a;
  border: 1px solid transparent;
  border-radius: 999px;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 0.3rem;
`;

const LinkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.6rem;
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

const DisabledBtn = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.6rem;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  color: #9ca3af;
  font-weight: 700;
  pointer-events: none;
  user-select: none;
`;

function svgPlaceholder(title) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='#0ea5e9'/>
        <stop offset='100%' stop-color='#7c3aed'/>
      </linearGradient>
    </defs>
    <rect width='1280' height='720' fill='url(#g)'/>
    <g fill='rgba(255,255,255,0.9)'>
      <circle cx='1100' cy='80' r='6'/>
      <circle cx='1140' cy='120' r='4'/>
      <circle cx='1180' cy='60' r='5'/>
    </g>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='48' font-weight='800' fill='white'>${title}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const PROJECTS = [
  {
    title: 'Digital Arena – SaaS for Sports Broadcasting',
    desc: 'Cloud-first live sports production platform. Spearheaded full-stack architecture, and multi-tenant SaaS delivery. Built with ReactJS, Vite, and fastify.',
    tags: ['ReactJS','Typescript','SaaS','Vite','fastify','Docker'],
    demo: 'https://digital-arena.eu/',
    images: [
      '/images/digital-arena.png',
      '/images/digital-arena2.png',
      '/images/digital-arena3.png',
      '/images/digital-arena4.png'
    ],
  },
  {
    title: 'AlgoTrade — Proprietary Trading Backbone',
    desc: 'From-scratch backbone for research, backtesting, signal generation, order routing, and reporting. Automated scanning across stocks, crypto, FX, indices, and CFDs.',
    tags: ['Python', 'Postgresql','Trading','Backtesting','Machine Learning','Automation','Docker'],
    images: [
      '/images/trade1.png',
      '/images/trade2.png',
    ],
  },
  {
    title: 'cbschatbot – AI Chatbot for CBS',
    desc: 'Notebooks and reusable components for signal research, parameter sweeps, and walk-forward tests.',
    tags: ['Python','Backtesting','Research', 'OpenSource', 'MetaAI'],
    github: 'https://github.com/cbscode/cbschatbot',
    images: [
      '/images/chatbot.png',
      '/images/chatbot.png',
    ],
  },
].map(p => ({
  ...p,
  image: p.image ?? svgPlaceholder(p.title),
  images: p.images ?? [p.image ?? svgPlaceholder(p.title)],
}));

// Simple, accessible carousel used per-card when images > 1
function Carousel({ images, title }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (d) => setIndex((i) => (i + d + count) % count);
  const to = (i) => setIndex(i);
  return (
    <CarouselViewport aria-label={`${title} screenshots`}>
      <CarouselTrack index={index} role="listbox" aria-live="polite">
        {images.map((src, i) => (
          <Slide key={`${src}-${i}`} role="option" aria-selected={index === i}>
            <SlideImg
              src={src}
              alt={`${title} screenshot ${i + 1} of ${count}`}
              loading="lazy"
              onError={(e) => { e.currentTarget.src = svgPlaceholder(title); }}
            />
          </Slide>
        ))}
      </CarouselTrack>
      {count > 1 && (
        <>
          <NavButton dir="prev" aria-label="Previous image" onClick={() => go(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </NavButton>
          <NavButton dir="next" aria-label="Next image" onClick={() => go(1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </NavButton>
          <Dots>
            {images.map((_, i) => (
              <Dot key={i} data-active={index === i} aria-label={`Go to image ${i + 1}`} onClick={() => to(i)} />
            ))}
          </Dots>
        </>
      )}
    </CarouselViewport>
  );
}

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');
  const allTags = useMemo(() => ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))], []);

  const filtered = useMemo(
    () => (activeTag === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(activeTag))),
    [activeTag]
  );

  return (
    <Page aria-labelledby="projects-title">
      <Header>
        <Title id="projects-title">Projects</Title>
        <Subtitle>Selected work across SaaS, trading systems, data pipelines, and analytics UI.</Subtitle>
        <Toolbar role="toolbar" aria-label="Filter projects by tag">
          {allTags.map(t => (
            <Tag key={t} type="button" active={activeTag === t} onClick={() => setActiveTag(t)} aria-pressed={activeTag === t}>
              {t}
            </Tag>
          ))}
        </Toolbar>
      </Header>

      <Grid role="list">
        {filtered.map((p) => (
          <Card key={p.title} role="listitem" aria-labelledby={`p-${p.title}`}>
            <Media>
              {p.images && p.images.length > 1 ? (
                <Carousel images={p.images} title={p.title} />
              ) : (
                <Img
                  src={p.image}
                  alt={`${p.title} preview`}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = svgPlaceholder(p.title); }}
                />
              )}
            </Media>
            <Content>
              <PTitle id={`p-${p.title}`}>{p.title}</PTitle>
              <Desc>{p.desc}</Desc>
              <Chips>
                {p.tags.map(tag => (<Chip key={tag}>{tag}</Chip>))}
              </Chips>
              <Actions>
                {p.demo ? (
                  <LinkBtn href={p.demo} target="_blank" rel="noopener">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17l10-10M17 7H7m10 0v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Live Demo
                  </LinkBtn>
                ) : (
                  <DisabledBtn aria-disabled="true" title="Demo not public">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 10V8a6 6 0 1 1 12 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6"/></svg>
                    Demo (Locked)
                  </DisabledBtn>
                )}

                {p.github ? (
                  <LinkBtn href={p.github} target="_blank" rel="noopener">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.19-3.37-1.19-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02 .9 1.52 2.36 1.08 2.94.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.21 2.4.11 2.65.64.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.67.92.67 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.2"/></svg>
                    Source
                  </LinkBtn>
                ) : (
                  <DisabledBtn aria-disabled="true" title="Source is private">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 10V8a6 6 0 1 1 12 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6"/></svg>
                    Private
                  </DisabledBtn>
                )}
              </Actions>
            </Content>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}