import express from 'express';
const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const Groq = (await import('groq-sdk')).default;

    if (!process.env.GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return res.status(500).json({ error: "Missing API key" });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama3-70b-8192', // ✅ use correct model
    });

    const reply = completion.choices[0]?.message?.content || '';
    console.log("Groq reply:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("Groq Error:", error); // print full error
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default router;
