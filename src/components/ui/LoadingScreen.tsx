import { Loader } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader className="animate-spin h-10 w-10 text-mint-500" />
      
    </div>
  );
}
