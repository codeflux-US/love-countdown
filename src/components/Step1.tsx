import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SISTER_NAME } from '../App';
import { Button } from '@/components/ui/button';

export function Step1({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto aspect-[3/4] perspective-1000"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full cursor-pointer flex items-center justify-center relative shadow-2xl rounded-xl"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => setIsOpen(true)}
            data-testid="button-open-envelope"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-full h-[400px] bg-primary rounded-xl border-4 border-secondary/30 flex items-center justify-center overflow-hidden relative shadow-2xl"
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-primary to-primary" />
              <div className="absolute inset-2 border border-secondary/40 rounded-lg" />
              <div className="absolute inset-4 border border-secondary/20 rounded-lg border-dashed" />
              <div className="border border-secondary/50 bg-primary/80 backdrop-blur-sm w-[70%] h-[50%] rounded-lg flex items-center justify-center flex-col gap-4 relative z-10 shadow-lg">
                <span className="text-5xl">💌</span>
                <span className="font-serif text-secondary text-lg tracking-widest uppercase">Tap to Open</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full min-h-[500px] bg-card rounded-xl shadow-[0_20px_50px_rgba(139,0,0,0.2)] border border-secondary/30 p-8 flex flex-col items-center text-center justify-center relative overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-secondary/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-secondary/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-secondary/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-secondary/50 rounded-br-lg" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center gap-6 relative z-10"
            >
              <div className="text-secondary text-5xl opacity-90 drop-shadow-md">🪔</div>
              <h1 className="font-serif text-4xl text-primary font-bold leading-tight">
                Happy Raksha Bandhan,<br />
                <span className="text-secondary inline-block relative mt-3 text-5xl italic">
                  {SISTER_NAME}!
                  <motion.span
                    className="absolute -inset-2 bg-secondary/10 blur-xl z-[-1] rounded-full"
                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                </span>
              </h1>
              <p className="text-muted-foreground text-lg italic mt-2 px-4 border-t border-secondary/20 pt-6">
                "Your bhai has something special for you..."
              </p>
              <Button
                onClick={onNext}
                size="lg"
                className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg font-serif px-10 py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.4)] border-2 border-secondary transition-all hover:scale-105"
                data-testid="button-open-gift"
              >
                Open Gift ✨
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}