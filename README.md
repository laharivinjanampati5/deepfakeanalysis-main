# Vivitsu - Deepfake Analysis & Defense System

Vivitsu is a comprehensive forensic analysis and defense platform designed to combat deepfakes. It combines multi-modal AI detection, adversarial immunization, and blockchain-based provenance to ensure digital media authenticity.

![Vivitsu Hero](public/og-image.png)

## 🚀 Key Features

### 1. Forensic Detection Lab
*   **Multi-Modal Analysis**: Utilizes an ensemble of AI models to inspect media:
    *   **Spatial**: EfficientNet analyzes pixel-level artifacts and inconsistencies.
    *   **Temporal**: TimeSformer examines frame-to-frame coherence in videos.
    *   **Biological**: PPG (Photoplethysmography) analysis detects subtle heartbeat signals in human faces.
    *   **Frequency**: Analyzes the Fourier transform spectrum to find generation artifacts.
*   **Explainable AI**: Provides Grad-CAM heatmaps to visualize exactly which parts of an image contributed to the deepfake classification.

### 2. Adversarial Immunization
*   **Proactive Defense**: Protects your images *before* they are shared.
*   **FGSM Protection**: Applies Fast Gradient Sign Method (FGSM) adversarial noise. This noise is invisible to the human eye but disrupts deepfake generation models (like Stable Diffusion or Midjourney) from successfully modifying your likeness.

### 3. Blockchain Provenance
*   **C2PA Standard**: Implements the Coalition for Content Provenance and Authenticity standards.
*   **Immutable Ledger**: Records the cryptographic signature of original media on a distributed ledger.
*   **Instant Verification**: Allows any third party to verify the origin and edit history of a media file.

---

## 🛠️ Tech Stack

This project is built as a generic Single Page Application (SPA).

*   **Frontend Framework**: [React](https://react.dev/) (v18)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
*   **Backend / Edge**: [Supabase](https://supabase.com/) (Edge Functions for analysis)
*   **State Management**: [TanStack Query](https://tanstack.com/query/latest)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/deepfakeanalysis.git
    cd deepfakeanalysis
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

3.  Set up Environment Variables:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser at `http://localhost:8080`.

---

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (buttons, cards, etc.)
│   ├── DetectionSection.tsx    # Main analysis logic
│   ├── ImmunizeSection.tsx     # FGSM protection logic
│   ├── ProvenanceSection.tsx   # Blockchain verification UI
│   └── HeroScene.tsx           # 3D/Visual hero elements
├── pages/              # Route pages (Index, NotFound)
├── hooks/              # Custom React hooks (use-toast, etc.)
├── lib/               # Utility functions (utils.ts)
├── App.tsx            # Main app component & routing
└── main.tsx           # Entry point
```

## 🤝 Contributing
Contributions are welcome! Please read the contributing guidelines before submitting a pull request.

## 📄 License
MIT
# deepfake_Check
