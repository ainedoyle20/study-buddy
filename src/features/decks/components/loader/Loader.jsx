import { Oval } from "react-loader-spinner";

import "./Loader.scss";

const Loader = ({ size }) => {
  return (
    <div className='oval_spinner_container'> 
      <Oval  
        height={size === "small" ? 20 : 80} 
        width={size === "small" ? 20 : 80} 
        color="#ffffff" 
        visible={true} 
        ariaLabel='oval-loading' 
        secondaryColor="#ffffff" 
        strokeWidth={5} 
        strokeWidthSecondary={4}
      />
    </div>
  );
}

export default Loader;
