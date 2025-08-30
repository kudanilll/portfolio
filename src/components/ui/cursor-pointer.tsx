"use client";

import { FC, useEffect, useRef } from "react";

interface CursorPointerProps {
  color?: string;
  fillColor?: string;
  dotSize?: number;
  borderWidth?: number;
  style?: "stroke" | "fill" | "both";
}

const CursorPointer: FC<CursorPointerProps> = ({
  color = "#323232a6",
  fillColor = "#32323233",
  dotSize = 24,
  borderWidth = 2,
  style = "both",
}) => {
  const cursorPos = useRef({ x: 0, y: 0 });
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (width <= 768) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    class Dot {
      position: { x: number; y: number };
      size: number;
      lag: number;
      borderWidth: number;
      color: string;
      fillColor: string;
      style: string;

      constructor(
        x: number,
        y: number,
        size: number,
        lag: number,
        borderWidth: number,
        color: string,
        fillColor: string,
        style: string
      ) {
        this.position = { x, y };
        this.size = size;
        this.lag = lag;
        this.borderWidth = borderWidth;
        this.color = color;
        this.fillColor = fillColor;
        this.style = style;
      }

      moveTowards(x: number, y: number, context: CanvasRenderingContext2D) {
        // Smooth movement using lag
        this.position.x += (x - this.position.x) / this.lag;
        this.position.y += (y - this.position.y) / this.lag;

        context.beginPath();
        context.arc(
          this.position.x,
          this.position.y,
          this.size,
          0,
          2 * Math.PI
        );

        if (this.style === "stroke" || this.style === "both") {
          context.strokeStyle = this.color;
          context.lineWidth = this.borderWidth;
          context.stroke();
        }

        if (this.style === "fill" || this.style === "both") {
          context.fillStyle = isPointerDownRef.current
            ? this.color
            : this.fillColor;
          context.fill();
        }

        context.closePath();
      }
    }

    const dot = new Dot(
      width / 2,
      height / 2,
      dotSize,
      18,
      borderWidth,
      color,
      fillColor,
      style
    );

    const onMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerDown = () => {
      isPointerDownRef.current = true;
    };

    const onPointerUp = () => {
      isPointerDownRef.current = false;
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const updateDot = () => {
      if (context) {
        context.clearRect(0, 0, width, height);
        dot.moveTowards(cursorPos.current.x, cursorPos.current.y, context);
      }
      animationFrame = requestAnimationFrame(updateDot);
    };

    const init = () => {
      if (prefersReducedMotion.matches) {
        return;
      }

      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none";
      canvas.width = width;
      canvas.height = height;
      canvas.style.zIndex = "9999";
      document.body.appendChild(canvas);

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("resize", onWindowResize);

      // Initialize cursor position
      cursorPos.current = { x: width / 2, y: height / 2 };
      updateDot();
    };

    const destroy = () => {
      if (canvas) document.body.removeChild(canvas);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onWindowResize);
    };

    prefersReducedMotion.onchange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();

    return () => {
      destroy();
    };
  }, [color, fillColor, dotSize, borderWidth, style]);

  return null;
};

export default CursorPointer;
