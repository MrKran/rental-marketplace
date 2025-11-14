import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Users, Package, GraduationCap, Star } from "lucide-react";

interface StatProps {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  suffix?: string;
  delay?: number;
}

function AnimatedCounter({ value, delay = 0, suffix = "" }: { value: number; delay?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatCard({ value, label, icon: Icon, suffix = "", delay = 0 }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          <AnimatedCounter value={value} delay={delay} suffix={suffix} />
        </div>
        <div className="text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const stats: StatProps[] = [
    {
      value: 1500,
      label: "Активных пользователей",
      icon: Users,
      suffix: "+",
      delay: 0,
    },
    {
      value: 450,
      label: "Товаров для аренды",
      icon: Package,
      suffix: "+",
      delay: 0.1,
    },
    {
      value: 280,
      label: "Образовательных услуг",
      icon: GraduationCap,
      suffix: "+",
      delay: 0.2,
    },
    {
      value: 4.9,
      label: "Средний рейтинг",
      icon: Star,
      suffix: "",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4">Наши достижения</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Alash объединяет студентов и преподавателей школ Binom
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
