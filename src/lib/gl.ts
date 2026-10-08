import { Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * One triangle covering `canvas`, drawn by `fragment` (which gets `vUv`):
 * the base of every WebGL effect on the page. Throws when WebGL is not
 * available, so callers can keep their plain fallback.
 */
export function createQuad(
  canvas: HTMLCanvasElement,
  fragment: string,
  uniforms: Record<string, { value: unknown }>,
  {
    dpr = Math.min(window.devicePixelRatio, 2),
    premultipliedAlpha = false,
  } = {},
) {
  const renderer = new Renderer({ canvas, alpha: true, premultipliedAlpha, dpr });
  const { gl } = renderer;
  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });
  const mesh = new Mesh(gl, { geometry, program });

  return {
    gl,
    setSize: (width: number, height: number) => renderer.setSize(width, height),
    render: () => renderer.render({ scene: mesh }),
    dispose: () => {
      geometry.remove();
      program.remove();
    },
  };
}
