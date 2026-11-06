"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Bot,
  User,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const QUICK_REPLIES = [
  { label: "Request a Quote", query: "Can you provide a price quote for structural steel?" },
  { label: "Stock at Kalamboli", query: "What structural steel sections do you have in stock at Kalamboli?" },
  { label: "MTC & Standards", query: "Do you supply 100% Mill Test Certificates (MTC) with SAIL / RINL steel?" },
  { label: "Custom Sizing", query: "What cutting and value-added processing services do you offer?" },
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content:
        "Hello! 👋 I am the **Ferrite AI Steel Consultant**.\n\nWe stock and process primary structural steel (Beams, Channels, Angles, Plates, Pipes) at our Kalamboli yard with 100% MTC traceability.\n\nHow can I help with your project today?",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Proactive popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowPopup(false);
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
      trackEvent({
        name: "whatsapp_click",
        params: { location: "ai_chat_widget", message_type: "open_chat" },
      });
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial-greeting-" + Date.now(),
        role: "assistant",
        content:
          "Hello! 👋 I am the **Ferrite AI Steel Consultant**.\n\nHow can I assist your structural steel procurement today?",
        timestamp: "Just now",
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
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Call /api/chat route
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
        const botMsg: ChatMessage = {
          id: "assistant-" + Date.now(),
          role: "assistant",
          content: data.reply || "Thank you for reaching out. Please connect directly with our sales team at +91 88283 35168.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Chat response failed");
      }
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg: ChatMessage = {
        id: "assistant-fallback-" + Date.now(),
        role: "assistant",
        content:
          "Our sales desk is ready to help you with immediate prices, weights, and stock availability. Connect with us instantly on WhatsApp (+91 88283 35168) or call our Ghatkopar HQ.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
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

  // WhatsApp transfer with conversation summary
  const getWhatsAppHandoffUrl = () => {
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    const inquiry = lastUserMsg ? lastUserMsg.content : "Inquiry from website chat";
    const text = `Hi Ferrite Team! I was chatting with your AI assistant on ferrite.in regarding: "${inquiry}". Please provide pricing and availability.`;
    return `https://wa.me/918828335168?text=${encodeURIComponent(text)}`;
  };

  return (
    <aside aria-label="Ferrite AI Chat Assistant" className="fixed bottom-6 right-6 z-50">
      {/* ======================================================== */}
      {/* 1. PROACTIVE FLOATING SPEECH TEASER (Popup)             */}
      {/* ======================================================== */}
      <AnimatePresence>
        {!isOpen && showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-72 sm:w-80 rounded-2xl bg-[#0D1217]/95 border border-[#FF7A1A]/30 p-4 shadow-2xl backdrop-blur-xl select-none"
          >
            {/* Close popup button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF7A1A] to-[#FF5500] flex items-center justify-center text-white shrink-0 shadow-[0_0_12px_rgba(255,122,26,0.5)]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-xs text-white">Ferrite AI Consultant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-xs text-[#9CA3AF] leading-snug">
                  Need an instant steel price quote, section sizes, or stock check at Kalamboli?
                </p>
                <button
                  onClick={handleOpen}
                  className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-[#FF7A1A] hover:underline pt-1"
                >
                  <span>Chat now</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 2. CHAT WINDOW DRAWER                                    */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-32px)] sm:w-[390px] h-[540px] max-h-[82vh] rounded-3xl bg-[#0B0F14] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#11171E] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF7A1A] to-[#FF5500] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,122,26,0.45)]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#11171E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-extrabold text-sm text-white tracking-tight">Ferrite AI</h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Steel Specialist · Online</span>
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick WhatsApp Handover Banner */}
            <div className="px-4 py-2 bg-gradient-to-r from-[#25D366]/15 via-transparent to-transparent border-b border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-white/80">Prefer direct human engineer support?</span>
              <a
                href={getWhatsAppHandoffUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-heading font-bold text-[#25D366] hover:underline"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                      msg.role === "user"
                        ? "bg-white/10 text-white"
                        : "bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/30"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] text-white font-medium rounded-tr-none shadow-[0_4px_15px_rgba(255,122,26,0.3)]"
                        : "bg-[#141B22] border border-white/10 text-[#D1D5DB] rounded-tl-none whitespace-pre-wrap"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span
                      className={`block text-[10px] mt-1 font-mono ${
                        msg.role === "user" ? "text-white/70 text-right" : "text-white/40"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/30 flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[#141B22] border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Chips */}
            <div className="px-3 py-2 bg-[#0E1319] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none select-none">
              {QUICK_REPLIES.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(qr.query)}
                  className="px-2.5 py-1 rounded-full bg-[#161D26] hover:bg-[#1E2733] border border-white/10 hover:border-[#FF7A1A]/40 text-white/80 hover:text-white text-[11px] whitespace-nowrap transition-all shrink-0 font-medium"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Bottom Input Area */}
            <div className="p-3 bg-[#11171E] border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about beams, channels, stock, MTC..."
                  className="flex-1 bg-[#0A0D12] border border-white/15 focus:border-[#FF7A1A] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
                />

                {/* Direct WhatsApp Quick Share Button */}
                <a
                  href={getWhatsAppHandoffUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Forward chat to WhatsApp"
                  className="p-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 transition-colors shrink-0 flex items-center justify-center"
                  aria-label="Chat on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.997.587 1.956.887 2.801.887 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.774-5.773-5.774zm3.364 8.204c-.144.405-.837.774-1.171.824-.312.045-.694.06-2.115-.527-.999-.413-1.638-1.428-1.688-1.495-.05-.067-.406-.54-.406-1.031s.256-.732.347-.932c.091-.2.199-.258.266-.258s.133.003.189.006c.061.003.14-.023.219.167.079.19.269.655.293.704.024.05.04.108.007.174-.033.067-.05.108-.1.167-.05.058-.105.13-.15.174-.05.05-.102.104-.044.204.058.099.256.423.551.685.38.338.701.442.8.492.099.05.157.042.215-.025.058-.066.248-.29.314-.39.066-.099.133-.083.223-.05.091.033.579.273.678.322.099.05.165.075.19.116.025.041.025.241-.119.646z" />
                  </svg>
                </a>

                {/* Send Button */}
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] hover:from-[#FF882E] hover:to-[#FFA04D] disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-[0_0_12px_rgba(255,122,26,0.35)] transition-all shrink-0 flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#6B7280] mt-2 px-1">
                <span>Ferrite Structural Steels · Lineage 1965</span>
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 3. FLOATING LAUNCHER BUTTON (REPLACES WHATSAPP ICON)      */}
      {/* ======================================================== */}
      <div className="relative">
        {/* Radar Pulse Effect when closed */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#FF7A1A] opacity-25 animate-ping -z-10 pointer-events-none" />
            <span className="absolute -inset-2 rounded-full border border-[#FF7A1A]/40 animate-pulse -z-10 pointer-events-none" />
          </>
        )}

        <button
          onClick={isOpen ? handleClose : handleOpen}
          aria-expanded={isOpen}
          className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(255,122,26,0.45)] hover:shadow-[0_10px_35px_rgba(255,122,26,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A] focus:ring-offset-2 focus:ring-offset-[#070A0D] ${
            isOpen
              ? "bg-[#141B22] text-white border border-white/20"
              : "bg-gradient-to-br from-[#FF7A1A] via-[#FF6600] to-[#E65500] text-white"
          }`}
          aria-label={isOpen ? "Close AI chat assistant" : "Open Ferrite AI chat assistant"}
        >
          {/* Unread / New Indicator Badge */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center px-1 border-2 border-[#070A0D] shadow-md animate-bounce">
              1
            </span>
          )}

          {/* Animated Icon Flip */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>

            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 0 : -90, scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <X className="w-6 h-6" />
            </motion.div>
          </div>
        </button>
      </div>
    </aside>
  );
}
