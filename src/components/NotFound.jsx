import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.section`
  display: grid;
  place-items: center;
  min-height: calc(100vh - 140px);
  text-align: center;
  padding: 2rem 1rem 3rem;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  color: #0ea5e9;
  background: rgba(14,165,233,0.08);
  border: 1px solid rgba(14,165,233,0.25);
`;

const Big = styled.h1`
  margin: 0.8rem 0 0.4rem;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(90deg, #0f172a, #0ea5e9 50%, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Sub = styled.p`
  margin: 0 0 1.2rem;
  color: #334155;
  font-size: 1.05rem;
  max-width: 46ch;
  margin-inline: auto;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.2rem;
  animation: ${fadeUp} 280ms ease-out both;
`;

const Btn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1rem;
  border-radius: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #0f172a;
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  box-shadow: 0 8px 20px rgba(2,6,23,0.08);
  transition: transform 120ms ease, box-shadow 160ms ease, background 160ms ease;

  &:hover { transform: translateY(-1px); box-shadow: 0 12px 26px rgba(2,6,23,0.12); }
`;

const PrimaryBtn = styled(Btn)`
  background: linear-gradient(#ffffff,#ffffff) padding-box,
              linear-gradient(120deg, #7c3aed, #0ea5e9) border-box;
  border: 1.5px solid transparent;
`;

export default function NotFound() {
  return (
    <Wrap aria-labelledby="nf-title">
      <Badge>404 · Page not found</Badge>
      <Big id="nf-title">Lost in the gradient</Big>
      <Sub>
        The page you’re looking for doesn’t exist or moved. Let’s get you back to something interesting.
      </Sub>
      <Actions>
        <PrimaryBtn to="/">Go home</PrimaryBtn>
        <Btn to="/projects">See projects</Btn>
        <Btn to="/resume">View resume</Btn>
      </Actions>
    </Wrap>
  );
}
