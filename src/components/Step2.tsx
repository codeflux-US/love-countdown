import React from 'react';
import { motion } from 'framer-motion';
import { SISTER_NAME } from '../App';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const RAKHI_OPTIONS = [
  { id: 'classic', name: 'Classic Thread Rakhi', desc: 'Simple, sacred, timeless', tag: 'Traditional', icon: '📿' },
  { id: 'premium', name: 'Premium Zardosi Rakhi', desc: 'Embroidered with gold threads & gems', tag: 'Luxe Pick ✨', icon: '💎' },
];

export function Step2({ onNext, selectedRakhi, onSelect }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center gap-10 relative z-10"
    >
      <div className="text-center space-y-3">
        <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">
          Choose Your Rakhi, {SISTER_NAME} 🌸
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl italic font-serif">
          Which one is tying our bond this year?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        {RAKHI_OPTIONS.map((rakhi) => {
          const isSelected = selectedRakhi === rakhi.id;
          return (
            <motion.div
              key={rakhi.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(rakhi.id)}
              data-testid={`card-rakhi-${rakhi.id}`}
              className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 border-2 flex flex-col items-center text-center gap-6 ${
                isSelected
                  ? 'border-secondary bg-secondary/5 shadow-[0_0_30px_rgba(201,168,76,0.2)]'
                  : 'border-border/40 bg-card/80 hover:border-secondary/50 backdrop-blur-sm'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-full p-2 shadow-lg"
                >
                  <Check className="w-6 h-6" />
                </motion.div>
              )}
              <span className="text-xs font-bold text-secondary uppercase tracking-[0.2em] bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20">
                {rakhi.tag}
              </span>
              <span className="text-7xl drop-shadow-xl">{rakhi.icon}</span>
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground">{rakhi.name}</h3>
                <p className="text-muted-foreground text-base mt-2 px-4">{rakhi.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button
        onClick={onNext}
        disabled={!selectedRakhi}
        size="lg"
        className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-serif px-16 py-6 rounded-full transition-all w-full md:w-auto shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-next"
      >
        Next Step →
      </Button>
    </motion.div>
  );
}