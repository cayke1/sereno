"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Feeling } from "@/@types/feelings";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function HistoryPage() {
  const [feelings, setFeelings] = useState<Feeling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchFeelings() {
    try {
      const response = await fetch("/api/feelings");

      if (!response.ok) {
        throw new Error("Failed to fetch feelings");
      }

      const data = await response.json();
      setFeelings(data);
    } catch (error) {
      setError("Error loading feelings history");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFeelings();
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  function getMoodEmoji(mood: string) {
    switch (mood) {
      case "veryBad":
        return "😢";
      case "bad":
        return "😕";
      case "neutral":
        return "😐";
      case "good":
        return "🙂";
      case "veryGood":
        return "😄";
      default:
        return "";
    }
  }

  function formatMood(mood: string) {
    switch (mood) {
      case "veryBad":
        return "Very Bad";
      case "bad":
        return "Bad";
      case "neutral":
        return "Neutral";
      case "good":
        return "Good";
      case "veryGood":
        return "Very Good";
      default:
        return mood;
    }
  }

  const handleDelete = async (id: string) => {
    try {
      if (confirm("Tem certeza que deseja deletar?")) {
        const res = await fetch(`/api/feelings/delete/${id}`, {
          method: "DELETE",
        });
        if (res.ok) toast.success("Feeling deletado com sucesso");
      }
      fetchFeelings();
    } catch (error) {
      console.log(error);
      toast.error("Falha ao deletar feeling");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Feelings History</h1>
          <Link href="/">
            <Button variant="outline">Back to Form</Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Loading your feelings history...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : feelings.length === 0 ? (
          <p className="text-center">No feelings recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {feelings
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((feeling, index) => (
                <Card key={index}>
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                      <span>{getMoodEmoji(feeling.mood)}</span>
                      <span>
                        {formatMood(feeling.mood)} -{" "}
                        {feeling.predominant_feeling}
                      </span>
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {formatDate(feeling.createdAt)}
                    </p>

                    <div className="absolute -top-2 right-2 cursor-pointer">
                      <Button
                        onClick={() => handleDelete(feeling.id)}
                        variant={"destructive"}
                        className="hover:scale-110 transition-all"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </CardHeader>
                  {feeling.description && (
                    <CardContent>
                      <p>{feeling.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
