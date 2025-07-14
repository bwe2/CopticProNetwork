import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function analyzeResume(resumeText: string): Promise<{
  analysis: any;
  optimizedContent: string;
}> {
  try {
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer. Analyze the resume and provide detailed feedback on strengths, weaknesses, and improvements. Return your analysis in JSON format with sections for 'strengths', 'weaknesses', 'improvements', and 'score' (1-10)."
        },
        {
          role: "user",
          content: `Please analyze this resume:\n\n${resumeText}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const optimizationResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Rewrite the provided resume to be more compelling, professional, and optimized for ATS systems while maintaining accuracy."
        },
        {
          role: "user",
          content: `Please optimize this resume:\n\n${resumeText}`
        }
      ],
    });

    return {
      analysis: JSON.parse(analysisResponse.choices[0].message.content || "{}"),
      optimizedContent: optimizationResponse.choices[0].message.content || resumeText
    };
  } catch (error) {
    throw new Error("Failed to analyze resume: " + (error as Error).message);
  }
}

export async function moderateContent(content: string): Promise<{
  isAppropriate: boolean;
  reason?: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a content moderator for a professional Christian networking platform. Determine if the content is appropriate for a professional, faith-based environment. Return JSON with 'isAppropriate' boolean and 'reason' if inappropriate."
        },
        {
          role: "user",
          content: `Please moderate this content:\n\n${content}`
        }
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || '{"isAppropriate": true}');
  } catch (error) {
    throw new Error("Failed to moderate content: " + (error as Error).message);
  }
}
