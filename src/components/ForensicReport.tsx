import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Brain, 
  Activity, 
  Fingerprint,
  Waves,
  Download,
  Shield,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface ForensicReportProps {
  result: {
    isDeepfake: boolean;
    confidence: number;
    spatialScore: number;
    temporalScore: number;
    biologicalScore: number;
    frequencyScore: number;
  };
}

// Mock data for charts
const pulseData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  pulse: Math.sin(i * 0.3) * 20 + 60 + Math.random() * 10,
  normal: Math.sin(i * 0.3) * 20 + 60,
}));

const frequencyData = Array.from({ length: 30 }, (_, i) => ({
  freq: `${i * 100}Hz`,
  amplitude: Math.random() * 50 + (i > 15 && i < 20 ? 80 : 20),
  baseline: 30,
}));

export const ForensicReport = ({ result }: ForensicReportProps) => {
  const radarData = [
    { subject: "Spatial", A: result.spatialScore, fullMark: 100 },
    { subject: "Temporal", A: result.temporalScore, fullMark: 100 },
    { subject: "Biological", A: result.biologicalScore, fullMark: 100 },
    { subject: "Frequency", A: result.frequencyScore, fullMark: 100 },
    { subject: "Artifacts", A: Math.random() * 30 + 60, fullMark: 100 },
    { subject: "Consistency", A: Math.random() * 30 + 50, fullMark: 100 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto space-y-6"
    >
      {/* Verdict Banner */}
      <motion.div
        variants={itemVariants}
        className={`glass-card p-6 ${result.isDeepfake ? "border-destructive/30" : "border-success/30"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${result.isDeepfake ? "bg-destructive/20" : "bg-success/20"}`}>
              {result.isDeepfake ? (
                <AlertTriangle className="w-10 h-10 text-destructive" />
              ) : (
                <CheckCircle2 className="w-10 h-10 text-success" />
              )}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${result.isDeepfake ? "text-destructive" : "text-success"}`}>
                {result.isDeepfake ? "DEEPFAKE DETECTED" : "AUTHENTIC MEDIA"}
              </h2>
              <p className="text-muted-foreground">
                Confidence: <span className="text-foreground font-semibold">{result.confidence}%</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/30 text-primary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-primary text-primary-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Get Certificate
            </Button>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Detection Confidence</span>
            <span className="font-mono text-primary">{result.confidence}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                result.isDeepfake 
                  ? "bg-gradient-to-r from-destructive to-warning" 
                  : "bg-gradient-to-r from-primary to-success"
              }`}
            />
          </div>
        </div>
      </motion.div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Multi-Modal Analysis</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220 15% 20%)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "hsl(220 10% 55%)", fontSize: 10 }}
              />
              <Radar
                name="Analysis"
                dataKey="A"
                stroke="#00f2ff"
                fill="#00f2ff"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Biological Pulse Detection */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Biological Pulse Detection</h3>
            <span className={`ml-auto text-sm px-3 py-1 rounded-full ${
              result.biologicalScore > 70 
                ? "bg-success/20 text-success" 
                : "bg-destructive/20 text-destructive"
            }`}>
              {result.biologicalScore > 70 ? "Normal" : "Anomaly Detected"}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pulseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 15%)" />
              <XAxis dataKey="time" hide />
              <YAxis domain={[30, 100]} tick={{ fill: "hsl(220 10% 55%)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220 20% 8%)",
                  border: "1px solid hsl(186 100% 50% / 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="pulse"
                stroke="#00f2ff"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="normal"
                stroke="#7000ff"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-2">
            PPG signal analysis comparing detected vs expected blood flow patterns
          </p>
        </motion.div>

        {/* Frequency Domain Analysis */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Waves className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold text-foreground">Frequency Domain Probe</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 15%)" />
              <XAxis dataKey="freq" tick={{ fill: "hsl(220 10% 55%)", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(220 10% 55%)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220 20% 8%)",
                  border: "1px solid hsl(268 100% 50% / 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="amplitude"
                stroke="#7000ff"
                fill="url(#colorAmplitude)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorAmplitude" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7000ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7000ff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-2">
            FFT analysis revealing digital noise spikes characteristic of AI generation
          </p>
        </motion.div>

        {/* Heatmap Preview */}
        <motion.div variants={itemVariants} className="glass-card-purple p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold text-foreground">Grad-CAM Heatmap</h3>
          </div>
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {/* Simulated heatmap overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-destructive/30 to-warning/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Fingerprint className="w-16 h-16 text-destructive/60 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Highlighted regions indicate potential manipulation
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Suspicious</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Manipulated</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Score breakdown */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Analysis Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Spatial Analysis", score: result.spatialScore, icon: Brain, color: "primary" },
            { label: "Temporal Coherence", score: result.temporalScore, icon: Activity, color: "secondary" },
            { label: "Biological Signals", score: result.biologicalScore, icon: Fingerprint, color: "success" },
            { label: "Frequency Domain", score: result.frequencyScore, icon: Waves, color: "warning" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className={`w-8 h-8 mx-auto mb-3 text-${item.color}`} />
              <div className="text-2xl font-bold text-foreground mb-1">{item.score}%</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full bg-${item.color}`}
                  style={{
                    backgroundColor: index === 0 ? "#00f2ff" : 
                                    index === 1 ? "#7000ff" : 
                                    index === 2 ? "#00d9a0" : "#ffc107"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
