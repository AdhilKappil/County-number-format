import { useNavigate } from "react-router-dom";
import { usePhoneContext } from "../context/Context";

function ViewDetails() {
  const navigate = useNavigate();
  const { phoneData } = usePhoneContext();

  return (
    <div className="flex justify-center items-center h-svh">
      <div className="shadow-md p-5 px-10 rounded-md border">
        <div className="text-xl font-semibold flex justify-center">
          View Details
        </div>
        <hr className="my-2" />
        <div className="grid gap-2">
          <p>Country : {phoneData.countryName}</p>
          <p>Mobile : {phoneData.phoneNumber}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-5 p-3 border-2 w-36"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
