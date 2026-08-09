import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent-secondary">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
        Diese Seite gibt es nicht
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Entweder wurde sie verschoben, gelöscht – oder sie wartet noch auf ihre Migration zu Microsoft
        365. Bis dahin geht es hier weiter:
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Zur Startseite</Button>
        <Button href="/leistungen" variant="secondary">
          Leistungen ansehen
        </Button>
      </div>
    </Container>
  );
}
