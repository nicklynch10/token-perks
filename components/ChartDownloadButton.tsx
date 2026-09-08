"use client";

import { useState } from "react";

/**
 * "Download PNG" for a same-page inline <svg> chart.
 *
 * The SVG styles its strokes/fills with CSS custom properties, which a
 * serialized SVG can't resolve on its own — so before rasterizing we clone
 * the node and rewrite every var(--token) (attribute or inline style) to its
 * computed value, and copy computed font properties onto <text> nodes (the
 * chart's few class-styled labels). Then: SVG → Image → 2x canvas → PNG
 * blob → anchor download. Progressive enhancement: without JS the button
 * simply never appears (rendered only after mount is not required — the
 * click handler is the enhancement — but state keeps feedback honest).
 */
export default function ChartDownloadButton({
  targetId,
  filename,
}: {
  targetId: string;
  filename: string;
}) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  function resolveVars(el: Element, cs: CSSStyleDeclaration) {
    for (const attr of Array.from(el.attributes)) {
      if (attr.value.includes("var(--")) {
        attr.value = attr.value.replace(/var\((--[\w-]+)\)/g, (_m, name) =>
          cs.getPropertyValue(name).trim(),
        );
      }
    }
  }

  async function download() {
    setBusy(true);
    setFailed(false);
    try {
      const svg = document.getElementById(targetId);
      if (!(svg instanceof SVGSVGElement)) throw new Error("chart missing");
      const rootCs = getComputedStyle(document.documentElement);
      const clone = svg.cloneNode(true) as SVGSVGElement;
      const srcNodes = Array.from(svg.querySelectorAll("*"));
      const cloneNodes = Array.from(clone.querySelectorAll("*"));
      for (let i = 0; i < srcNodes.length; i++) {
        resolveVars(cloneNodes[i], rootCs);
        const tag = cloneNodes[i].tagName.toLowerCase();
        if (tag === "text" || tag === "tspan") {
          const tcs = getComputedStyle(srcNodes[i]);
          cloneNodes[i].setAttribute("font-family", tcs.fontFamily);
          cloneNodes[i].setAttribute("font-size", tcs.fontSize);
          if (!cloneNodes[i].hasAttribute("fill")) cloneNodes[i].setAttribute("fill", tcs.fill);
        }
      }
      const box = svg.getBoundingClientRect();
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("width", String(box.width));
      clone.setAttribute("height", String(box.height));
      const scale = 2;
      const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        new XMLSerializer().serializeToString(clone),
      )}`;
      const img = new Image();
      img.decoding = "sync";
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("svg load failed"));
        img.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(box.width * scale);
      canvas.height = Math.round(box.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no canvas");
      ctx.fillStyle = getComputedStyle(document.body).backgroundColor || "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
      if (!blob) throw new Error("png encode failed");
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 10_000);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={download}
        disabled={busy}
        className="inline-flex min-h-[40px] items-center rounded-lg border border-line-strong bg-card px-3 text-xs font-semibold text-ink-soft hover:border-teal hover:text-teal-deep touch:min-h-[44px]"
      >
        {busy ? "Rendering…" : "Download PNG"}
      </button>
      {failed && (
        <span className="text-[11px] text-ink-mute" role="status">
          Export failed — the data table below has the same figures.
        </span>
      )}
    </span>
  );
}
