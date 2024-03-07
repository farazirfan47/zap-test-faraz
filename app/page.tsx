'use client'
import { Payouts } from "./components/Payouts";
import { Container } from "./components/styles/Container.styled"

export default function Home() {
  return (
    <main>
      <Container>
        <h1>Payouts</h1>
        <Payouts />
      </Container>
    </main>
  );
}