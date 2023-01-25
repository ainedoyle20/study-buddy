import { ImCancelCircle } from "react-icons/im";

import "./CreateModal.scss";

const CreateModal = ({ setShowCreateModal }) => {
  return (
    <div className='create_modal_container'>
      Create Deck Modal
      <span onClick={() => setShowCreateModal(false)}>
        <ImCancelCircle />
      </span>
    </div>
  );
}

export default CreateModal;
