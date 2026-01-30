import { RegistrationStep } from '~/presentation/contexts';
import { CategoryStepTag } from '../category';
import { InfoStepTag } from '../info';
import { PaymentStepTag } from '../payment';
import { TeamStepTag } from '../team';

type Props = {
  step: RegistrationStep;
};

const StepRendererComponent = ({ step }: Props) => {
  const steps: Record<RegistrationStep, React.ReactNode> = {
    categories: <CategoryStepTag />,
    info: <InfoStepTag />,
    teams: <TeamStepTag />,
    payment: <PaymentStepTag />
  };
  return steps[step];
};

export default StepRendererComponent;
