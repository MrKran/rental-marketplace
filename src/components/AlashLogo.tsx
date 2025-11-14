import { GraduationCap } from "lucide-react";

interface AlashLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function AlashLogo({ size = "md", showText = true, className = "" }: AlashLogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", container: "w-8 h-8", text: "text-base" },
    md: { icon: "w-8 h-8", container: "w-12 h-12", text: "text-xl" },
    lg: { icon: "w-12 h-12", container: "w-16 h-16", text: "text-3xl" }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${currentSize.container} bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg`}>
        <GraduationCap className={`${currentSize.icon} text-white`} />
      </div>
      {showText && (
        <span className={`${currentSize.text} font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}>
          Alash
        </span>
      )}
    </div>
  );
}
