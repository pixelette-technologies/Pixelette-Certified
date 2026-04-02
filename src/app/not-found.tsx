import Link from "next/link";
import { FileQuestion } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #14AAA9 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-8">
          <FileQuestion className="h-10 w-10 text-accent" />
        </div>

        <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter mb-4">
          <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page not found
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Let us get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            View services
          </Button>
        </div>

        <p className="mt-8 text-sm text-gray-600">
          If you believe this is an error, please{" "}
          <Link
            href="/contact"
            className="text-accent hover:text-accent-light transition-colors font-medium"
          >
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
