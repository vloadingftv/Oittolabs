"use client";

import { useState } from "react";

import type { Video } from "@/content/videos";
import { cx, formatDate } from "@/lib/utils";

/**
 * Player com fachada: mostra a thumbnail do YouTube e só injeta o iframe no
 * clique. Assim a página com 6 vídeos não carrega 6 players (~1 MB de JS de
 * terceiros cada) e continua rápida — que é parte do problema do canal hoje.
 * Usa youtube-nocookie para não plantar cookie de rastreio antes do play.
 */
export function VideoCard({
  video,
  featured = false,
}: {
  video: Video;
  featured?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  const thumb = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-ink-900">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 size-full cursor-pointer"
          >
            <span className="sr-only">Assistir: {video.title}</span>
            {/* Se a thumbnail do YouTube não carregar, o fundo escuro do card
                assume — nada de ícone de imagem quebrada.
                eslint-disable-next-line @next/next/no-img-element */}
            {thumbFailed ? null : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                loading="lazy"
                decoding="async"
                width={480}
                height={360}
                onError={() => setThumbFailed(true)}
                className="absolute inset-0 size-full object-cover opacity-80 transition-[opacity,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sand-50/95 transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-ink-900">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {video.duration ? (
              <span className="absolute bottom-3 right-3 rounded-xs bg-ink-950/85 px-2 py-1 text-[0.6875rem] font-semibold tabular-nums text-sand-100">
                {video.duration}
              </span>
            ) : null}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brass-600">
          {video.series}
        </p>
        <h3
          className={cx(
            "mt-3 leading-snug",
            featured ? "text-2xl md:text-[1.75rem]" : "text-xl",
          )}
        >
          {video.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {video.description}
        </p>
        <div className="mt-5 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
          <time dateTime={video.date}>{formatDate(video.date)}</time>
          <span aria-hidden>·</span>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-ink-900"
          >
            Ver no YouTube
          </a>
        </div>
      </div>
    </article>
  );
}
