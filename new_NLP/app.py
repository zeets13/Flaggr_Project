from flask import Flask, request, jsonify, session
from flask_cors import CORS

from moderation import analyze_message
from database import db, User


app = Flask(__name__)

# --------------------------------------------------
# Configuration
# --------------------------------------------------

app.config["SECRET_KEY"] = "change-this-secret-key"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

CORS(
    app,
    supports_credentials=True
)

# Create database tables
with app.app_context():
    db.create_all()


# --------------------------------------------------
# REGISTER
# --------------------------------------------------

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({
            "success": False,
            "message": "Username and password are required."
        }), 400

    existing_user = User.query.filter_by(
        username=username
    ).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Username already exists."
        }), 409

    user = User(username=username)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Account created successfully."
    })


# --------------------------------------------------
# LOGIN
# --------------------------------------------------

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username", "").strip()
    password = data.get("password", "")

    user = User.query.filter_by(
        username=username
    ).first()

    if not user or not user.check_password(password):

        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 401

    # Store logged-in user in Flask session
    session["user_id"] = user.id

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "username": user.username
    })


@app.route("/logout", methods=["POST"])
def logout():

    session.pop("user_id", None)

    return jsonify({
        "success": True,
        "message": "Logged out successfully."
    })


# --------------------------------------------------
# CURRENT USER
# --------------------------------------------------

@app.route("/current-user", methods=["GET"])
def current_user():

    user_id = session.get("user_id")

    if not user_id:

        return jsonify({
            "logged_in": False
        })

    user = db.session.get(User, user_id)

    if not user:

        session.pop("user_id", None)

        return jsonify({
            "logged_in": False
        })

    return jsonify({
        "logged_in": True,
        "username": user.username,
        "violation_count": user.violation_count,
        "is_blocked": user.is_blocked
    })



@app.route("/predict", methods=["POST"])
def predict():

    # ----------------------------------------------
    # Get logged-in user from session
    # ----------------------------------------------

    user_id = session.get("user_id")

    if not user_id:

        return jsonify({
            "error": "Please login first."
        }), 401


    user = db.session.get(User, user_id)

    if not user:

        session.pop("user_id", None)

        return jsonify({
            "error": "User not found."
        }), 401


    if user.is_blocked:

        return jsonify({

            "blocked": True,

            "message":
                "You are temporarily blocked due to repeated hate speech.",

            "violations":
                user.violation_count

        }), 403

    data = request.get_json()

    message = data.get("message", "").strip()

    if not message:

        return jsonify({
            "error": "Message is required."
        }), 400

   

    result = analyze_message(message)


    if result["safe"]:

        result["violations"] = user.violation_count
        result["blocked"] = False

        return jsonify(result)

    user.violation_count += 1

    # Your blocking limit
    if user.violation_count >= 3:

        user.is_blocked = True

    db.session.commit()

    result["violations"] = user.violation_count
    result["blocked"] = user.is_blocked

    return jsonify(result)


if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )