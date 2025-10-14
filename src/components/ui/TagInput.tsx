import React, { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  placeholder = "Type and press Enter...",
  className = "",
  error
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-secondary-100 text-secondary-800 px-2 py-1 rounded-md"
          >
            <span className="mr-1">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-secondary-600 hover:text-secondary-800"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        className={`w-full p-4 rounded-lg ${error ? "border-red-500" : "bg-gray-50"}`}
        error={error}
      />
      {tags.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to add a new item
        </p>
      )}
    </div>
  );
};
