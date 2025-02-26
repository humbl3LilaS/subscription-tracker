import { Router } from "express";
import { getUserById, updateUser } from "../controllers/users-controller.ts";
import { authorize } from "../middlewares/authorization.ts";

const usersRouter = Router();

usersRouter.get("/:id", authorize, getUserById);

usersRouter.put("/:id", authorize, updateUser);

usersRouter.delete("/:id", (req, res) => {
    res.status(200).json({
        title: "Delete User",
        id: req.params.id,
    });
});

export { usersRouter };
