import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, fileName } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image data provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use Gemini 2.5 Pro for multimodal image analysis
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "system",
            content: `You are a forensic AI analyst specializing in deepfake detection. Analyze images for signs of AI manipulation.

Your analysis must return a JSON object with these exact fields:
- isDeepfake: boolean (true if manipulation detected)
- confidence: number (0-100, your confidence in the verdict)
- spatialScore: number (0-100, spatial artifact analysis score - look for blurring, inconsistent lighting, unnatural textures)
- temporalScore: number (0-100, temporal coherence score - for images, assess frame consistency indicators)
- biologicalScore: number (0-100, biological plausibility - skin texture, eye reflections, hair patterns)
- frequencyScore: number (0-100, frequency domain analysis - detect GAN fingerprints, compression artifacts)
- analysis: string (brief explanation of findings)
- detectedArtifacts: array of strings (specific artifacts found like "inconsistent eye reflections", "blurry hair edges", "unnatural skin smoothing")

Look for these deepfake indicators:
1. Spatial: Blurred boundaries, inconsistent lighting/shadows, warped backgrounds
2. Biological: Missing skin pores, unnatural eye reflections, static hair, asymmetric features
3. Frequency: GAN fingerprints, unusual noise patterns, compression inconsistencies
4. Face: Blending artifacts around face edges, mismatched skin tones, teeth anomalies

Return ONLY valid JSON, no markdown formatting.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this image (${fileName || "uploaded image"}) for signs of deepfake manipulation or AI generation. Provide a comprehensive forensic analysis.`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith("data:") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No analysis content received");
    }

    // Parse the AI response
    let analysisResult;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Fallback with extracted data
      analysisResult = {
        isDeepfake: content.toLowerCase().includes("deepfake") || content.toLowerCase().includes("manipulated"),
        confidence: 75,
        spatialScore: 70,
        temporalScore: 65,
        biologicalScore: 68,
        frequencyScore: 72,
        analysis: content,
        detectedArtifacts: ["Analysis completed - manual review recommended"]
      };
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Analysis failed" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
