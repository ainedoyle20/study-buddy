import { Oval } from "react-loader-spinner";

import "./Loader.scss";

const Loader = () => {
  return (
    <div className='oval_spinner_container'> 
      <Oval  
        height={80} 
        width={80} 
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
