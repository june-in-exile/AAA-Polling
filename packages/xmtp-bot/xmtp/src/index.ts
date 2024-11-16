import { run, HandlerContext } from "@xmtp/message-kit";

run(async (context: HandlerContext) => {
    const { content, sender } = context.message;
    const message = content?.text;
    console.log(`Message received: ${message}`);
    console.log(`Sender: ${sender}`);

    if (message?.startsWith("/keygen")) {
        const args = message.slice(7).trim()
        await handleKeygen(args, context);

    } else if (message?.startsWith("/signup")) {
        const args = message.slice(8).trim(); 
        await handleSignup(args, context);

    } else if (message?.startsWith("/vote")) {
        const args = message.slice(6).trim();
        await handleVote(args, context);

    } else if (message?.startsWith("/result")) {
        const args = message.slice(7).trim();
        await handleResult(args, context);

    } else {
        await context.send("Command not recognized. Please use /keygen, /signup, /vote, or /result.");
    }
});


async function handleKeygen(message: string, context: HandlerContext) {

    
    
    await context.send(`key generation`);
}

async function handleSignup(message: string, context: HandlerContext) {

    await context.send(`signup`);

}

async function handleVote(message: string, context: HandlerContext) {

   await context.send(`vote`);

}

async function handleResult(message: string, context: HandlerContext) {

   await context.send(`result`);

}
