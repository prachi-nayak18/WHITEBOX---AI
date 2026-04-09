const fetch = require('node-fetch');

exports.chat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const systemPrompt = 'You are Whitebox AI. Answer naturally and helpfully.';

  // --- STEP 1: Groq (Updated Model) ---
  try {
    console.log("🚀 Trying Groq (Llama 3.1)...");
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", //  Updated Model Name
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: message }]
      })
    });

    const groqData = await groqRes.json();

    if (groqRes.ok) {
      console.log("Groq Success!");
      return res.json({ reply: groqData.choices[0].message.content });
    } else {
      console.log(" Groq API Error:", groqData.error?.message);
      throw new Error("Groq failed");
    }

  } catch (err) {
    // --- 🔄 STEP 2: Gemini Backup (Fixed URL) ---
    console.log("🔄 Switching to Gemini Backup...");

    //  URL corrected (models/ se pehle v1beta hona chahiye, aur model name theek hai)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    try {
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: `${systemPrompt}\nUser: ${message}` }] 
          }]
        })
      });

      const geminiData = await geminiRes.json();

      if (geminiRes.ok) {
        console.log(" Gemini Success!");
        const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
        return res.json({ reply });
      } else {
        console.log(" Gemini API Error:", geminiData.error?.message);
        return res.status(500).json({ error: "Both APIs failed" });
      }
    } catch (e) {
      return res.status(500).json({ error: "Server Error" });
    }
  }
};