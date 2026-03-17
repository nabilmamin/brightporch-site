"use client";

import { useState } from "react";

export default function UnsubscribePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleUnsubscribe() {
    setStatus("loading");
    const { id } = await params;
    try {
      const res = await fetch(`/api/unsubscribe/${id}`, { method: "POST" });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-600">
            Unsubscribed
          </h1>
          <p className="text-gray-600">
            You have been successfully unsubscribed. You will not receive any
            more emails from us.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Unsubscribe</h1>
        <p className="text-gray-600 mb-6">
          Click below to stop receiving emails from us.
        </p>
        <button
          onClick={handleUnsubscribe}
          disabled={status === "loading"}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {status === "loading" ? "Processing..." : "Unsubscribe"}
        </button>
        {status === "error" && (
          <p className="text-red-600 mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
