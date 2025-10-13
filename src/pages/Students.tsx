import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Code2, Award } from 'lucide-react';

export const Students = () => {
  const topStudents = [
    {
      id: 1,
      name: "Rahul Sharma",
      image: "/api/placeholder/300/300",
      college: "IIT Delhi",
      company: "Google",
      role: "Software Engineer",
      skills: ["React", "Node.js", "Python", "System Design"],
      achievement: "All India Rank 1 in Placement"
    },
    {
      id: 2,
      name: "Priya Patel",
      image: "/api/placeholder/300/300",
      college: "NIT Surat",
      company: "Microsoft",
      role: "Full Stack Developer",
      skills: ["JavaScript", "Azure", "MongoDB", "DSA"],
      achievement: "Youngest Developer at Microsoft"
    },
    {
      id: 3,
      name: "Arjun Kumar",
      image: "/api/placeholder/300/300",
      college: "BITS Pilani",
      company: "Amazon",
      role: "SDE-2",
      skills: ["Java", "Spring Boot", "AWS", "Microservices"],
      achievement: "Direct SDE-2 Placement"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      image: "/api/placeholder/300/300",
      college: "VIT Vellore",
      company: "Flipkart",
      role: "Frontend Developer",
      skills: ["React", "TypeScript", "Redux", "GraphQL"],
      achievement: "Best Project Award"
    },
    {
      id: 5,
      name: "Karan Singh",
      image: "/api/placeholder/300/300",
      college: "DTU Delhi",
      company: "Paytm",
      role: "Backend Developer",
      skills: ["Node.js", "PostgreSQL", "Docker", "Kubernetes"],
      achievement: "Fastest Learner Award"
    },
    {
      id: 6,
      name: "Ananya Gupta",
      image: "/api/placeholder/300/300",
      college: "Manipal University",
      company: "Swiggy",
      role: "Product Engineer",
      skills: ["React Native", "Flutter", "Firebase", "ML"],
      achievement: "Innovation Excellence Award"
    },
    {
      id: 7,
      name: "Vikash Yadav",
      image: "/api/placeholder/300/300",
      college: "Jadavpur University",
      company: "Zomato",
      role: "DevOps Engineer",
      skills: ["Docker", "Jenkins", "AWS", "Terraform"],
      achievement: "Best DevOps Implementation"
    },
    {
      id: 8,
      name: "Ritu Sharma",
      image: "/api/placeholder/300/300",
      college: "PEC Chandigarh",
      company: "Ola",
      role: "Mobile Developer",
      skills: ["React Native", "Kotlin", "Swift", "Redux"],
      achievement: "Cross-platform Expert"
    },
    {
      id: 9,
      name: "Amit Verma",
      image: "/api/placeholder/300/300",
      college: "NSIT Delhi",
      company: "Urban Company",
      role: "Full Stack Engineer",
      skills: ["MERN", "Redis", "Elasticsearch", "Kafka"],
      achievement: "Scalability Champion"
    },
    {
      id: 10,
      name: "Divya Joshi",
      image: "/api/placeholder/300/300",
      college: "IIIT Hyderabad",
      company: "Razorpay",
      role: "Software Engineer",
      skills: ["Python", "Django", "PostgreSQL", "Redis"],
      achievement: "Fintech Innovation Award"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Outstanding{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
                <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Students
                </span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Meet our top 10 performers who have excelled in their careers. 
              These are the success stories that inspire our teaching methodology.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">16+</div>
                <div className="text-muted-foreground">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">25+</div>
                <div className="text-muted-foreground">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">100%</div>
                <div className="text-muted-foreground">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">12 LPA</div>
                <div className="text-muted-foreground">Avg Package</div>
              </div>
            </div>
          </div>
        </section>

        {/* Students Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topStudents.map((student, index) => (
                <Card key={student.id} className="glass-card border-0 hover-lift">
                  <CardContent className="p-0">
                    {/* Rank Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="gradient-primary text-white text-lg px-3 py-1">
                        #{index + 1}
                      </Badge>
                    </div>
                    
                    {/* Student Image */}
                    <div className="relative">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent rounded-t-lg" />
                      
                      {/* Achievement Badge */}
                      <div className="absolute bottom-4 right-4">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Student Info */}
                      <h3 className="text-xl font-bold mb-2">{student.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{student.college}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{student.role} at {student.company}</span>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Code2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Skills</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {student.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievement */}
                      <div className="p-3 glass-card rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">Achievement</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{student.achievement}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our <span className="gradient-text">Success Stories?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your journey with MERN Academy and become the next success story. 
              Get placed in top companies with our industry-focused curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-smooth">
                Enroll Now - 10% Diwali Discount
              </button>
              <button className="px-8 py-3 glass-card rounded-lg font-medium hover:bg-primary/10 transition-smooth">
                Download Brochure
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Students;