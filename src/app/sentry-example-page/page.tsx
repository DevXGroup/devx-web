"use client";

import * as Sentry from "@sentry/react";
import { Button } from "@/components/ui/button";

export default function SentryExamplePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-md w-full p-8 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-4">Sentry Test Page</h1>
        <p className="text-gray-300 mb-6">
          Click the button below to trigger a test error that will be sent to your Sentry dashboard.
        </p>

        <Button
          onClick={() => {
            Sentry.captureMessage("Test message from Sentry example page", "info");
            throw new Error("Sentry Test Error - This is intentional!");
          }}
          className="w-full bg-theme-green hover:bg-theme-green/90 text-black font-semibold"
        >
          Trigger Test Error
        </Button>

        <div className="mt-6 space-y-3">
          <Button
            onClick={() => {
              Sentry.captureMessage("Manual test message", "info");
              alert("Message sent to Sentry!");
            }}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-700"
          >
            Send Test Message
          </Button>

          <Button
            onClick={() => {
              Sentry.captureException(new Error("Manual exception test"));
              alert("Exception sent to Sentry!");
            }}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-700"
          >
            Send Test Exception
          </Button>

          <Button
            onClick={() => {
              // @ts-ignore - Intentional undefined function call
              myUndefinedFunction();
            }}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-700"
          >
            Call Undefined Function
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-900/50 rounded border border-gray-700">
          <p className="text-xs text-gray-400">
            <strong className="text-white">Note:</strong> Check your Sentry dashboard at{" "}
            <a
              href="https://devx-group-llc.sentry.io/issues/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-green hover:underline"
            >
              sentry.io
            </a>
            {" "}to see the captured errors.
          </p>
        </div>
      </div>
    </div>
  );
}
