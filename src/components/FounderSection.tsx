
const FounderSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Meet Our CEO & Founder
              </h2>
              <h3 className="text-2xl font-semibold text-mokm-purple-700">
                Wilson Mokgethwa Moabelo
              </h3>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                "I was a businessman who tried almost every business you can think of, and in all my trials and errors, running at a loss, I realized that there might be other South Africans suffering the same fate as me on a daily basis."
              </p>
              <p>
                "Filling tender documents, hitting dead ends, losing money on stationery without getting anything in return. I had to come up with an idea to assist me and others to have an automated business website that will save time and cost of filling endless RFQs and running without funding and zero assistance."
              </p>
              <p className="font-semibold text-mokm-blue-700">
                "This was the birth of MOKMzansiBooks est. 2024 - to help South Africans grow, one page at a time."
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Company:</strong> Morwa Moabelo (Pty) Ltd</p>
              <p><strong>Reg No:</strong> 2018/421571/07</p>
              <p><strong>Established:</strong> 2018, Pretoria Atteridgeville</p>
              <p><strong>Email:</strong> mokgethwamoabelo@gmail.com</p>
              <p><strong>Phone:</strong> +27 64 550 4029</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-mokm-purple-200 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <div className="w-full h-96 rounded-xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/a344c447-63bc-484e-b7b6-4cbe63f7da2e.png" 
                    alt="Wilson Mokgethwa Moabelo - CEO & Founder" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
