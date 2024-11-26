'use client';

import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-[#d8d3ff] rounded-full w-full h-14 disabled:bg-neutral-200  disabled:text-neutral-400 disabled:cursor-not-allowed font-bold"
    >
      {pending ? 'Loading' : text}
    </button>
  );
}
