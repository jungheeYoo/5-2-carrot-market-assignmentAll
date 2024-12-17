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
      className="bg-neutral-900 text-white rounded-full w-full h-14 hover:text-[#d7acc6] transition-all duration-300 ease-in-out disabled:bg-neutral-200  disabled:text-neutral-400 disabled:cursor-not-allowed font-bold mt-5"
    >
      {pending ? 'Loading' : text}
    </button>
  );
}
