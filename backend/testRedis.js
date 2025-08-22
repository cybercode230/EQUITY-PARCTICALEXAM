const redis = require("./src/config/redis");

async function test() {
  await redis.set("equity-test", "connected", "EX", 60);
  const val = await redis.get("equity-test");
  console.log("Redis value:", val);
}

test();
