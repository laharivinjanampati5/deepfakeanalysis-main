import { motion } from "framer-motion";
import { Link2, FileCheck, Clock, Hash, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProvenanceSection = () => {
  const provenanceRecords = [
    {
      hash: "0x7f3d...8a2b",
      timestamp: "2024-01-15 14:32:05 UTC",
      status: "Verified",
      type: "Original Capture",
    },
    {
      hash: "0x9e1c...4f7d",
      timestamp: "2024-01-15 14:32:08 UTC",
      status: "Verified",
      type: "C2PA Signed",
    },
    {
      hash: "0x2b8a...c1e5",
      timestamp: "2024-01-15 14:32:12 UTC",
      status: "Verified",
      type: "Ledger Recorded",
    },
  ];

  return (
    <section id="provenance" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary border border-primary/20 mb-6">
            <Link2 className="w-4 h-4" />
            C2PA Standard
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Blockchain <span className="text-gradient">Provenance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verify the origin and authenticity of media with cryptographic proof
            stored on an immutable ledger.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                How Provenance Works
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Capture & Sign</h4>
                    <p className="text-muted-foreground text-sm">
                      At the moment of creation, media is cryptographically signed with C2PA credentials.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Hash Generation</h4>
                    <p className="text-muted-foreground text-sm">
                      A unique cryptographic fingerprint is generated from the content.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Ledger Recording</h4>
                    <p className="text-muted-foreground text-sm">
                      The signature is permanently recorded on a distributed ledger.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Instant Verification</h4>
                    <p className="text-muted-foreground text-sm">
                      Anyone can verify authenticity by checking the ledger.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Demo Ledger */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Provenance Ledger
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-success/20 text-success">
                  Live Chain
                </span>
              </div>

              <div className="space-y-4">
                {provenanceRecords.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-muted/30 rounded-lg border border-border/50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-foreground">
                          {record.type}
                        </span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-success/20 text-success">
                        {record.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Hash className="w-3 h-3" />
                        <span className="font-mono">{record.hash}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{record.timestamp}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-primary/30 text-primary hover:bg-primary/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Chain History
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
