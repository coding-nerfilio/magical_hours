import { DefaultResponses, Status } from "@src/responses";
import Express from "express";
import fs from "node:fs";
import path from "node:path";

const Router = Express.Router();

Router.get("/magical_hours/api/v1/languages/:language", async (req, res) => {
  const { language } = req.params;

  const languageMap = {
    es: "es.json",
  };

  if ((languageMap as any)[language] === undefined) {
    res.send(DefaultResponses.ErrorResponse(Status.DATA_NOT_FOUND));
  } else {
    try {
      const data = fs.readFileSync(
        path.resolve(
          __dirname +
            `/../../../assets/languages/${(languageMap as any)[language]}`
        )
      );
      res.send(data);
    } catch (error) {
      res.send(DefaultResponses.ErrorResponse(Status.DATA_NOT_FOUND));
    }
  }
});

const Languages = {
  Router,
};

export default Languages;
