import spacy
from backend.intents import intents

# Load the spaCy English model
nlp = spacy.load("en_core_web_sm")

def process_query(query: str):
    """
    Process user input to extract keywords using spaCy.
    """
    doc = nlp(query.lower())
    keywords = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
    return " ".join(keywords)

def detect_intent(user_input: str):
    """
    Identify the best matching intent using spaCy similarity.
    Returns the matching intent or 'unknown' if no sufficient match is found.
    """
    processed_input = nlp(user_input.lower())
    best_intent = "unknown"
    best_score = 0.0
    for intent, phrases in intents.items():
        for phrase in phrases:
            phrase_doc = nlp(phrase.lower())
            similarity = processed_input.similarity(phrase_doc)
            if similarity > best_score and similarity > 0.4:
                best_intent = intent
                best_score = similarity
    return best_intent if best_score > 0.3 else "unknown"
