"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="group w-full sm:w-auto rounded-2xl font-bold text-lg h-15.5 py-4 px-8 border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1"
    >
      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
      Go Back
    </Button>
  );
}
