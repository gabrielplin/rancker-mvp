'use client';
import React from 'react';
import './service-card.styles.scss';
import { ChevronRightIcon } from '../../icons';

export type ServiceCardProps = {
  id: string;
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onDetails?: () => void;
  className?: string;
};

function ServiceCardComponent({
  id,
  title,
  description,
  checked,
  onChange,
  onDetails,
  className
}: ServiceCardProps) {
  const inputId = `service-card-${id}`;

  return (
    <div className={`service-card ${className ?? ''}`}>
      <input
        id={inputId}
        type='checkbox'
        className='service-card__input'
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />

      <label htmlFor={inputId} className='service-card__surface'>
        <span className='service-card__box' aria-hidden='true'>
          <CheckIcon className='service-card__check' />
        </span>

        <div className='service-card__content'>
          <h3 className='service-card__title'>{title}</h3>
          {description && <p className='service-card__desc'>{description}</p>}
        </div>

        <div className='service-card__footer'>
          <button
            type='button'
            className='service-card__details'
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onDetails?.();
            }}
          >
            Mais detalhes
            <ChevronRightIcon className='service-card__chevron' />
          </button>
        </div>
      </label>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' width={20} height={20} {...props}>
      <path
        fill='currentColor'
        d='M9 16.2L4.8 12l1.4-1.4 2.8 2.8 8-8 1.4 1.4z'
      />
    </svg>
  );
}

export default ServiceCardComponent;
