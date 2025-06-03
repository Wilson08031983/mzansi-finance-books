
const FounderSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Meet Our CEO & Founder
              </h2>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
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
              <p className="font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
                "This was the birth of MOKMzansiBooks est. 2024 - to help South Africans grow, one page at a time."
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-purple-200 shadow-lg">
              <p><strong>Company:</strong> Morwa Moabelo (Pty) Ltd</p>
              <p><strong>Reg No:</strong> 2018/421571/07</p>
              <p><strong>Established:</strong> 2018, Pretoria Atteridgeville</p>
              <p><strong>Email:</strong> mokgethwamoabelo@gmail.com</p>
              <p><strong>Phone:</strong> +27 64 550 4029</p>
            </div>
          </div>

          <div className="relative animate-fade-in delay-300">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-white">
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
    </section>
  );
};

export default FounderSection;
