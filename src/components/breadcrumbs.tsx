import Link from "next/link";

export function Breadcrumbs({
  items,
  className = "text-foreground/60",
}: {
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            <Link href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
