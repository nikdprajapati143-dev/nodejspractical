import bcrypt from "bcrypt";

async function test() {
    const hash = await bcrypt.hash("12345678", 10);

    console.log(hash);

    console.log(await bcrypt.compare("12345678", hash));
}

test();