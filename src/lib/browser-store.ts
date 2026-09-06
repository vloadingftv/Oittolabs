/**
 * Fontes externas para `useSyncExternalStore`.
 *
 * Por que não `useEffect` + `setState`: o valor destes dois estados só existe
 * no navegador. Ler no efeito e guardar em estado provoca renderização em
 * cascata (é o que a regra react-hooks/set-state-in-effect aponta) e ainda
 * deixa um quadro com o valor errado. `useSyncExternalStore` resolve os dois:
 * tem um snapshot próprio para o servidor — usado também durante a
 * hidratação, o que garante HTML idêntico — e só então passa para o valor real
 * do navegador.
 */

/* ------------------------------------------------------------------ *
 * Relógio compartilhado — para tempo relativo nas manchetes do Radar.
 * ------------------------------------------------------------------ */

const clockListeners = new Set<() => void>();
let clockTimer: ReturnType<typeof setInterval> | null = null;
let currentMinute = Date.now();

/** Sentinela: no servidor (e na hidratação) não existe "agora". */
export const NO_CLOCK = 0;

export function subscribeToClock(onChange: () => void) {
  clockListeners.add(onChange);

  if (!clockTimer) {
    clockTimer = setInterval(() => {
      currentMinute = Date.now();
      for (const listener of clockListeners) listener();
    }, 60_000);
  }

  return () => {
    clockListeners.delete(onChange);
    if (clockListeners.size === 0 && clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  };
}

/** Estável entre os tiques — requisito do useSyncExternalStore. */
export function getClock() {
  return currentMinute;
}

export function getServerClock() {
  return NO_CLOCK;
}

/* ------------------------------------------------------------------ *
 * Rolagem da página — para o header trocar de tom.
 * ------------------------------------------------------------------ */

const SCROLL_THRESHOLD = 24;

export function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function getIsScrolled() {
  return window.scrollY > SCROLL_THRESHOLD;
}

export function getServerIsScrolled() {
  return false;
}
