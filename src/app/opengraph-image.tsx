import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = "Jovan Vunić — Senior Full-Stack Engineer, Vienna, Austria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0c1421", color: "#f3f0e9", padding: "72px 80px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#b3b9c4" }}><span>jv.</span><span>{profile.location}</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 86, fontWeight: 700 }}>{profile.name}</span><span style={{ fontSize: 46, color: "#9bb8ff", marginTop: 20 }}>Engineering useful things.</span></div>
      <span style={{ fontSize: 26, color: "#b3b9c4" }}>Senior Full-Stack Engineer · Back-end, data & automation</span>
    </div>,
    size,
  );
}
