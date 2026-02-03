import { AthleteFormData } from '~/presentation/contexts';

type Category = {
  id: string;
  name: string;
};

export function formatPayerName({
  athlete,
  categories,
  teamsByCategory
}: {
  athlete: AthleteFormData;
  categories: Category[];
  teamsByCategory: Record<string, AthleteFormData>;
}) {
  return categories
    .map(category => {
      const partner = teamsByCategory[category.id];

      if (!partner) return null;

      const athleteLabel = `${athlete.name} - @${athlete.instagram ?? '-'} - ${athlete.uniformSize ?? '-'}`;
      const partnerLabel = `${partner.name} - @${partner.instagram ?? '-'} - ${partner.uniformSize ?? '-'}`;

      return `(${category.name}, ${athleteLabel} / ${partnerLabel})`;
    })
    .filter(Boolean)
    .join(', ');
}
