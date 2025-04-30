/* eslint-disable react/display-name */
import { useState, ChangeEvent, forwardRef } from "react";
import { Input } from "@/components/ui/input";

type TimeInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: () => void;
};

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      name,
      id = "time-input",
      placeholder = "HH:MM",
      disabled,
      className,
      onBlur,
      ...rest
    } = props;

    const [internalValue, setInternalValue] = useState("");

    const displayValue = value !== undefined ? value : internalValue;

    const isValidTime = (input: string): boolean => {
      const [hoursStr, minutesStr] = input.split(":");
      const hours = hoursStr ? parseInt(hoursStr, 10) : NaN;
      const minutes = minutesStr ? parseInt(minutesStr, 10) : NaN;

      if (!isNaN(hours) && (hours < 0 || hours > 23)) {
        return false;
      }
      if (!isNaN(minutes) && (minutes < 0 || minutes > 59)) {
        return false;
      }
      return true;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/\D/g, "");

      if (input.length <= 4) {
        let formatted = "";

        if (input.length > 0) {
          formatted = input.substring(0, Math.min(2, input.length));
        }

        if (input.length > 2) {
          formatted += ":" + input.substring(2, Math.min(4, input.length));
        }

        // Validate the formatted time
        if (formatted && !isValidTime(formatted)) {
          return; // Don't update if the time is invalid
        }

        if (onChange) {
          onChange(formatted);
        } else {
          setInternalValue(formatted);
        }
      }
    };

    return (
      <Input
        ref={ref}
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        onBlur={onBlur}
        {...rest}
      />
    );
  }
);