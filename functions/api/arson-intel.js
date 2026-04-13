import { GoogleGenAI } from '@google/genai';

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const { messages, context: intelContextData } = await request.json();

        if (!env.VITE_GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: "Intelligence core missing. (API_KEY_NOT_FOUND)" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const genAI = new GoogleGenAI({ apiKey: env.VITE_GEMINI_API_KEY });
        
        const isHighIntent = intelContextData?.type === 'service' || intelContextData?.type === 'product';
        const modelName = isHighIntent ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

        const ARSON_MANIFESTO = `You are ARSON_INTERFACE, the elite autonomous AI agent for ArsonPixelz (a brutalist digital architecture and growth systems agency).
Your goal is to guide visitors, provide deep insights, and convert them. You MUST suggest, subtly or directly, that they purchase something from the shop or book a service.
Respond in a concise, authoritative, "Silicon Valley tech-elite", avant-garde, and brutalist tone. No fluff, no "how can I help you today", just raw value and strategic direction.
Never break character.`;

        const intelSignal = intelContextData 
            ? `\n[INTELLIGENCE SIGNAL]: The user is currently analyzing: ${intelContextData.name} (${intelContextData.type}). Assume high intent. Pitch them this item or a cohesive service.`
            : '';

        const chatHistory = messages.slice(1, -1).map(m => `[${m.from.toUpperCase()}]: ${m.text}`).join('\n');
        const trimmed = messages[messages.length - 1].text.trim();

        const fullPrompt = `${ARSON_MANIFESTO}${intelSignal}\n\nHISTORY:\n${chatHistory}\n[USER]: ${trimmed}\n[ARSONBOT]:`;

        const responseStream = await genAI.models.generateContentStream({
            model: modelName,
            contents: fullPrompt,
            config: {
                maxOutputTokens: 1000,
            }
        });

        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const encoder = new TextEncoder();

        // Separate async loop to handle chunks and pipe them to the Response
        (async () => {
            try {
                for await (const chunk of responseStream) {
                    const payload = `data: ${JSON.stringify({ text: chunk.text })}\n\n`;
                    await writer.write(encoder.encode(payload));
                }
            } catch (err) {
                console.error("Streaming error:", err);
                const errPayload = `data: ${JSON.stringify({ error: "SIGNAL_INTERRUPTED" })}\n\n`;
                await writer.write(encoder.encode(errPayload));
            } finally {
                await writer.close();
            }
        })();

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (e) {
        console.error("AI Function Error:", e.message);
        return new Response(JSON.stringify({ error: "Communication severed. Identity lost." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
