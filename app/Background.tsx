"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FunkySquareRenderer } from "./FunkySquareRenderer";

export const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [controller, setController] = useState<
    FunkySquareRenderer | undefined
  >();
  const [dimensions, setDimensions] = useState<[number, number] | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let timeout: NodeJS.Timeout | undefined;
    const resizeHandler = () => {
      if (!containerRef.current) {
        return;
      }

      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        setDimensions([
          containerRef.current?.clientWidth ?? 0,
          containerRef.current?.clientHeight ?? 0,
        ]);
      }, 200);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useLayoutEffect(() => {
    if (containerRef.current && dimensions) {
      const canvas = document.createElement("canvas");

      canvas.width = dimensions[0];
      canvas.height = dimensions[1];
      containerRef.current.appendChild(canvas);

      const newController = new FunkySquareRenderer(canvas);
      newController.start();

      setController(newController);
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(canvas);
    } else if (containerRef.current) {
      setDimensions([
        containerRef.current?.clientWidth ?? 0,
        containerRef.current?.clientHeight ?? 0,
      ]);
    }

    return undefined;
  }, [containerRef, dimensions]);

  useEffect(() => {
    return () => {
      controller?.stop?.();
    };
  }, [controller]);

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
      ref={containerRef}
    ></div>
  );
};
