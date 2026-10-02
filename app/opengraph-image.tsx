import { ImageResponse } from "next/og"
export const alt = "Raj Vaghela, AI Systems Engineer. LLM applications, data pipelines and full stack delivery."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", background: "#101820", padding: 80, color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 26, color: "#a7d9bf", marginBottom: 30 }}>AI Systems Engineer at Stack8s</div>
      <div style={{ display: "flex", fontSize: 78, fontWeight: 700 }}>Raj Vaghela</div>
      <div style={{ display: "flex", fontSize: 32, marginTop: 30, maxWidth: 900, lineHeight: 1.4 }}>LLM applications, data pipelines and full stack delivery.</div>
      <div style={{ display: "flex", fontSize: 24, color: "#b1bbc5", marginTop: 50 }}>Leicester, UK · rajvaghela.dev</div>
    </div>, size,
  )
}
