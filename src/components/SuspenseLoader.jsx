import { Oval } from "react-loader-spinner";

import "./SuspenseLoader.scss";

const SuspenseLoader = () => {
  return (
    <div className="suspense_loader_container">
      <Oval 
        height={80}
        width={80}
        color="#ffffff"
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#ffffff"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  )
}

export default SuspenseLoader