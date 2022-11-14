import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

interface Props {
  type: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  labelText: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: JSX.Element;
}

export const InputField: React.FC<Props> = ({
  type,
  labelText,
  placeholder,
  required,
  id,
  value,
  onChange,
  children,
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id}>
        <span>{labelText}</span>
      </label>
      <div className="relative">
        <input
          className="bg-transparent outline-none p-2 focus:border-blue-400 w-full rounded border-2 border-blue-200 md:w-80"
          id={id}
          type={inputType}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          <span
            onClick={() => {
              inputType === "password"
                ? setInputType("text")
                : setInputType(type);
            }}
            className="absolute text-lg text-blue-400 right-5 top-1/2 -translate-y-1/2"
          >
            {inputType === "text" ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};
