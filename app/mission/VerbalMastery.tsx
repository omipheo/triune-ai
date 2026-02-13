"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: { results: Array<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type VerbalMasteryProps = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
};

export function VerbalMastery({ onTranscript, disabled }: VerbalMasteryProps) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<{ stop: () => void; abort: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as Window & { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    setSupported(!!SpeechRecognition);
    if (!SpeechRecognition) setError("Voice not supported in this browser.");
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!supported || disabled) return;
    setError(null);
    const w = window as Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance };
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-SG";

    rec.onresult = (event: { results: Array<{ isFinal: boolean; 0: { transcript: string } }> }) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      if (event.results[last].isFinal && transcript.trim()) {
        onTranscript(transcript.trim());
      }
    };
    rec.onerror = (e: { error: string }) => {
      setError(e.error === "not-allowed" ? "Microphone access denied." : e.error);
      setIsListening(false);
      recognitionRef.current = null;
    };
    rec.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
    };

    try {
      rec.start();
      recognitionRef.current = rec;
      setIsListening(true);
    } catch (err) {
      setError(String(err));
    }
  }, [supported, disabled, onTranscript]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (isListening) stopListening();
    else startListening();
  }, [isListening, startListening, stopListening]);

  if (!supported) {
    return (
      <p className="text-center text-sm text-[#94a3b8]">
        Use the text box below. Voice requires a supported browser (Chrome, Edge, Safari).
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition ${
          isListening
            ? "border-[#FFD700] bg-[#FFD700]/20"
            : "border-white/30 bg-white/5 hover:border-[#FFD700]/50"
        } ${disabled ? "opacity-50" : ""}`}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
      >
        <span className="text-3xl">{isListening ? "⏹" : "🎤"}</span>
        {isListening && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#FFD700]/20" />
        )}
      </button>
      <p className="text-xs text-[#94a3b8]">
        {isListening ? "Listening… Speak now." : "Verbal Mastery — Tap to speak"}
      </p>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
