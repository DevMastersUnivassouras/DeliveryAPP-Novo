
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={handleError}
      className={cn("object-cover", className)}
      {...props}
    />
  );
};
