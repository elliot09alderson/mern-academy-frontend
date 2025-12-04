import { motion } from 'framer-motion';
import { Quote, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const experts = [
  {
    id: 1,
    name: "Md Mobeen",
    title: "Retired Principal, Zila School, Ranchi",
    credential: "Veteran Educator & Academic Leader",
    quote: "MERN Academy represents the future of education - combining traditional academic values with modern technological skills. Their commitment to holistic student development and practical learning approach prepares students not just for jobs, but for successful careers.",
    image: "/experts/md-mobeen.jpg",
    gradient: "from-blue-50 to-indigo-50",
    quoteColor: "text-blue-200",
    credentialColor: "text-blue-600"
  },
  {
    id: 2,
    name: "Dr. Md Imran",
    title: "Paediatric Surgeon",
    credential: "Medical Expert & Healthcare Professional",
    quote: "In today's rapidly evolving world, institutions like MERN Academy are essential. They bridge the gap between academic knowledge and industry requirements, ensuring students are equipped with both technical expertise and professional skills needed for success.",
    image: "/experts/dr-md-imran.jpg",
    gradient: "from-green-50 to-teal-50",
    quoteColor: "text-green-200",
    credentialColor: "text-green-600"
  }
];

export const ExpertsSaySection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <Badge className="glass-card-modern px-6 py-2 text-base font-semibold border border-violet-500/20">
              <Award className="w-4 h-4 mr-2" />
              Expert Opinions
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            What{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Experts Say
              </span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Industry leaders and education experts share their thoughts about MERN Academy
          </p>
        </motion.div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`glass-card bg-gradient-to-br ${expert.gradient} rounded-2xl p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
            >
              {/* Decorative Quote Icon */}
              <div className={`absolute top-4 right-4 ${expert.quoteColor} group-hover:scale-110 transition-transform duration-300`}>
                <Quote className="w-16 h-16" />
              </div>

              <div className="relative z-10">
                {/* Quote */}
                <p className="text-foreground/80 text-lg leading-relaxed mb-8 italic">
                  "{expert.quote}"
                </p>

                {/* Expert Info */}
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=6366f1&color=fff&size=128`;
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-foreground text-lg">{expert.name}</h4>
                    <p className="text-sm text-muted-foreground">{expert.title}</p>
                    <p className={`text-xs ${expert.credentialColor} font-medium`}>{expert.credential}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
