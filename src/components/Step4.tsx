import React from 'react';
import { motion } from 'framer-motion';
import { SISTER_NAME } from '../App';
import { Button } from '@/components/ui/button';
import { RAKHI_OPTIONS } from './Step2';
import { GIFT_OPTIONS } from './Step3';
import { RefreshCcw, Share } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

function BurstConfetti() {
  const pieces = Array.from({ length: 80 }).map((_, i) => {
    const color = ['bg-primary', 'bg-secondary', 'bg-pink-500', 'bg-purple-500', 'bg-white'][Math.floor(Math.random() * 5)];
    const size = Math.random() * 8 + 6;
    return (
      <motion.div
        key={i}
        initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
        animate={{ opacity: 0, x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 600 + 150, scale: Math.random() * 1.5 + 0.5, rotate: Math.random() * 360 }}
        transition={{ duration: 2.5 + Math.random(), ease: "easeOut" }}
        className={`absolute top-1/3 left-1/2 rounded-sm ${color} shadow-sm`}
        style={{ width: size, height: size, zIndex: 50 }}
      />
    );
  });
  return <div className="fixed inset-0 pointer-events-none overflow-hidden">{pieces}</div>;
}

export function Step4({ selectedRakhi, selectedGifts, onReset }: any) {
  const rakhi = RAKHI_OPTIONS.find(r => r.id === selectedRakhi);
  const gifts = selectedGifts.map((id: string) => GIFT_OPTIONS.find(g => g.id === id)?.name);

  const handleShare = async () => {
    const text = `Happy Raksha Bandhan! 🌸\n\nI chose the ${rakhi?.name} and picked: ${gifts.join(', ')}.\n\nThank you bhai! 💛`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied! 🎉", description: "Now paste it and send it to your bhai 💌" });
    } catch {
      toast({ title: "Couldn't copy", description: "Please share it manually.", variant: "destructive" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 relative z-10 py-10"
    >
      <BurstConfetti />

      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="text-7xl drop-shadow-xl mb-4"
      >
        🪔🍬🌸
      </motion.div>

      <div className="text-center space-y-4 px-4">
        <h1 className="font-serif text-3xl md:text-5xl text-primary font-bold leading-tight">
          Thank you for being the <br className="hidden md:block" />best sister! 💛
        </h1>
      </div>

      {/* Poem */}
      <div className="font-serif text-xl md:text-2xl text-center text-foreground leading-relaxed italic border-y-2 border-secondary/30 py-8 px-6 w-full relative">
        <p>In every thread, a story told,</p>
        <p>Of laughter shared and hands to hold.</p>
        <p>Through every season, near or far,</p>
        <p>My {SISTER_NAME} — you're my brightest star. 🌟</p>
      </div>

      {/* Gift receipt */}
      <div className="bg-card/90 backdrop-blur-md w-full p-8 rounded-2xl border-2 border-dashed border-secondary/50 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 text-9xl opacity-5">🎁</div>
        <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center tracking-wide uppercase">Your Gifts</h3>
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center border-b border-border/50 pb-3">
            <span className="text-muted-foreground font-serif italic">Your Rakhi:</span>
            <span className="font-bold text-foreground text-right">{rakhi?.name} {rakhi?.icon}</span>
          </div>
          <div className="flex justify-between items-start pt-2">
            <span className="text-muted-foreground font-serif italic whitespace-nowrap mr-4">Your Treats:</span>
            <span className="font-bold text-foreground text-right leading-tight">{gifts.join(' • ')}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
        <Button onClick={onReset} variant="outline" size="lg" className="flex-1 border-secondary/50 hover:bg-secondary/10 rounded-full h-14 text-lg" data-testid="button-start-over">
          <RefreshCcw className="w-5 h-5 mr-2" /> Start Over
        </Button>
        <Button onClick={handleShare} size="lg" className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_20px_rgba(201,168,76,0.3)] rounded-full h-14 text-lg font-bold" data-testid="button-share">
          <Share className="w-5 h-5 mr-2" /> Share the Love
        </Button>
      </div>
    </motion.div>
  );
}