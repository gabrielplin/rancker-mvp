import { RegistrationStep } from '~/presentation/contexts';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import { useIsMobile } from '~/presentation/hooks/globals';
import styles from './step-tab.module.scss';

type CircleProgressProps = {
  currentStep: number;
  totalSteps: number;
  size?: number;
  strokeWidth?: number;
};

const steps: { [key in RegistrationStep]: string } = {
  categories: 'Categorias',
  info: 'Cadastro',
  teams: 'Duplas',
  payment: 'Pagamento'
};

const CircleProgress = ({
  currentStep,
  totalSteps,
  size = 120,
  strokeWidth = 8
}: CircleProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const safeTotalSteps = totalSteps || 1;
  const safeCurrentStep = currentStep || 0;

  const progress = Math.min(safeCurrentStep / safeTotalSteps, 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {/* fundo */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke='#BFBFBF'
        strokeWidth={strokeWidth}
        fill='none'
      />
      {/* progresso */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke='#FFD600'
        strokeWidth={strokeWidth}
        fill='none'
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap='round'
        style={{
          transition: 'stroke-dashoffset 0.4s ease'
        }}
      />
    </svg>
  );
};

const StepTabDesktop = () => {
  const { state, setStep } = useRegistrationFlow();

  const currentStepIndex = Object.keys(steps).findIndex(
    step => step === state.step
  );

  return (
    <ul className={styles['step-tab']}>
      {Object.entries(steps).map(([item, label], index) => {
        const isCompleted = index <= currentStepIndex;
        console.log(isCompleted, 'isCompleted');
        return (
          <li
            className={isCompleted ? styles['step-tab__active'] : ''}
            key={index}
            onClick={() => setStep(item as RegistrationStep)}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
};

const StepCircleMobile = () => {
  const { state } = useRegistrationFlow();

  const entries = Object.entries(steps);
  const keys = Object.keys(steps);

  const currentStepIndex = keys.findIndex(step => step === state.step) + 1;

  const nextStepEntry = entries[currentStepIndex];

  const stepLength = keys.length;

  const nextStep = nextStepEntry ? nextStepEntry[1] : null;

  const isNotLastStep = currentStepIndex !== 4;

  console.log(isNotLastStep, stepLength);

  return (
    <div className={styles['step-mobile']}>
      <div className={styles['step-mobile__circle']}>
        <CircleProgress
          currentStep={currentStepIndex}
          totalSteps={stepLength}
          size={64}
          strokeWidth={4}
        />

        <span>
          {currentStepIndex}/{stepLength}
        </span>
      </div>

      <div className={styles['step-mobile__progress']}>
        <p>Etapa {currentStepIndex}</p>
        <span>{steps[state.step]}</span>
        {isNotLastStep && <p>Próxima Etapa: {nextStep}</p>}
      </div>
    </div>
  );
};

const StepTabComponent = () => {
  const isMobile = useIsMobile();

  return isMobile ? <StepCircleMobile /> : <StepTabDesktop />;
};
export default StepTabComponent;
