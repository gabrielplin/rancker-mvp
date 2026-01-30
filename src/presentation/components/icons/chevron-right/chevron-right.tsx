import { SVGProps } from 'react';

function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='#979797'
        d='M13.033 11.983 8.199 7.15l1.183-1.183 6.017 6.016L9.382 18 8.2 16.817z'
      ></path>
    </svg>
  );
}

export default ChevronRight;
