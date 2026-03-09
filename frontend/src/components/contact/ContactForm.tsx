"use client";

import { Send } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import ContactSuccess from "./ContactSuccess";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full bg-midnight-800 border border-midnight-600 text-silver-50 placeholder-silver-400 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-moon-glow/60 focus:ring-1 focus:ring-moon-glow/30 transition-all duration-200";

export default function ContactForm() {
  const { form, status, errorMessage, onSubmit } = useContactForm();
  const {
    register,
    formState: { errors },
  } = form;

  if (status === "success") {
    return <ContactSuccess />;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-silver-300 uppercase tracking-wider">
            Name *
          </label>
          <input
            {...register("name")}
            placeholder="Your name"
            className={cn(inputBase, errors.name && "border-red-500/60")}
          />
          {errors.name && (
            <span className="font-mono text-xs text-red-400">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-silver-300 uppercase tracking-wider">
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={cn(inputBase, errors.email && "border-red-500/60")}
          />
          {errors.email && (
            <span className="font-mono text-xs text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-xs text-silver-300 uppercase tracking-wider">
          Subject
        </label>
        <input
          {...register("subject")}
          placeholder="What's this about?"
          className={inputBase}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-xs text-silver-300 uppercase tracking-wider">
          Message *
        </label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="Tell me about your project or just say hello..."
          className={cn(
            inputBase,
            "resize-none",
            errors.message && "border-red-500/60"
          )}
        />
        {errors.message && (
          <span className="font-mono text-xs text-red-400">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 font-mono text-xs text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start inline-flex items-center gap-2 px-7 py-3.5 bg-star-gold text-midnight-950 font-mono font-semibold text-sm rounded-xl shadow-gold-glow hover:bg-yellow-400 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-midnight-800/40 border-t-midnight-950 rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={14} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
