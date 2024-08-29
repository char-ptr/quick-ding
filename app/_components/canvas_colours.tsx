"use client";

import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { mouse_stroke_colour_atom } from "./canvas";

const colours = {
  black: "#000",
  red: "#F00",
  blue: "#00F",
  green: "#0F0"
}
export default function CanvasColours() {
  const [stroke_colour, set_stroke_colour] = useAtom(mouse_stroke_colour_atom)
  return <div className="flex flex-row gap-3">
    {Object.entries(colours).map(([colour_name, hex]) => {

      return <Button className={`${stroke_colour === hex ? "dark:bg-neutral-400" : ""}`} onClick={() => set_stroke_colour(hex)} >{colour_name} <div style={{ background: hex }} className="h-full aspect-square rounded-full ml-3" /> </Button>
    })}
  </div>
}
