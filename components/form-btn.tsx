interface FormButtonProps {
  loading: boolean;
  text: string;
}

export default function FormButton({ loading, text }: FormButtonProps) {
  return (
    <button
      disabled={loading}
      className="bg-[#d8d3ff] rounded-full w-full h-14 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed font-bold"
    >
      {loading ? 'Loading' : text}
    </button>
  );
}
