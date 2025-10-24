import { Router, Request, Response } from "express";

const router = Router();

// GET /users
router.get("/", (req: Request, res: Response) => {
  res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

// GET /users/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, name: "Alice" });
});

export default router;
