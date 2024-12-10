import css from './IsRefreshingComponent.module.css';
import { MutatingDots } from 'react-loader-spinner';

export const IsRefreshingComponent = () => {
  return (
    <div className={css.div}>
      <h2>Please wait</h2>

      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#1F1F1F"
        secondaryColor="#1F1F1F"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
