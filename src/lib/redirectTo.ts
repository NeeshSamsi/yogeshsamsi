// Module scope, outside any component, so the mutation below is invisible to
// the React Compiler. Only call this from an event handler, not during render.
export function redirectTo(url: string) {
  window.location.href = url
}
