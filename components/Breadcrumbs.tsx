import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb navigation" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
            )}
            {index === items.length - 1 ? (
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
