import { CheckCircle } from "lucide-react";

export default function ContactSuccess() {
  return (
    <div className="flex flex-col items-center gap-5 py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-moon-glow/15 border border-moon-glow/30 flex items-center justify-center shadow-moon-glow">
        <CheckCircle size={28} className="text-moon-glow" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-silver-50">
          Message Sent!
        </h3>
        <p className="font-mono text-sm text-silver-300">
          {"// Thanks for reaching out. I'll get back to you soon."}
        </p>
      </div>
    </div>
  );
}
