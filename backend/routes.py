from fastapi import APIRouter
from backend.model import ChatRequest
from backend.responses import responses
from backend.nlp import detect_intent

router = APIRouter()

@router.get("/chat")
async def get_chat(query: str = ""):
    """
    GET endpoint for testing chat responses.
    """
    if not query:
        return {"bot_response": "Hello! How can I assist you today?"}
    if query in responses:
        return {"bot_response": responses[query]}
    intent = detect_intent(query)
    return {"bot_response": responses.get(intent, "I'm not sure how to respond.")}

@router.post("/chat")
async def post_chat(request: ChatRequest):
    """
    POST endpoint to process chat requests.
    """
    query = request.message.strip().lower()
    if not query:
        return {"bot_response": "Hello! How can I assist you today?"}
    if query in responses:
        return {"bot_response": responses[query]}
    intent = detect_intent(query)
    return {"bot_response": responses.get(intent, "I'm not sure how to respond.")}
