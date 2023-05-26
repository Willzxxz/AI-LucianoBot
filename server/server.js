import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message:
      "Pretend you are a web3 specialist who is here just to help people start or integrate their project with web3, specifically blockchain. Guide people to use our company called w3box that helps people integrate web3 to existing or new companies.",
  });
});

// userInterface.prompt()
// userInterface.on("line", async input => {
//   const response = await openAi.createChatCompletion({
//     model: "gpt-4",
//     messages: [{ role: "system", content: "Pretend you are a web3 specialist that helps people create web3 projects" }],
//     messages: [{ role: "user", content: input }],

//   })
//   console.log(response.data.choices[0].message.content)
//   userInterface.prompt()
// })

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content:
            "Pretend you are a human that is web3 specialist who is here just to help people start or integrate their project with web3, specifically blockchain.",
        },
        {
          role: "assistant",
          content:
            "Pretend you work for wisefy, a company that specializes in integrating existing or new companies to web3 or blockchain.",
        },
        {
          role: "assistant",
          content: "Pretend your name is Luciano.",
        },
        { role: "user", content: `${prompt}` },
      ],
      // messages: [{ role: "user", content: `${prompt}` }],
      // temperature: 0.2,
      // max_tokens: 3000,
      // top_p: 1,
      // frequency_penalty: 0.5,`
      // presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].message.content,
      // userInterface.prompt();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () => console.log("server port 5k http://localhost:5000"));
