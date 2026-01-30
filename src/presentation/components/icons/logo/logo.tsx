import { SVGProps } from 'react';

function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='49'
      height='49'
      fill='none'
      viewBox='0 0 49 49'
      {...props}
    >
      <path
        fill='#FAFAFA'
        d='M40.749 4.419 4.42 40.747l3.835 3.834L44.583 8.253z'
      ></path>
      <path
        fill='#7100FF'
        d='M32.971 48.5h-5.423V27.548H48.5v5.421H32.971z'
      ></path>
      <path fill='#DAE200' d='M21.452 21.45H.5v-5.421h15.53V.5h5.422z'></path>
    </svg>
  );
}

export default Logo;
