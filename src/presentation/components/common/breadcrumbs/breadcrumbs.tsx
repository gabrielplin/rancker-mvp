import Link from 'next/link';
import styles from './breadcrumbs.module.scss';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

function BreadcrumbsComponent({ items }: BreadcrumbsProps) {
  const lastIndex = items.length - 1;

  return (
    <nav className={styles.breadcrumbs} aria-label='breadcrumb'>
      {items.map((item, index) => (
        <span
          key={item.label}
          className={`${styles.breadcrumbs__item} ${
            index === lastIndex ? styles['breadcrumbs__item--current'] : ''
          }`}
        >
          {index !== lastIndex && item.href ? (
            <Link
              href={item.href}
              className={styles['breadcrumbs__item--link']}
            >
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </span>
      ))}
    </nav>
  );
}

export default BreadcrumbsComponent;
