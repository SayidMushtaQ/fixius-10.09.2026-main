import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { MdClose } from "react-icons/md"; // Import the close icon
import Modal from "@/components/ui/Modal";

// Component for unsubscribe success message
const UnsubscribeSuccess = () => {
  const { userData } = useAuth();

  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-red-600 mb-6">
          Erfolgreich storniert!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Sie haben sich erfolgreich von den Job-Benachrichtigungen abgemeldet.
          Sie werden keine weiteren Aktualisierungen erhalten.
        </p>
        {userData?.length > 0 && (
          <div className="flex justify-center">
            <Link
              href="/dashboard/handwerker/auftragsalarm"
              className="globalbtn"
            >
              Zum Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Define the types for the props
interface UnsubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const customStyles: any = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: "opacity 0.3s ease-in-out",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "8px",
    padding: "0",
    maxWidth: "400px",
    width: "100%",
    transition: "opacity 0.3s ease-in-out",
  },
};

// Modal component for unsubscribe confirmation
const UnsubscribeModal: React.FC<UnsubscribeModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Erfolgreich abgemeldet"
    >
      <div className="relative">
        <div className="flex justify-end px-4 py-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className="px-8 py-6">
          <UnsubscribeSuccess />
        </div>
      </div>
    </Modal>
  );
};

export default UnsubscribeModal;
