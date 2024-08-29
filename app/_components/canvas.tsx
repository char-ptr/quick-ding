"use client";

import { atom, useAtomValue } from "jotai";
import { forwardRef, MouseEvent, MouseEventHandler, useImperativeHandle, useRef, useState } from "react";

export type DingCanvasRef = {
  clear: () => void
  download: () => void
}

export const mouse_stroke_size_atom = atom(15);
export const mouse_stroke_colour_atom = atom("#000")
export const DingCanvas = forwardRef((props, ref) => {
  const [mouse_down, set_mouse_down] = useState(false)
  const canvas_ref = useRef<HTMLCanvasElement | null>(null)
  const canvas_ctx_ref = useRef<CanvasRenderingContext2D | null>(null)
  const stroke_colour = useAtomValue(mouse_stroke_colour_atom)
  const stroke_size = useAtomValue(mouse_stroke_size_atom)
  useImperativeHandle(ref, () => ({
    download: () => {
      if (!canvas_ref.current) return;
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = canvas_ref.current.toDataURL();
      link.click();
    },
    clear: () => {
      if (!canvas_ref.current) return;
      let ctx = canvas_ctx_ref.current;
      if (!ctx || ctx == null) {
        ctx = canvas_ctx_ref.current = canvas_ref.current.getContext("2d") as CanvasRenderingContext2D;
      }
      ctx.clearRect(0, 0, canvas_ref.current.width, canvas_ref.current.height)

    }

  }), [])
  function calc_offset(x: number, y: number) {
    const canvas = canvas_ref.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: x - rect.x, y: y - rect.y }

  }

  function on_down(mouse: MouseEvent<HTMLCanvasElement>) {
    if (!canvas_ref.current) return;
    set_mouse_down(true);
    let ctx = canvas_ctx_ref.current;
    if (!ctx || ctx == null) {
      ctx = canvas_ctx_ref.current = canvas_ref.current.getContext("2d") as CanvasRenderingContext2D;
    }

    ctx.beginPath()
    ctx.strokeStyle = stroke_colour
    ctx.lineWidth = stroke_size
    const { x, y } = calc_offset(mouse.clientX, mouse.clientY)
    ctx.moveTo(x, y)
  }
  function on_updates(mouse: MouseEvent<HTMLCanvasElement>) {
    if (!mouse_down) return;
    if (!canvas_ref.current) return;
    const { x, y } = calc_offset(mouse.clientX, mouse.clientY)

    let ctx = canvas_ctx_ref.current;
    if (!ctx || ctx == null) {
      ctx = canvas_ctx_ref.current = canvas_ref.current.getContext("2d") as CanvasRenderingContext2D;
    }
    console.log(x, y)
    ctx.lineTo(x, y)
    ctx.stroke()

  }
  return <canvas className="bg-white border-neutral-300 border rounded-lg " onMouseMove={on_updates} onMouseDown={on_down} onMouseUp={() => set_mouse_down(false)} width="720" height={720} ref={canvas_ref} />
})
