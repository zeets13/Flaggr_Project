from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# ============================================================
# CONFIGURATION
# ============================================================

BINARY_MODEL_PATH = "model_binary"
MULTILABEL_MODEL_PATH = "model_multilabel"

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Binary classification threshold
HATE_THRESHOLD = 0.5

# ============================================================
# CATEGORY LABELS
# ============================================================

CATEGORY_NAMES = [
    "insult",
    "humiliate",
    "dehumanize",
    "violence",
    "genocide",
    "attack_defend"
]

DISPLAY_NAMES = {
    "insult": "Insult",
    "humiliate": "Humiliation",
    "dehumanize": "Dehumanization",
    "violence": "Violence",
    "genocide": "Genocide",
    "attack_defend": "Targeted Attack"
}

# Best thresholds obtained from validation
CATEGORY_THRESHOLDS = {
    "insult": 0.28,
    "humiliate": 0.30,
    "dehumanize": 0.45,
    "violence": 0.71,
    "genocide": 0.87,
    "attack_defend": 0.15
}

# ============================================================
# LOAD BINARY MODEL
# ============================================================

print("Loading binary model...")

binary_tokenizer = AutoTokenizer.from_pretrained(BINARY_MODEL_PATH)

binary_model = AutoModelForSequenceClassification.from_pretrained(
    BINARY_MODEL_PATH
)

binary_model.to(DEVICE)
binary_model.eval()

print("Binary model loaded.")

# ============================================================
# LOAD MULTI-LABEL MODEL
# ============================================================

print("Loading multi-label model...")

multilabel_tokenizer = AutoTokenizer.from_pretrained(
    MULTILABEL_MODEL_PATH
)

multilabel_model = AutoModelForSequenceClassification.from_pretrained(
    MULTILABEL_MODEL_PATH
)

multilabel_model.to(DEVICE)
multilabel_model.eval()

print("Multi-label model loaded.")
print(f"Using device: {DEVICE}")

# ============================================================
# BINARY PREDICTION
# ============================================================

def predict_hate_probability(text):

    inputs = binary_tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = binary_model(**inputs)

    probabilities = torch.softmax(outputs.logits, dim=-1)[0]

    return float(probabilities[1].cpu())

# ============================================================
# MULTI-LABEL PREDICTION
# ============================================================

def predict_categories(text):

    inputs = multilabel_tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = multilabel_model(**inputs)

    probabilities = torch.sigmoid(outputs.logits)[0].cpu().numpy()

    detected_categories = []

    for i, category in enumerate(CATEGORY_NAMES):

        # Hide Targeted Attack from frontend
        if category == "attack_defend":
            continue

        probability = float(probabilities[i])

        if probability >= CATEGORY_THRESHOLDS[category]:
            detected_categories.append(DISPLAY_NAMES[category])

    return detected_categories

# ============================================================
# SEVERITY
# ============================================================

def determine_severity(categories):

    if not categories:
        return "Safe"

    if "Violence" in categories or "Genocide" in categories:
        return "High"

    if "Dehumanization" in categories or len(categories) >= 2:
        return "Medium"

    return "Low"

# ============================================================
# MAIN MODERATION FUNCTION
# ============================================================

def analyze_message(text):

    hate_probability = predict_hate_probability(text)


    if hate_probability < HATE_THRESHOLD:

        return {
            "safe": True,
            "severity": "Safe",
            "categories": ["N/A"],
            "message": "No hate speech detected."
        }
    
    categories = predict_categories(text)

    severity = determine_severity(categories)

    return {
        "safe": False,
        "severity": severity,
        "categories": categories,
        "message": "Potential hate speech detected."
    }


if __name__ == "__main__":

    print("\n===================================")
    print("Flaggr Moderation Engine Ready")
    print("Type 'exit' to quit.")
    print("===================================")

    while True:

        text = input("\nYou: ")

        if text.lower() in ["exit", "quit"]:
            break

        result = analyze_message(text)

        print("\nResult")
        print("-----------------------------------")
        print(f"Safe      : {result['safe']}")
        print(f"Severity  : {result['severity']}")

        if result["categories"]:
            print("Categories:")
            for category in result["categories"]:
                print(f"  • {category}")
        else:
            print("Categories: None")

        print(f"Message   : {result['message']}")