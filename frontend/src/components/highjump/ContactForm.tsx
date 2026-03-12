"use client";

import { Send, CheckCircle } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full bg-white border border-hj-border text-hj-text placeholder-hj-muted rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-hj-primary focus:ring-2 focus:ring-hj-primary/15 transition-all duration-200";

export default function HjContactForm() {
  const { form, status, errorMessage, onSubmit } = useContactForm();
  const {
    register,
    formState: { errors },
  } = form;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
          <CheckCircle size={24} className="text-emerald-500" />
        </div>
        <div>
          <p className="font-display font-bold text-hj-text text-xl">메시지 전송 완료</p>
          <p className="text-hj-secondary text-sm mt-1">빠른 시일 내에 답변 드리겠습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-hj-secondary uppercase tracking-wider">
            Name *
          </label>
          <input
            {...register("name")}
            placeholder="Your name"
            className={cn(inputCls, errors.name && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
          />
          {errors.name && (
            <span className="font-mono text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-hj-secondary uppercase tracking-wider">
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={cn(inputCls, errors.email && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
          />
          {errors.email && (
            <span className="font-mono text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-xs text-hj-secondary uppercase tracking-wider">
          Subject
        </label>
        <input
          {...register("subject")}
          placeholder="What's this about?"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-xs text-hj-secondary uppercase tracking-wider">
          Message *
        </label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="Tell me about your project or just say hello..."
          className={cn(inputCls, "resize-none", errors.message && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
        />
        {errors.message && (
          <span className="font-mono text-xs text-red-500">{errors.message.message}</span>
        )}
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-mono text-xs text-red-600">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start inline-flex items-center gap-2 px-7 py-3.5 bg-[#09090B] text-white font-mono font-semibold text-sm rounded-full hover:bg-hj-primary transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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
