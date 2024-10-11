import chatbot from "@/controllers/chatbot";
import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/preguntar", (req: Request, res: Response) => {
  chatbot.preguntar(req, res);
});

export default router;