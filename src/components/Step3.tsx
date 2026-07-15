import React from 'react';
import { motion } from 'framer-motion';
import { SISTER_NAME } from '../App';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const GIFT_OPTIONS = [
  { id: 'cash',     name: 'Cash Shagun (₹500)', desc: 'Because choices are the best gift',  icon: '💰' },
  { id: 'clothes',  name: 'Trendy Clothes',      desc: 'Shop your style, wear your joy',     icon: '👗' },
  { id: 'surprise', name: 'Surprise Gift',        desc: 'A secret wrapped with love',         icon: '🎁' },
];

export function Step3({ onNext, selectedGifts, onSelect }: any) {
  const toggleGift = (id: string) => {
    if (selectedGifts.includes(id)) {
      onSelect(selectedGifts.filter((g: string) => g !== id));
    } else {
      onSelect([...selectedGifts, id]);
    }
  };

  const handleNext = () => {
    if (selectedGifts.length === 0) {
      toast({ title: "Wait a second! 🥺", description: "Pick at least one gift, you deserve it!", variant: "destructive" });
      return;
    }
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center gap-10 relative z-10"
    >
      <div className="text-center space-y-3">
        <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">
          Pick Your Gifts, {SISTER_NAME} 🎁
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl italic font-serif">
          Choose as many as your heart desires!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
        {GIFT_OPTIONS.map((gift) => {
          const isSelected = selectedGifts.includes(gift.id);
          return (
            <motion.div
              key={gift.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGift(gift.id)}
              data-testid={`card-gift-${gift.id}`}
              className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 border-2 flex flex-col items-center text-center gap-6 ${
                isSelected
                  ? 'border-secondary bg-secondary/5 shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                  : 'border-border/40 bg-card/80 hover:border-secondary/50 backdrop-blur-sm'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-secondary text-secondary-foreground rounded-full p-1.5 shadow-lg"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
              <span className="text-6xl drop-shadow-lg">{gift.icon}</span>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">{gift.name}</h3>
                <p className="text-muted-foreground text-sm mt-2">{gift.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button
        onClick={handleNext}
        size="lg"
        className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-serif px-12 py-6 rounded-full transition-all w-full md:w-auto shadow-xl"
        data-testid="button-next"
      >
        Finish & View Note 💌
      </Button>
    </motion.div>
  );
}