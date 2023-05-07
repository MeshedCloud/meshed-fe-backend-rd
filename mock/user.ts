import {Request, Response} from 'express';


const getUserInfo = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      id: "1",
      name: "管理员",
      loginId: "admin",
      phone: "18888888888",
      email: "11@qq.com",
      validPhone: false,
      validEmail: false,
      grantedAuthority: [],
      grantedRole: ["DEVOPS:MONITOR", "DEVOPS", "FLOW", "FLOW:ADMIN", "RD:MANAGE", "RD:DEVELOPER", "RD:ADMIN", "RD", "DEVOPS:NACOS", "IAM", "IAM:ADMIN", "FLOW:TASK"]
    }
  });
};
export default {
  'GET /api/iam/current/userinfo': getUserInfo,
};
