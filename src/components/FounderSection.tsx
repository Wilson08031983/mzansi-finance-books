
const FounderSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Meet Our CEO & Founder
              </h2>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                Wilson Mokgethwa Moabelo
              </h3>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed animate-fade-in delay-300">
              <p className="animate-fade-in delay-500">
                "I was a businessman who tried almost every business you can think of, and in all my trials and errors, running at a loss, I realized that there might be other South Africans suffering the same fate as me on a daily basis."
              </p>
              <p className="animate-fade-in delay-700">
                "Filling tender documents, hitting dead ends, losing money on stationery without getting anything in return. I had to come up with an idea to assist me and others to have an automated business website that will save time and cost of filling endless RFQs and running without funding and zero assistance."
              </p>
              <p className="font-semibold bg-gradient-to-r from-purple-700 via-blue-700 to-orange-600 bg-clip-text text-transparent animate-fade-in delay-1000">
                "This was the birth of MOKMzansiBooks est. 2024 - to help South Africans grow, one page at a time."
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-600 bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in delay-1200">
              <p><strong>Company:</strong> Morwa Moabelo (Pty) Ltd</p>
              <p><strong>Reg No:</strong> 2018/421571/07</p>
              <p><strong>Established:</strong> 2018, Pretoria Atteridgeville</p>
              <p><strong>Email:</strong> mokgethwamoabelo@gmail.com</p>
              <p><strong>Phone:</strong> +27 64 550 4029</p>
            </div>
          </div>

          <div className="relative animate-fade-in delay-300">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-pink-400 to-purple-500 rounded-xl blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-white hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <img 
                  src="/lovable-uploads/a344c447-63bc-484e-b7b6-4cbe63f7da2e.png" 
                  alt="Wilson Mokgethwa Moabelo - CEO & Founder" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
