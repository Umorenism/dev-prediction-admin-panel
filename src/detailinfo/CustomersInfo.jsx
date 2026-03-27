import { useParams } from "react-router-dom";

export default function CustomerslInfo() {

  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#f4efe6] p-10">

      <div className="bg-white p-8 rounded-2xl shadow-sm max-w-xl">

        <h1 className="text-2xl font-semibold mb-4">
          customers Details
        </h1>

        <p className="text-gray-600 mb-2">
          customers ID:
          <span className="font-semibold text-black ml-2">{id}</span>
        </p>

        <p className="text-gray-600 mb-2">
          Customer: <span className="text-black ml-2">Customer Name</span>
        </p>

        <p className="text-gray-600 mb-2">
          Status: <span className="text-black ml-2">Order Status</span>
        </p>

        <p className="text-gray-600 mb-2">
          Total: <span className="text-black ml-2">Amount</span>
        </p>

      </div>

    </div>
  );
}