import { config } from "@/lib/config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-2xl mx-auto px-4 py-8 flex justify-between items-center text-sm text-muted-foreground">
        <p>
          {config.name} (<Link href={config.github} target="_blank" className="hover:text-foreground">@rauchg</Link>)
        </p>
        <Link href={config.github} target="_blank" className="hover:text-foreground">
          Source
        </Link>
      </div>
    </footer>
  );
}
