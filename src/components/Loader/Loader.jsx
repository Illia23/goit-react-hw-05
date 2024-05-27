import { RotatingLines } from 'react-loader-spinner';
import loader from './Loader.module.css';

const Loader = () => {
  return (
    <div className={loader.container}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;