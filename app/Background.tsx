"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export class CanvasController {
  private readonly ctx: CanvasRenderingContext2D;
  private frame = 0;
  private squarePad = 7;
  private squareSize = this.canvas.width / 200;
  private stopped = false;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
  }

  public async start() {
    // find offset
    // set offset
    // draw
    this.draw();
  }

  public stop() {
    this.stopped = true;
  }

  private draw() {
    if (this.stopped) {
      return;
    }

    const squareColCount = Math.floor(
      this.canvas.width / (this.squareSize + this.squarePad)
    );

    const squareRowCount = Math.floor(
      this.canvas.height / (this.squareSize + this.squarePad)
    );

    for (let i = 0; i < squareColCount; i++) {
      for (let j = 0; j < squareRowCount; j++) {
        this.ctx.fillStyle = `hsl(${Math.floor(
          (i * squareColCount + j) * (360 / squareColCount ** 2) +
            this.frame +
            i +
            j
        )}, 40%, ${25 + Math.floor(Math.sin(Date.now() / 2500) * 7)}%)`;

        this.ctx.fillRect(
          i * (this.squareSize + this.squarePad),
          j * (this.squareSize + this.squarePad),
          this.squareSize,
          this.squareSize
        );
      }
    }

    this.frame++;
    setTimeout(() => requestAnimationFrame(this.draw.bind(this)), 10);
  }
}

export const Background = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [controller, setController] = useState<CanvasController | undefined>();

  useLayoutEffect(() => {
    if (ref.current) {
      const canvas = document.createElement("canvas");
      canvas.height = ref.current.clientHeight;
      canvas.width = ref.current.clientWidth;
      ref.current.appendChild(canvas);

      const controller = new CanvasController(canvas);
      controller.start();

      setController(new CanvasController(canvas));
    }

    return undefined;
  }, [ref]);

  useEffect(() => {
    return () => {
      controller?.stop?.();
    };
  }, [controller]);

  console.log(controller);

  return (
    <div
      className={
        "inline-block fixed top-0 left-0 w-full h-full p-2 transition-opacity duration-1000"
      }
      style={{
        zIndex: -1,
        transitionDuration: "3000ms",
        opacity: controller ? 1 : 0,
      }}
      ref={ref}
    ></div>
  );
};
