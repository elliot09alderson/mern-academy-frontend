import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Code2, Brain, Users, Award, ArrowRight, CheckCircle, TrendingUp, Zap, Rocket, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline with Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold my-12 md:my-16 leading-[1.2]"
        >
          <span className="inline-block mb-2 text-foreground">Transform Into a</span>
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
            <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tech Leader
            </span>
          </span>
          <br />
          <span className="text-foreground">with </span>
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
            <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI & MERN
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Master <span className="text-violet-600 dark:text-violet-400 font-bold">MERN Stack</span>,
          <span className="text-blue-600 dark:text-blue-400 font-bold"> AI Tools</span>,
          <span className="text-purple-600 dark:text-purple-400 font-bold"> System Design</span> &
          <span className="text-emerald-600 dark:text-emerald-400 font-bold"> DSA</span> in our intensive 6-month program.
          <br className="hidden md:block" />
          <span className="inline-block mt-2 text-foreground/90 font-medium">Join 16+ successfully placed students at top tech companies.</span>
        </motion.p>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {[
            { icon: CheckCircle, text: "100% Placement Support", iconColor: "text-emerald-500" },
            { icon: Award, text: "Industry-Ready Curriculum", iconColor: "text-violet-500" },
            { icon: Users, text: "Expert Mentorship", iconColor: "text-blue-500" }
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 glass-card px-6 py-3 rounded-full hover:scale-105 transition-all duration-300">
              <benefit.icon className={`h-5 w-5 ${benefit.iconColor}`} />
              <span className="text-sm font-semibold">{benefit.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-5xl mx-auto"
        >
          {[
            { number: "16+", label: "Successful Placements", icon: Award, gradient: "from-emerald-500 to-teal-500" },
            { number: "25+", label: "Partner Companies", icon: Users, gradient: "from-violet-500 to-purple-500" },
            { number: "6", label: "Months Program", icon: Code2, gradient: "from-blue-500 to-cyan-500" },
            { number: "12 LPA", label: "Average Package", icon: TrendingUp, gradient: "from-purple-500 to-pink-500" }
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex justify-center mb-3">
                <stat.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>{stat.number}</div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16"
        >
          <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 md:px-10 py-4 md:py-6 text-base md:text-lg rounded-xl shadow-lg hover:scale-105 transition-all duration-300 group border-0 font-semibold">
            <Award className="mr-2 md:mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Start Your Journey
            <ArrowRight className="ml-2 md:ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-6 text-base md:text-lg rounded-xl border-2 hover:scale-105 transition-all duration-300 font-semibold">
            Download Curriculum
          </Button>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-base md:text-lg text-muted-foreground mb-8 font-semibold">
            Master Future-Ready Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {[
              { name: 'React', gradient: 'from-cyan-500 to-blue-500' },
              { name: 'Node.js', gradient: 'from-green-500 to-emerald-500' },
              { name: 'MongoDB', gradient: 'from-green-600 to-teal-600' },
              { name: 'Express', gradient: 'from-gray-600 to-slate-500' },
              { name: 'AI Tools', gradient: 'from-purple-500 to-pink-500' },
              { name: 'System Design', gradient: 'from-orange-500 to-red-500' },
              { name: 'DSA', gradient: 'from-indigo-500 to-purple-500' },
              { name: 'TypeScript', gradient: 'from-blue-600 to-cyan-500' }
            ].map((tech) => (
              <div
                key={tech.name}
                className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold hover:scale-110 transition-all duration-300 bg-gradient-to-r ${tech.gradient} text-white shadow-lg hover:shadow-xl cursor-pointer`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};