export default function ComplaintForm() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Log Customer Complaint
          </h2>

          <p className="text-gray-500 text-sm">
            API & FDF Quality Assurance Module
          </p>
        </div>

        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          Pending Triage
        </span>

      </div>

      <div className="space-y-6">

        {/* Section 1 */}

        <div>

          <h3 className="font-semibold mb-4">
            1. Origin & Customer Details
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label>Complaint Source</label>

              <input
                type="text"
                placeholder="Awaiting AI extraction..."
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label>Customer Name</label>

              <input
                type="text"
                placeholder="Awaiting AI extraction..."
                className="w-full border rounded-lg p-2"
              />
            </div>

          </div>

        </div>

        {/* Section 2 */}

        <div>

          <h3 className="font-semibold mb-4">
            2. Product & Batch Identification
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <input
              placeholder="Product Name"
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Product Strength / Grade"
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Batch Number"
              className="border rounded-lg p-2"
            />

            <input
              type="date"
              className="border rounded-lg p-2"
            />

            <input
              type="date"
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Quantity Affected"
              className="border rounded-lg p-2"
            />

          </div>

        </div>

      </div>

    </div>
  );
}