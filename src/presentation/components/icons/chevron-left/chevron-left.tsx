import { SVGProps } from 'react';

function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='13'
      height='21'
      viewBox='0 0 13 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M4.27857 10.4718L12.334 2.41642L10.3619 0.444336L0.333984 10.4718L10.3619 20.4998L12.334 18.5277L4.27857 10.4718Z'
        fill='#FAFAFA'
      />
    </svg>
  );
}

export default ChevronLeft;
