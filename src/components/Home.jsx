import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Use the real photo placed in /public/images/photo.png
const PROFILE_PHOTO = '/images/photo.png';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.55; filter: blur(30px); }
  50% { opacity: 0.85; filter: blur(36px); }
`;

const blink = keyframes`
  0% { transform: scale(0.8); opacity: 0.9; }
  70% { transform: scale(1.8); opacity: 0; }
  100% { transform: scale(0.8); opacity: 0; }
`;

const Wrapper = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  min-height: 72vh;
  background: radial-gradient(1200px 500px at 10% 0%, #eef3ff 0%, rgba(238,243,255,0) 50%),
              radial-gradient(800px 400px at 100% 10%, #e6f7f2 0%, rgba(230,247,242,0) 50%),
              #f8fafc;
  border-radius: 1.25rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06);
  padding: 2.5rem 1.25rem 2.75rem;
  text-align: center;
  overflow: hidden;
  isolation: isolate;

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

  @media (min-width: 880px) {
    grid-template-columns: 1.1fr 0.9fr;
    text-align: left;
    padding: 3.25rem 3rem;
  }
`;

const Left = styled.div``;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoFrame = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #0ea5e9);
  padding: 4px;
  box-shadow: 0 10px 40px rgba(124,58,237,0.25), 0 10px 30px rgba(14,165,233,0.2);
  animation: ${float} 7s ease-in-out infinite;
  will-change: transform;

  /* rotating spectral halo */
  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #7c3aed, #0ea5e9, #22c55e, #f59e0b, #7c3aed);
    filter: blur(12px) saturate(120%);
    animation: ${spin} 18s linear infinite;
    z-index: -1;
    opacity: 0.6;
    mask: radial-gradient(circle at center, transparent 66%, black 68%);
    -webkit-mask: radial-gradient(circle at center, transparent 66%, black 68%);
  }

  /* subtle highlight */
  &::after {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: radial-gradient(120px 80px at 35% 20%, rgba(255,255,255,0.45), transparent 60%);
    pointer-events: none;
  }

  @media (min-width: 880px) {
    width: 260px;
    height: 260px;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.7);
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.92rem;
  padding: 0.42rem 0.8rem;
  border-radius: 999px;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  border: 1px solid transparent;
  color: #0f172a;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(14,165,233,0.12);
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
`;

const StatusDot = styled.span`
  position: relative;
  width: 10px; height: 10px;
  border-radius: 999px;
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16,185,129,0.25), 0 0 14px rgba(16,185,129,0.6);
  &::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(16,185,129,0.55), transparent 60%);
    animation: ${blink} 2.2s ease-out infinite;
  }
`;

const Divider = styled.span`
  width: 1px; height: 16px;
  background: linear-gradient(180deg, rgba(2,6,23,0.18), rgba(2,6,23,0.06));
`;

const EyebrowIcon = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  color: #0ea5e9;
`;

const Name = styled.h1`
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  line-height: 1.1;
  margin: 0.75rem 0 0.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #0f172a, #0ea5e9 40%, #7c3aed 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 10px 25px rgba(14,165,233,0.15);
`;

const Tagline = styled.h2`
  font-size: clamp(1.05rem, 2.5vw, 1.35rem);
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
  opacity: 0.95;
`;

const Profile = styled.p`
  font-size: 1.05rem;
  color: #424b5f;
  max-width: 56ch;
  margin: 0.75rem 0 1.25rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
  @media (min-width: 880px) {
    justify-content: flex-start;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.1rem;
  border-radius: 0.8rem;
  background: linear-gradient(90deg, #06b6d4, #0ea5e9 45%, #7c3aed);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.1s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 8px 22px rgba(14,165,233,0.25);
  &:hover { transform: translateY(-1px); filter: brightness(0.98) saturate(110%); }
  &:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
`;

const ButtonSecondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.1rem;
  border-radius: 0.8rem;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  color: #111827;
  font-weight: 700;
  border: 2px solid transparent;
  transition: transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(2,132,199,0.15); }
  &:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.75rem;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.8);
  border-radius: 0.9rem;
  padding: 0.9rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  border: 1px solid #eef2f7;
  text-align: center;
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
`;

const StatNumber = styled.div`
  font-size: 1.35rem;
  font-weight: 900;
  color: #0f172a;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #576074;
`;

const BadgeCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Badge = styled.span`
  font-size: 0.85rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  color: #0f172a;
  border: 1px solid transparent;
`;

const Socials = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 1.5rem;
  justify-content: center;
  @media (min-width: 880px) { justify-content: flex-start; }
`;

const SocialLink = styled.a`
  color: #0f172a;
  font-size: 1.6rem;
  transition: color 0.2s ease, transform 0.15s ease;
  &:hover { color: #0ea5e9; transform: translateY(-2px); }
`;

export default function Home() {
  return (
    <Wrapper aria-labelledby="home-heading">
      <Left>
        <Eyebrow aria-label="Available for select projects. Based in Strasbourg, France">
          <StatusDot aria-hidden="true" />
          <span>Available for select projects</span>
          <Divider aria-hidden="true" />
          <EyebrowIcon aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s-6-5.373-6-10a6 6 0 1 1 12 0c0 4.627-6 10-6 10Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
          </EyebrowIcon>
          <span>Strasbourg, France</span>
        </Eyebrow>
        <Name id="home-heading">Alejandro Gatica</Name>
        <Tagline>@gatikman</Tagline>
        <Tagline>SaaS Entrepreneur · Software Developer · Algorithmic Trading</Tagline>
        <Profile>
          I'm an accomplished software developer blending entrepreneurship, systems architecture,
          and algorithmic trading. I craft high‑performance trading systems, lead technical operations,
          and architect robust SaaS products—particularly in sports broadcasting and financial markets.
        </Profile>
        <Buttons>
          <Button to="/resume" aria-label="View my resume">View Resume</Button>
          <ButtonSecondary to="/projects" aria-label="Browse my projects">View Projects</ButtonSecondary>
          <ButtonSecondary as="a" href="https://github.com/gatikman" target="_blank" rel="noopener" aria-label="View my GitHub profile">GitHub</ButtonSecondary>
        </Buttons>

        <Stats role="list" aria-label="Key highlights">
          <StatCard role="listitem">
            <StatNumber>10+ yrs</StatNumber>
            <StatLabel>Building Products</StatLabel>
          </StatCard>
          <StatCard role="listitem">
            <StatNumber>Trading</StatNumber>
            <StatLabel>System Architecture</StatLabel>
          </StatCard>
          <StatCard role="listitem">
            <StatNumber>Co-founder</StatNumber>
            <StatLabel>Digital Arena</StatLabel>
          </StatCard>
        </Stats>

        <BadgeCloud aria-label="Technologies">
          {['Python','JavaScript','React','Next.js','Vite','fastify','SQL','AWS','Algorithmic Trading']
            .map(tag => (<Badge key={tag}>{tag}</Badge>))}
        </BadgeCloud>

        <Socials>
          <SocialLink href="mailto:gatikman@gmail.com" aria-label="Email">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v15A2.5 2.5 0 0 1 19.5 22h-15A2.5 2.5 0 0 1 2 19.5v-15Zm2.75.75 7.25 6.5 7.25-6.5" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/alejandro-gatica/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 8.25A6.25 6.25 0 0 1 22.75 14.5v5.25a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1V14.5a2.25 2.25 0 0 0-4.5 0v5.25a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1V14.5A6.25 6.25 0 0 1 7.5 8.25h9Z" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="3" stroke="#0f172a" strokeWidth="1.5"/></svg>
          </SocialLink>
          <SocialLink href="https://gatikman.com/" target="_blank" rel="noopener" aria-label="Website">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#0f172a" strokeWidth="1.5"/><path d="M2 12h20M12 2c2.5 2.5 4 6.5 4 10s-1.5 7.5-4 10c-2.5-2.5-4-6.5-4-10s1.5-7.5 4-10Z" stroke="#0f172a" strokeWidth="1.5"/></svg>
          </SocialLink>
        </Socials>
      </Left>

      <Right>
        <PhotoFrame aria-hidden="true">
          <Photo
            src={PROFILE_PHOTO}
            alt="Alejandro Gatica professional portrait"
            loading="lazy"
            onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
          />
        </PhotoFrame>
      </Right>
    </Wrapper>
  );
}