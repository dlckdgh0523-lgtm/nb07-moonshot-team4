import {Request, Response, Router} from 'express';

const router = Router();

// 컨트롤러
export const AuthController = {

    // 회원가입
register: async (req: Request, res: Response) => {
    res.send("회원가입")
},

    // 로그인
login: async (req: Request, res: Response) => {
    res.send("로그인")
},

    // 토큰 갱신
refresh: async (req: Request, res: Response) => {
    res.send("새로운 토큰")
},

    // 구글 로그인
googleLogin: (req: Request, res: Response) => {
    res.send("구글 로그인 페이지로 보내주는 곳입니다.");
},

    // 구글 로그인 완료 후 돌아오는 곳
googleCallback: async (req: Request, res: Response) => {
    res.send("구글에서 돌아온 유저를 처리하는 곳입니다.");
}
}

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.get('/google', AuthController.googleLogin);
router.get('/google/callback', AuthController.googleCallback);

export default router;