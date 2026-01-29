import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Upload, Sparkles, Download, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ImmunizeSection = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleImmunize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  return (
    <section id="immunize" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-purple text-sm text-secondary border border-secondary/20 mb-6">
            <Lock className="w-4 h-4" />
            Adversarial Protection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Immunize Your <span className="text-gradient">Identity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Add invisible adversarial noise to your photos that prevents AI systems
            from using them to create deepfakes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card-purple p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/20">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">FGSM Protection</h3>
                  <p className="text-muted-foreground">
                    Fast Gradient Sign Method adds imperceptible perturbations that
                    confuse deepfake generation models while remaining invisible to humans.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Proactive Defense</h3>
                  <p className="text-muted-foreground">
                    Instead of just detecting fakes after they're made, prevent your face
                    from being synthesized in the first place.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/20">
                  <Sparkles className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Invisible to Humans</h3>
                  <p className="text-muted-foreground">
                    The adversarial noise is calibrated to be imperceptible to the human eye
                    while remaining highly effective against neural networks.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card-purple p-8">
              <div className="border-2 border-dashed border-secondary/30 rounded-xl p-8 text-center mb-6">
                <Upload className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Upload Photo to Immunize
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Your photo will be processed locally with adversarial noise
                </p>
                <Button
                  onClick={handleImmunize}
                  disabled={isProcessing || isComplete}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-purple"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                      </motion.div>
                      Processing...
                    </>
                  ) : isComplete ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Protected Image
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Select & Immunize
                    </>
                  )}
                </Button>
              </div>

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Adding adversarial noise...</span>
                    <span className="text-secondary font-mono">Processing</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-success/10 border border-success/20 rounded-lg"
                >
                  <p className="text-sm text-success flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Photo successfully immunized against deepfake generation
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
