"use client";

import { useRef } from "react";
import { DingCanvas, DingCanvasRef } from "./canvas";
import CanvasButtons from "./canvas_buttons";

export default function CanvasManager() {
  const ding_ref = useRef<null | DingCanvasRef>(null)

  return <div>
    tesmouse_stroke_size_atomt
    <CanvasButtons ding={ding_ref} />
    <div className="px-5 py-2">
      <DingCanvas ref={ding_ref} />
    </div>
  </div>
}
