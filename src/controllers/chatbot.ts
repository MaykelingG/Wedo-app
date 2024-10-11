import { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.OPENIA_KEY;

const openai = new OpenAI({
  apiKey: key,
});

class Chatbot {
  async preguntar(req: Request, res: Response) {
    try {
      const { pregunta } = req.body as { pregunta: string };
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: pregunta,
          },
        ],
      });
  
      res.json(completion.choices[0].message); 
    } catch {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
}

export default new Chatbot();
