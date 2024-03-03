import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface InputWithErrorProps extends InputProps {
  errorMsg?: string;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

const InputWithErrorMsg = (props: InputWithErrorProps) => {
  const { errorMsg, isError } = props;
  return (
    <div className="relative flex w-full flex-col gap-1">
      <Input {...props} />
      {isError && <p className="px-2 text-sm text-destructive">{errorMsg}</p>}
    </div>
  );
};
Input.displayName = "Input";

export { Input, InputWithErrorMsg };
