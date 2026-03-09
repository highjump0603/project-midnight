"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContact } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력해주세요."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  subject: z.string().optional(),
  message: z.string().min(10, "메시지는 10자 이상 입력해주세요."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

type Status = "idle" | "loading" | "success" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      await submitContact(data);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "전송에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return { form, status, errorMessage, onSubmit: form.handleSubmit(onSubmit), reset };
}
