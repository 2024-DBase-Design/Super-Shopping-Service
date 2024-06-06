/* eslint-disable @typescript-eslint/no-explicit-any */
/* stolen kindly from https://gist.github.com/mudge/5830382 */
/* Polyfill indexOf. */
type Listener = (...args: any[]) => void;
type Events = { [event: string]: Listener[] };

export class ClientEventEmitter {
  private readonly events: Events = {};

  constructor() {}

  public on(event: string, listener: Listener): () => void {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }

    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }

  public removeListener(event: string, listener: Listener): void {
    if (typeof this.events[event] !== 'object') {
      return;
    }

    const idx: number = this.events[event].indexOf(listener);
    if (idx > -1) {
      this.events[event].splice(idx, 1);
    }
  }

  public emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] !== 'object') {
      return;
    }

    this.events[event].forEach((listener) => listener.apply(this, args));
  }

  // public once(event: string, listener: Listener): void {
  //   const remove: () => void = this.on(event, (...args: any[]) => {
  //     remove();
  //     listener.apply(this, args);
  //   });

  //   return remove;
  // }
}
