export default function TrackOrder() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Track Your Order</h1>
        
        <div className="space-y-8">
          <section className="bg-blue-50 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Track Your Order</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Log in to your FundiMart account</li>
              <li>Go to "My Orders" section</li>
              <li>Find the order you want to track</li>
              <li>Click "Track Order" to see real-time updates</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Status Explained</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Processing</h3>
                <p className="text-gray-700">Your order is being prepared for shipment</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Shipped</h3>
                <p className="text-gray-700">Your order is on its way to you</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Out for Delivery</h3>
                <p className="text-gray-700">Your order is with the delivery partner and will arrive today</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Delivered</h3>
                <p className="text-gray-700">Your order has been successfully delivered</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Number</h2>
            <div className="bg-gray-50 p-6 rounded">
              <p className="text-gray-700 mb-4">
                You can also track your order using your tracking number provided in your shipping confirmation email. Enter it below:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter tracking number"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Track
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              If you can't find your tracking information or have questions about your delivery:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Check your email for shipping confirmation</li>
              <li>Contact our support team</li>
              <li>Visit our Help Center</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
