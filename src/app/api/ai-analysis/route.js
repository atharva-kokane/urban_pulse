import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a Smart City AI. Respond ONLY in valid JSON. No extra text.",
        },
        {
          role: "user",
          content: `
Traffic: ${body.traffic}%
Waste: ${body.waste}%
AQI: ${body.aqi}%

Return:
{
  "risk_level": "",
  "explanation": "",
  "recommended_action": ""
}
`,
        },
      ],
      temperature: 0.3,
    });

    const raw = completion.choices[0].message.content;
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch[0]);

    return Response.json(parsed);

  } catch (error) {
    console.log("FULL ERROR:", error);
    return Response.json({
      risk_level: "ERROR",
      explanation: "Groq connection failed.",
      recommended_action: "Check API configuration.",
    });
  }
}