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
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
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
  onBlur,
  children,
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={id}>
        <span>{labelText}</span>
      </label>
      <div className="relative">
        <input
          className="bg-transparent outline-none p-3 focus:border-teal-400 w-full rounded-md border-2 border-black"
          id={id}
          type={inputType}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />

        {type === "password" && (
          <span
            onClick={() => {
              inputType === "password"
                ? setInputType("text")
                : setInputType(type);
            }}
            className="absolute text-lg text-black right-5 top-1/2 -translate-y-1/2"
          >
            {inputType === "text" ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};
