import { ReactNode } from 'react';

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  icon?: ReactNode;
  name: string;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  icon,
  name,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          name={name}
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
