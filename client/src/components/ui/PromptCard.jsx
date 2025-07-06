import { Check, Copy, MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const PromptCard = ({ prompt }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  const sharePrompt = () => {
    const text = `Check out this AI prompt: "${prompt.title}"\n\n${prompt.promptText}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const trimmedText =
    prompt.promptText.length > 300
      ? prompt.promptText.slice(0, 250) + "..."
      : prompt.promptText;

  return (
    <div className="group bg-white dark:bg-black/90 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col w-full h-full max-h-[620px]">
      {/* Image Section with Background */}
      {prompt.imgUrl && (
        <div className="relative w-full aspect-[16/9] overflow-hidden group">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover blur-sm scale-105 z-0"
            style={{
              backgroundImage: `url(${prompt.imgUrl || "/bg-placeholder.jpg"})`,
            }}
          />

          {/* Main Image */}
          <img
            src={prompt.imgUrl}
            alt={prompt.title}
            className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.jpg"; // optional fallback
            }}
          />

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 z-20 px-3 py-1 bg-black/40 text-white text-xs font-medium rounded-full capitalize">
            {prompt.category.replace(/-/g, " ")}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {prompt.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {prompt.description}
          </p>
        </div>

        <div>
          <div className="bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {trimmedText}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-3 flex justify-between items-center">
        <button
          onClick={() => copyToClipboard(prompt.promptText, prompt.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300"
        >
          {copiedId === prompt.id ? (
            <>
              <Check size={16} className="text-green-500" />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>

        <button
          onClick={sharePrompt}
          className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors text-green-600 dark:text-green-400"
          title="Share on WhatsApp"
        >
          <MessageCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
