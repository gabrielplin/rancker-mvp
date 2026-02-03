import { DividerProps } from '../../types';
import './divider.styles.scss';

function DividerComponent({ children }: DividerProps) {
  return (
    <div
      className={['divider-container', 'divider-horizontal'].join(' ')}
      role='separator'
    >
      <div />

      {children && (
        <>
          <p className='divider-text'>{children}</p>
          <div />
        </>
      )}
    </div>
  );
}

export default DividerComponent;
