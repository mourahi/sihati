type YoutubeEmbedProps = {
  youtubeId: string;
  title: string;
};

export function YoutubeEmbed({ youtubeId, title }: YoutubeEmbedProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-sand shadow-[0_8px_30px_rgba(44,36,32,0.06)]">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
