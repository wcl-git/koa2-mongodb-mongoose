import Router from "koa-router";
import * as User from "../app/controllers/user";
import * as App from "../app/controllers/app";

// module.exports = () => {
const router = new Router({
  prefix: "/api"
});

// user
router.post("/u/signup", App.hasBody, User.signup);
router.post("/u/update", App.hasBody, App.hasToken, User.update);

// DB Interface test
router.get("/test/user/users", User.users);
router.post("/test/user/add", User.addUser);
router.post("/test/user/delete", User.deleteUser);
// return router;
// }

// module.exports = router;
export default router;
