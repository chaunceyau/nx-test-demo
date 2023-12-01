import { PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="block px-8 py-2 rounded bg-indigo-600 text-white font-medium w-max"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
