"use client";
import type { HighlightDto } from "@/app/api/generated";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Play, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/motion-primitives/dialog";
import { getYouTubeEmbedUrl, isYouTubeUrl } from "@/lib/utils";

interface HighlightsGridProps {
  highlights: HighlightDto[];
}

export function HighlightsGrid({ highlights }: HighlightsGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open video modal
  const openVideoModal = (videoUrl?: string) => {
    if (videoUrl && isYouTubeUrl(videoUrl)) {
      setSelectedVideo(getYouTubeEmbedUrl(videoUrl));
      setIsModalOpen(true);
    }
  };

  if (!highlights || highlights.length === 0) {
    return null;
  }

  const [featuredHighlight, ...regularHighlights] = highlights;

  return (
    <div className="space-y-8">
      {/* Featured Highlight - Full Width */}
      <FeaturedHighlightCard
        highlight={featuredHighlight}
        onVideoClick={openVideoModal}
      />

      {/* Regular Highlights - Responsive Grid */}
      {regularHighlights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularHighlights.map((highlight) => (
            <HighlightCard
              key={highlight.id}
              highlight={highlight}
              onVideoClick={openVideoModal}
            />
          ))}
        </div>
      )}

      {/* Video Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black">
          <DialogTitle className="sr-only">Lecteur Vidéo</DialogTitle>
          {selectedVideo && (
            <div className="aspect-video w-full">
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface HighlightCardProps {
  highlight: HighlightDto;
  onVideoClick: (videoUrl?: string) => void;
}

function FeaturedHighlightCard({
  highlight,
  onVideoClick,
}: HighlightCardProps) {
  const timeAgo = highlight.createdAt
    ? formatDistanceToNow(new Date(highlight.createdAt), {
        addSuffix: true,
        locale: fr,
      })
    : null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (highlight.videoUrl) {
      onVideoClick(highlight.videoUrl);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row">
        {/* Video Thumbnail */}
        <div className="relative lg:w-1/2">
          <div className="aspect-video relative bg-gray-100">
            {highlight.thumbnailUrl ? (
              <Image
                src={highlight.thumbnailUrl}
                alt={highlight.title || "Highlight video"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Play className="w-12 h-12 text-gray-400" />
              </div>
            )}

            {/* Play Button Overlay */}
            <div
              onClick={handleClick}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-opacity-30 transition-all duration-200 cursor-pointer group"
            >
              <div className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 group-hover:scale-110">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* Duration Badge */}
            {highlight.durationSeconds && (
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatDuration(highlight.durationSeconds)}
              </div>
            )}

            {/* Featured Badge */}
            <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium">
              À la une
            </div>

            {/* Type Badge */}
            {highlight.type && (
              <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium uppercase">
                {highlight.type}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 sm:text-2xl md:text-3xl lg:text-4xl lg:font-bold">
              {highlight.title || "Titre non disponible"}
            </h3>

            {highlight.description && (
              <p className="text-gray-600 mb-4 md:text-lg line-clamp-3 lg:line-clamp-6">
                {highlight.description}
              </p>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
            <div className="flex items-center space-x-4">
              {timeAgo && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {timeAgo}
                </div>
              )}
              {highlight.type && (
                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                  {highlight.type}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ highlight, onVideoClick }: HighlightCardProps) {
  const timeAgo = highlight.createdAt
    ? formatDistanceToNow(new Date(highlight.createdAt), {
        addSuffix: true,
        locale: fr,
      })
    : null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (highlight.videoUrl) {
      onVideoClick(highlight.videoUrl);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Video Thumbnail */}
      <div className="relative">
        <div className="aspect-video relative bg-gray-100">
          {highlight.thumbnailUrl ? (
            <Image
              src={highlight.thumbnailUrl}
              alt={highlight.title || "Highlight video"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
          )}

          {/* Play Button Overlay */}
          <div
            onClick={handleClick}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-opacity-30 transition-all duration-200 cursor-pointer group"
          >
            <div className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 group-hover:scale-110">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          {/* Duration Badge */}
          {highlight.durationSeconds && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {formatDuration(highlight.durationSeconds)}
            </div>
          )}

          {/* Type Badge */}
          {highlight.type && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium uppercase">
              {highlight.type}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {highlight.title || "Titre non disponible"}
        </h3>

        {highlight.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {highlight.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
          <div className="flex items-center space-x-3">
            {timeAgo && (
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {timeAgo}
              </div>
            )}
            {highlight.type && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                {highlight.type}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
