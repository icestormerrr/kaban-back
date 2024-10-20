import { Request, Response, NextFunction, CookieOptions, Router } from "express";
import HttpError from "../../../../../../common/http/exceptions/HttpError";
import { IUserService } from "../../../../core/service/UserService";
import { UserWithoutPasswordDto } from "../dtos/UserWithoutPasswordDto";
import { userService } from "../../../../core/di";
import { authMiddleware } from "../../../../../../common/http/middlewares/authMiddleware";
import { Types } from "mongoose";

const cookieOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  path: "/",
};

export class UserController {
  constructor(private userService: IUserService) {}

  async getCurrentUser(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.user!.id;
      const user = await this.userService.getById(userId);
      if (!user) throw HttpError.NotFoundError("Current user is not found");
      return response.json(new UserWithoutPasswordDto(user));
    } catch (err) {
      next(err);
    }
  }

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      // TODO: rewrite to ProjectUsers collection
      const { usersIds } = request.query;

      if (typeof usersIds === "string") {
        const ids = usersIds.split(",").map((id: string) => new Types.ObjectId(id.trim()));
        const users = await this.userService.getByIds(ids as unknown as string[]);
        return response.json(users.map((user) => new UserWithoutPasswordDto(user)));
      }

      const users = await this.userService.getAll();
      return response.json(users.map((user) => new UserWithoutPasswordDto(user)));
    } catch (err) {
      next(err);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) throw HttpError.BadRequestError("Required param id was not passed");

      const user = await this.userService.getById(id);
      if (!user) throw HttpError.NotFoundError("User with this id was not found");

      return response.json(new UserWithoutPasswordDto(user!));
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const errors: string[] = [];
      if (typeof email !== "string" || typeof password !== "string" || typeof name !== "string") {
        throw HttpError.BadRequestError("Required fields were not filled");
      }

      const { user, tokens } = await this.userService.register({ email, password, name }, errors);
      if (errors.length || !user || !tokens) {
        throw HttpError.BadRequestError("Can`t auth", errors);
      }

      res
        .cookie("refreshToken", tokens.refreshToken, cookieOptions)
        .json({ user: new UserWithoutPasswordDto(user), ...tokens });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const errors: string[] = [];

      if (typeof email !== "string" || typeof password !== "string") {
        throw HttpError.BadRequestError("Required fields were not filled");
      }

      const { user, tokens } = await this.userService.login({ email, password }, errors);
      if (errors.length || !user || !tokens) {
        throw HttpError.BadRequestError("Can`t auth", errors);
      }

      res
        .cookie("refreshToken", tokens.refreshToken, cookieOptions)
        .json({ user: new UserWithoutPasswordDto(user), ...tokens });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await this.userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const errors: string[] = [];

      const { user, tokens } = await this.userService.refresh(refreshToken, errors);
      if (errors.length || !user || !tokens) {
        throw HttpError.BadRequestError("Can`t auth", errors);
      }

      return res
        .cookie("refreshToken", tokens.refreshToken, cookieOptions)
        .json({ user: new UserWithoutPasswordDto(user), ...tokens });
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController(userService);

export const userRouter = Router();
userRouter.post("/register", userController.register.bind(userController));
userRouter.post("/login", userController.login.bind(userController));
userRouter.post("/logout", userController.logout.bind(userController));
userRouter.get("/refresh", userController.refresh.bind(userController));

userRouter.get("/", authMiddleware, userController.getAll.bind(userController));
userRouter.get("/current", authMiddleware, userController.getCurrentUser.bind(userController));
userRouter.get("/:id", authMiddleware, userController.getById.bind(userController));
