import { BsStack } from "react-icons/bs";
import Modal from "./reuseable-modal";
import { CgClose } from "react-icons/cg";

const ShareStackModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose} ariaLabel={`Stack`}>
      <div className="text-center py-5 relative">
        <button className="absolute right-4 top-5" onClick={onClose}>
          <CgClose />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Share Your Stack</h2>

        <div className="flex justify-center">
          <div className="w-10 h-10  rounded-full flex justify-center items-center mb-4 text-[1rem] bg-[#E9D4FF] text-primary-500">
            <BsStack />
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          You have no stack created yet, go to Tech Stack to create one.
        </p>
      </div>
    </Modal>
  );
};

export default ShareStackModal;
