interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full">
        <input
          className="bg-slate-50 rounded-full w-full h-14 focus:outline-none ring-1 focus:ring-2 transition ring-neutral-200 focus:ring-[#07137d] border-none placeholder:text-neutral-400 pl-12"
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
