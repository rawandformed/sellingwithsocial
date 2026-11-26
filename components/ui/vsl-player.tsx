"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/*
  Sales video with a click-to-load poster. Nothing from the video host is
  requested until the visitor presses play, so the video cannot slow down the
  first paint. The poster is drawn in code.

  Only render this when there is a video. With no `src` it renders nothing.
*/

const isFile = (url: string) => /\.(mp4|webm|mov)(\?|#|$)/i.test(url);

export function VslPlayer({ src, title = "How Selling with Social works" }: { src: string; title?: string }) {
  const [playing, setPlaying] = useState(false);

  if (!src) return null;

  if (playing) {
    return isFile(src) ? (
      <video src={src} controls autoPlay playsInline className="size-full bg-black object-contain" />
    ) : (
      <iframe
        src={src + (src.includes("?") ? "&" : "?") + "autoplay=1"}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="size-full border-0 bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block size-full cursor-pointer overflow-hidden bg-linear-to-br from-[#e4eefd] via-[#f6f9ff] to-[#dbe8fd] text-left"
    >
      {/* Poster artwork: soft glows and three floating product cards */}
      <span aria-hidden="true" className="absolute -left-[8%] top-[10%] size-[46%] rounded-full bg-[#86b4ff] opacity-45 blur-[60px]" />
      <span aria-hidden="true" className="absolute -right-[6%] bottom-[-10%] size-[42%] rounded-full bg-[#c6dff0] opacity-70 blur-[60px]" />
      <span aria-hidden="true" className="absolute left-[7%] top-[16%] hidden w-[24%] -rotate-6 rounded-2xl border border-white bg-white/85 p-[2%] shadow-[0_24px_50px_-24px_rgba(20,48,96,.45)] sm:block">
        <i className="block aspect-[4/3] rounded-lg bg-linear-to-br from-[#0f2038] to-[#356ec6]" />
        <i className="mt-[8%] block h-1.5 w-4/5 rounded-full bg-ink/15" />
        <i className="mt-[5%] block h-1.5 w-3/5 rounded-full bg-ink/10" />
      </span>
      <span aria-hidden="true" className="absolute bottom-[14%] right-[7%] hidden w-[26%] rotate-3 rounded-2xl border border-white bg-white/85 p-[2%] shadow-[0_24px_50px_-24px_rgba(20,48,96,.45)] sm:grid sm:gap-[6%]">
        {[0, 1, 2].map((k) => (
          <i key={k} className="flex items-center gap-[6%] rounded-lg border border-line bg-white p-[5%]">
            <b className="size-2 rounded-full bg-success" />
            <b className="h-1.5 flex-1 rounded-full bg-ink/15" />
          </i>
        ))}
      </span>

      <span className="absolute inset-0 grid place-items-center">
        <span className="grid justify-items-center gap-4">
          <span className="grid size-[72px] place-items-center rounded-full bg-white shadow-[0_18px_40px_-12px_rgba(20,48,96,.5)] transition-transform duration-200 ease-brand group-hover:scale-105 sm:size-[92px]">
            <Play className="ml-1 size-7 fill-ink text-ink sm:size-9" strokeWidth={0} />
          </span>
          <span className="rounded-full bg-white/80 px-3.5 py-1.5 text-[13px] font-semibold text-ink-2 backdrop-blur sm:text-[14px]">
            Watch how it works
          </span>
        </span>
      </span>
    </button>
  );
}
