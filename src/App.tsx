import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { Sparkles } from './components/Sparkles';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { Step4 } from './components/Step4';

// Change this to customize the name globally
export const SISTER_NAME = "Gayatri";

const queryClient = new QueryClient();

function AppContent() {
  const [step, setStep] = useState(1);
  const [selectedRakhi, setSelectedRakhi] = useState<string | null>(null);
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);

  return (
    <div className="min-h-[100dvh] w-full bg-background font-sans overflow-hidden relative selection:bg-primary/20 text-foreground">
      <Sparkles />

      {/* Progress bar for steps 2-3 */}
      {step > 1 && step < 4 && (
        <div className="absolute top-0 left-0 w-full h-1.5 bg-muted z-50 overflow-hidden shadow-sm">
          <motion.div
            className="h-full bg-secondary rounded-r-full"
            initial={{ width: `${((step - 1) / 3) * 100}%` }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
      )}

      <div className="relative z-10 w-full min-h-[100dvh] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 1 && <Step1 key="1" onNext={() => setStep(2)} />}
          {step === 2 && <Step2 key="2" onNext={() => setStep(3)} selectedRakhi={selectedRakhi} onSelect={setSelectedRakhi} />}
          {step === 3 && <Step3 key="3" onNext={() => setStep(4)} selectedGifts={selectedGifts} onSelect={setSelectedGifts} />}
          {step === 4 && <Step4 key="4" selectedRakhi={selectedRakhi} selectedGifts={selectedGifts} onReset={() => { setStep(1); setSelectedRakhi(null); setSelectedGifts([]); }} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Switch>
            <Route path="/" component={AppContent} />
            <Route component={AppContent} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;