"use client";

export class FunkySquareRenderer {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly squarePad = 7;
  private readonly squareSize = this.canvas.width / 200;
  private readonly tickMax = 1440;
  private readonly frameMax = 360;
  private readonly squareColCount = Math.floor(
    this.canvas.width / (this.squareSize + this.squarePad)
  );
  private readonly squareRowCount = Math.floor(
    this.canvas.height / (this.squareSize + this.squarePad)
  );

  private tick = 0;
  private frame = 0;
  private stopped = false;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  public async start() {
    this.draw();
  }

  public stop() {
    this.stopped = true;
  }

  private draw(): void {
    if (this.stopped) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    if (this.tick % this.tickMax === 0) {
      this.tick = 0;
    }
    if (this.tick++ % 4 !== 0) {
      return void requestAnimationFrame(this.draw.bind(this));
    }
    if (this.frame % this.frameMax === 0) {
      this.frame = 0;
    }

    for (let i = 0; i < this.squareColCount; i++) {
      for (let j = 0; j < this.squareRowCount; j++) {
        this.ctx.fillStyle = `hsl(${Math.floor(
          (i * this.squareColCount + j) * (360 / this.squareColCount ** 2) +
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
    requestAnimationFrame(this.draw.bind(this));
  }
}
