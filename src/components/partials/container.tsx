import { cn } from "@/lib/utils";

export default function Container({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  padding?: string;
  className?: string;
}>) {
  return (
    <div className={cn("mx-auto md:container px-4 md:px-8", className)}>
      {children}
    </div>
  );
}
