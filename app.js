import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const openai = new OpenAI({
    apiKey: (process.env["OPENAI_API_KEY"]), // defaults to process.env["OPENAI_API_KEY"]
  });

app.post('/generate-superhero', async (req, res) => {
    console.log (req.body.firstLetter)
    try {
        const firstLetter = req.body.firstLetter;
       
          const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Craft a superhero profile beginning with '${firstLetter}', detailing abilities, origin, and drive, in 100 characters.` }],
            model: 'gpt-3.5-turbo',
          });
          console.log(chatCompletion.choices[0].message.content)
          res.json(chatCompletion.choices[0].message.content);
        //   return chatCompletion.choices[0].message.content;
        
    }catch {
        console.log ("error broke")
    }

    });
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

