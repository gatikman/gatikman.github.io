import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const pulse = keyframes`
  0%, 100% { opacity: 0.55; filter: blur(30px); }
  50% { opacity: 0.85; filter: blur(36px); }
`;

const Page = styled.section`
  position: relative;
  display: grid;
  gap: 2rem;
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
  padding: 1rem 0 0.5rem 0;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin: 0 0 0.5rem 0;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #0f172a, #0ea5e9 40%, #7c3aed 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 860px;
  color: #1f2937;
  line-height: 1.8;
  font-size: 1.085rem;
  opacity: 0.95;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  @media (min-width: 880px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Card = styled.section`
  background: rgba(255,255,255,0.8);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
  padding: 1.5rem;
  border: 1px solid #eef2f7;
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
`;

const SectionTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.05rem;
  color: #1f2937;
  letter-spacing: 0.2px;
  display: inline-block;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  border: 1px solid transparent;
`;

const Badges = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0;
  margin: 0.25rem 0 0 0;
`;

const Badge = styled.li`
  padding: 0.45rem 0.7rem;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 0.9rem;
  color: #0f172a;
`;

const Timeline = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
`;

const TimelineItem = styled.li`
  position: relative;
  padding-left: 1rem;
  border-left: 3px solid #e5e7eb;
  &:before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0.35rem;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: linear-gradient(90deg, #06b6d4, #0ea5e9 45%, #7c3aed);
    box-shadow: 0 0 0 3px #fff;
  }
`;

const Org = styled.div`
  font-weight: 700;
  color: #111827;
`;

const Meta = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
`;

const Bullets = styled.ul`
  margin: 0.5rem 0 0 1rem;
  color: #374151;
`;

const CTARow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const CTA = styled(Link)`
  background: linear-gradient(90deg, #06b6d4, #0ea5e9 45%, #7c3aed);
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  border: 1px solid transparent;
  box-shadow: 0 10px 22px rgba(14,165,233,0.18);
  transition: transform 0.15s ease, filter 0.15s ease;
  &:hover { transform: translateY(-2px); filter: brightness(0.98) saturate(110%); }
  &:focus-visible { outline: 3px solid #60a5fa; outline-offset: 2px; }
`;

const CTAAlt = styled(CTA)`
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  color: #111827;
  box-shadow: none;
`;

// Now card specific styles
const NowCard = styled(Card)`
  display: grid;
  gap: 0.5rem;
  align-items: start;
`;

const NowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
`;

const NowIcon = styled.div`
  width: 40px; height: 40px;
  border-radius: 12px;
  display: grid; place-items: center;
  color: #fff;
  background: linear-gradient(120deg, #7c3aed, #0ea5e9);
  box-shadow: 0 8px 20px rgba(14,165,233,0.18);
`;

const NowBadge = styled.span`
  margin-left: 0.25rem;
  padding: 0.25rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 800;
  border-radius: 999px;
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  border: 1px solid transparent;
  color: #0f172a;
`;

const NowMetaRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  color: #6b7280;
  font-size: 0.95rem;
`;

const NowMeta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.35rem 0 0 0;
  display: grid;
  gap: 0.5rem;
`;

const Bullet = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #374151;
  & svg { flex: 0 0 18px; margin-top: 2px; color: #0ea5e9; }
`;

export default function About() {
  return (
    <Page aria-labelledby="about-title">
      <Header>
        <Title id="about-title">About Me</Title>
        <Subtitle>
          I'm an accomplished software developer with a strong blend of entrepreneurship, systems
          architecture, and algorithmic trading. I craft high-performance trading systems, lead
          technical operations, and architect robust SaaS products—particularly in sports
          broadcasting and financial markets.
        </Subtitle>
        <CTARow>
          <CTA to="/resume" aria-label="View my resume">View Resume</CTA>
          <CTAAlt to="/projects" aria-label="See my projects">See Projects</CTAAlt>
        </CTARow>
      </Header>

      <Grid>
        <Card aria-labelledby="skills-title">
          <SectionTitle id="skills-title">Technical Skills</SectionTitle>
          <div>
            <strong>Languages & Frameworks:</strong>
            <Badges aria-label="Languages and Frameworks">
              <Badge>Python</Badge>
              <Badge>JavaScript</Badge>
              <Badge>ReactJS</Badge>
              <Badge>Next.js</Badge>
              <Badge>Vite</Badge>
              <Badge>fastify</Badge>
            </Badges>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
            <strong>Databases & Services:</strong>
            <Badges aria-label="Databases and Services">
              <Badge>SQL</Badge>
              <Badge>Postgresql</Badge>
            </Badges>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
            <strong>Specialties:</strong>
            <Badges aria-label="Specialties">
              <Badge>Frontend</Badge>
              <Badge>Full-Stack SaaS</Badge>
              <Badge>Algorithmic Trading</Badge>
              <Badge>Trading System Architecture</Badge>
            </Badges>
          </div>
        </Card>

        <NowCard aria-labelledby="now-title">
          <NowHeader>
            <NowIcon aria-hidden="true">
              {/* Broadcast icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="2.2" fill="currentColor"/>
                <path d="M6.5 12a5.5 5.5 0 0 1 5.5-5.5M17.5 12A5.5 5.5 0 0 1 12 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M3.5 12A8.5 8.5 0 0 1 12 3.5M20.5 12A8.5 8.5 0 0 1 12 20.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.85"/>
              </svg>
            </NowIcon>
            <div>
              <SectionTitle id="now-title">Now</SectionTitle>
              <NowBadge>Currently focused</NowBadge>
            </div>
          </NowHeader>

          <Org>Technical Co-founder · Digital Arena — France</Org>

          <NowMetaRow>
            <NowMeta aria-label="Date range">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 2.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M16.5 2.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <Meta as="span">Jun 2025 – Present</Meta>
            </NowMeta>
            <NowMeta aria-label="Location">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
              <Meta as="span">France</Meta>
            </NowMeta>
          </NowMetaRow>

          <BulletList>
            <Bullet>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Spearheading full-stack development and daily operations of a live sports broadcasting platform, fully integrated with FinishLynx.</span>
            </Bullet>
          </BulletList>
        </NowCard>
      </Grid>

      <Card aria-labelledby="education-title">
        <SectionTitle id="education-title">Education</SectionTitle>
        <Timeline>
          <TimelineItem>
            <Org>MSc in Business (Cand.merc.(IT)) — Copenhagen Business School, Copenhagen</Org>
          </TimelineItem>
          <TimelineItem>
            <Org>BA in Interaction Design — Universidad Iberoamericana, Mexico City</Org>
          </TimelineItem>
        </Timeline>
      </Card>
    </Page>
  );
}