import Link from "next/link";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="wash-left">
      <div className="wrap flex min-h-[70vh] flex-col justify-center py-24">
        <div className="max-w-[46ch]">
          <Eyebrow className="mb-5">Error 404</Eyebrow>

          <h1 className="h1p">Page not found</h1>

          <p className="body mt-6">
            The page you are looking for does not exist or has been moved.
            The pages below are a good place to start.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href="/">Back to home</Button>
            <Button href="/services" variant="secondary">
              Explore our services
            </Button>
          </div>

          <p className="small mt-8">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="link font-medium">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
