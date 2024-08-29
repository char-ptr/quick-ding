"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DingCanvasRef, mouse_stroke_size_atom } from "./canvas";
import { useAtom, useSetAtom } from "jotai";
import CanvasColours from "./canvas_colours";
import { MutableRefObject } from "react";

export default function CanvasButtons({ ding }: { ding: MutableRefObject<DingCanvasRef | null> }) {
  const [stroke_size, set_stroke_size] = useAtom(mouse_stroke_size_atom);
  return <div className="flex flex-col gap-3 container">
    <div>
      <Button onClick={() => ding.current?.clear()}>clear </Button>
    </div>
    <div>
      <Button onClick={() => ding.current?.download()}>download </Button>
    </div>
    <div className="w-64">
      <Slider onValueCommit={(v) => set_stroke_size(v[0])} defaultValue={[stroke_size]} max={18} />
    </div>
    <CanvasColours />
  </div>
}
