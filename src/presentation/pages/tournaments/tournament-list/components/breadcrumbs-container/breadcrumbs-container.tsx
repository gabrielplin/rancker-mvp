import { BreadcrumbsTag } from '~/presentation/components/common';

type BreadcrumbsProps = {
  items?: {
    label: string;
    href?: string;
  }[];
};

const itemsDefault = [
  { label: 'Início', href: '/atleta' },
  { label: 'Torneios' }
];

function BreadcrumbsContainerComponent({
  items = itemsDefault
}: BreadcrumbsProps) {
  return <BreadcrumbsTag items={items} />;
}

export default BreadcrumbsContainerComponent;
