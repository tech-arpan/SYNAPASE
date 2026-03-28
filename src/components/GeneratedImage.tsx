import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, ImageOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  fallbackUrl?: string;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ prompt, alt, className, fallbackUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsFallback(false);
        
        // Use the platform-provided API key (API_KEY) if available, otherwise fallback to GEMINI_API_KEY
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
          throw new Error('No API key found. Please configure your API key in the settings.');
        }

        const ai = new GoogleGenAI({ apiKey });
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: `${prompt}. High quality, cinematic, 4k, professional digital art, matching a dark night theme with neon cyan and purple accents.`,
              },
            ],
          },
        });

        let foundImage = false;
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64EncodeString = part.inlineData.data;
              setImageUrl(`data:image/png;base64,${base64EncodeString}`);
              foundImage = true;
              break;
            }
          }
        }

        if (!foundImage) {
          throw new Error('No image part found in response');
        }
      } catch (err: any) {
        // Robust error string detection
        const errorStr = JSON.stringify(err).toLowerCase();
        const isQuotaError = 
          errorStr.includes('quota') || 
          errorStr.includes('429') || 
          errorStr.includes('resource_exhausted') ||
          (err.message && (
            err.message.toLowerCase().includes('quota') || 
            err.message.includes('429') || 
            err.message.includes('RESOURCE_EXHAUSTED')
          ));
        
        if (isQuotaError) {
          // Log a helpful warning instead of an error
          console.warn('Gemini AI Quota reached for image generation. Activating high-quality fallback visual.');
          
          if (fallbackUrl) {
            setImageUrl(fallbackUrl);
          } else {
            // Fallback to high-quality placeholder if quota is reached
            // Use a more unique seed based on the prompt and a random factor to avoid identical images
            const seed = encodeURIComponent(prompt.slice(0, 40) + Math.random().toString(36).substring(7));
            setImageUrl(`https://picsum.photos/seed/${seed}/1200/800?grayscale&blur=1`);
          }
          setIsFallback(true);
        } else {
          console.error('Unexpected error during AI image generation:', err);
          setError('Failed to generate AI image');
        }
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt]);

  if (loading) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl aspect-[4/3]", className)}>
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-4" />
        <p className="text-xs text-white/40 uppercase tracking-widest animate-pulse">Generating AI Visual...</p>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl aspect-[4/3]", className)}>
        <ImageOff className="w-8 h-8 text-red-400/50 mb-4" />
        <p className="text-xs text-white/40 uppercase tracking-widest">Visual Unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-2xl">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={cn("w-full h-full object-cover border border-white/10 transition-opacity duration-1000", className)}
        referrerPolicy="no-referrer"
      />
      {isFallback && (
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-xl rounded-full text-[10px] text-cyan-400/80 uppercase tracking-[0.2em] border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          AI Quota Reached • Fallback Active
        </div>
      )}
    </div>
  );
};
