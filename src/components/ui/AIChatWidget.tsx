"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, RotateCcw } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import WeldButton from "./WeldButton";

/* ── Ferrite Logo Icon (inline SVG for the FAB) ────────────── */
const FerriteLogo = ({ className = "w-9 h-9" }: { className?: string }) => (
  <Image
    src="/ferrite-icon.svg"
    alt="Ferrite"
    width={44}
    height={44}
    className={className}
    priority
  />
);

/* ── Types ─────────────────────────────────────────────────── */
interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

/* ── Quick reply chips ─────────────────────────────────────── */
const QUICK_REPLIES = [
  { label: "Get a Quote", query: "Can you provide a price quote for structural steel?" },
  { label: "Stock Check", query: "What structural steel do you have in stock at Kalamboli?" },
  { label: "MTC Info", query: "Do you provide Mill Test Certificates with every delivery?" },
];

/* ── Component ─────────────────────────────────────────────── */
export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "greeting",
      role: "assistant",
      content:
        "Hello! 👋 How can I help with your steel requirement today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  /* ── Proactive popup (once, after 5s) ───────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasInteracted) setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  /* ── Scroll chat to bottom ──────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  /* ── Lock body scroll when chat is open ─────────────────── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── Focus input when opened ────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setShowPopup(false);
      setHasInteracted(true);
      setTimeout(() => inputRef.current?.focus(), 250);
      trackEvent({
        name: "whatsapp_click",
        params: { location: "ai_chat_widget", message_type: "open_chat" },
      });
    }
  }, [isOpen]);

  /* ── Prevent background scroll via wheel/touch on chat ──── */
  const stopPropagation = useCallback((e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  /* ── Handlers ───────────────────────────────────────────── */
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleReset = () => {
    setMessages([
      {
        id: "greeting-" + Date.now(),
        role: "assistant",
        content: "Hello! 👋 How can I help with your steel requirement today?",
      },
    ]);
  };

  const sendMessage = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || isTyping) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: cleanText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: "assistant-" + Date.now(),
            role: "assistant",
            content:
              data.reply ||
              "Please connect with our sales team at +91 88283 35168.",
          },
        ]);
      } else {
        throw new Error("Failed");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "fallback-" + Date.now(),
          role: "assistant",
          content:
            "Sorry, I couldn't process that. Please call us at +91 88283 35168 or email contact@ferrite.in.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <aside aria-label="Ferrite AI Chat" className="fixed bottom-6 right-6 z-50">
      {/* ════════════════════════════════════════════════════════ */}
      {/* POPUP TEASER                                            */}
      {/* ════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpen && showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[72px] right-0 w-64 rounded-2xl bg-[#111315]/95 backdrop-blur-xl border border-white/15 p-3.5 shadow-2xl shadow-black/80 select-none"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 p-0.5 text-white/40 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-[13px] text-white/90 leading-snug pr-4">
              Need a quick steel quote?
            </p>
            <button
              onClick={handleOpen}
              className="mt-2 text-[12px] font-semibold text-[#FF7A1A] hover:underline"
            >
              Chat with us →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════ */}
      {/* CHAT WINDOW                                             */}
      {/* ════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="absolute bottom-[72px] right-0 w-[calc(100vw-32px)] sm:w-[370px] h-[500px] max-h-[80vh] rounded-2xl bg-[#111315]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
            onWheel={stopPropagation}
            onTouchMove={stopPropagation}
          >
            {/* ── Header ─────────────────────────────────────── */}
            <div className="px-4 py-3 bg-[#16181B] border-b border-white/[0.08] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#111315] border border-white/15 flex items-center justify-center overflow-hidden">
                  <FerriteLogo className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[13px] text-white leading-none">
                    Ferrite AI
                  </h3>
                  <p className="text-[10px] text-[#6B7280] mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Reset"
                  title="New conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Messages ───────────────────────────────────── */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 bg-[#0D0E10]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] text-white rounded-br-md shadow-[0_2px_10px_rgba(255,122,26,0.25)]"
                        : "bg-[#16181B] text-[#D1D5DB] rounded-bl-md border border-white/[0.08] whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing dots */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#16181B] border border-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick replies ───────────────────────────────── */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-[#111315] border-t border-white/[0.06] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {QUICK_REPLIES.map((qr, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(qr.query)}
                    className="px-3 py-1.5 rounded-full bg-[#16181B] hover:bg-[#202328] border border-white/10 hover:border-[#FF7A1A]/40 text-white/80 hover:text-white text-[11px] whitespace-nowrap transition-all shrink-0"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ──────────────────────────────────────── */}
            <div className="p-3 bg-[#16181B] border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#0D0E10] border border-white/10 focus:border-[#FF7A1A]/60 rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-white/35 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] hover:from-[#FF882E] hover:to-[#FFA04D] disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-[0_2px_10px_rgba(255,122,26,0.3)] transition-all shrink-0"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════ */}
      {/* FAB (WELD BUTTON) - INDUSTRIAL CANVAS PHYSICS SPARKS     */}
      {/* ════════════════════════════════════════════════════════ */}
      <WeldButton
        size={58}
        isOpen={isOpen}
        onClick={isOpen ? handleClose : handleOpen}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Open Ferrite AI Chat"}
      >
        {/* Notification dot */}
        {!isOpen && !hasInteracted && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#111315] z-20 pointer-events-none" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FerriteLogo className="w-10 h-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </WeldButton>
    </aside>
  );
}
