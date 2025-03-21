import FeelingForm from "@/components/feeling-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Link
        href={"/history"}
        className="absolute top-6 right-2"
      >
        <Button variant="outline">History Page</Button>
      </Link>
      <FeelingForm />
    </div>
  );
}
